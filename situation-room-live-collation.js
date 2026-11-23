/**
 * Shared situation-room collation. Select scopeDepth 0 for nationwide, 1 for state,
 * 2 for LGA or 3 for ward. Start with a verified assignment and stop on sign-out
 * or assignment changes. Configure corresponding Firestore rules before adding a role.
 * Expects the EC8A and EC8B record formats used by the reporting dashboards.
 */
export function createLiveCollation({scopeDepth,fields,geoTables,onSnapshot,scoped,figures,combined,ordered,matchAreas,invalidate}){
  if(!Number.isInteger(scopeDepth)||scopeDepth<0||scopeDepth>3)throw Error('Invalid collation scope.');
  // Each retained document has one owner (a ward) and one version in the local ledger.
  // Only wards touched by a Firestore change are rebuilt.
  const scopeCharts=new Map();
  const book=new Map(), sourceStatus={}, sourceStops=[], docWard=new Map();
  let ledgerSession=0, ledgerRevision=0, projectionCache=null, framePending=false;
  function schedulePaint(){
    if(framePending)return;
    framePending=true;
    setTimeout(()=>{framePending=false;invalidate()},0);
  }

  function stopLedger(){
    ledgerSession++;
    sourceStops.splice(0).forEach(stop=>stop());
    for(const w of book.values())w.stopDirectory?.();
    book.clear();scopeCharts.clear();docWard.clear();projectionCache=null;ledgerRevision++;
    for(const k of Object.keys(sourceStatus))delete sourceStatus[k];
  }
  const codeOf=v=>String(v??'').trim().toUpperCase().replace(/[\s_/-]+/g,'/');
  const stampMs=v=>typeof v?.toMillis==='function'?v.toMillis():Date.parse(v)||0;
  function versionTime(r){const v=r.updatedAt||r.createdAt;return stampMs(v)}
  function aliasesFor(docs){
    const aliases=new Map();
    function add(k,id){if(k)aliases.set(k,aliases.has(k)&&aliases.get(k)!==id?null:id)}
    for(const g of docs){
      for(const raw of [g.id,g.code,g.pollingUnitCode,g.unitCode]){
        if(!raw)continue;
        const key=codeOf(raw);add(key,g.id);
        const tail=key.split('/').at(-1);
        if(/^\d+$/.test(tail))add(String(Number(tail)),g.id);
      }
    }
    return aliases;
  }
  function resolveCode(raw,aliases){
    const k=codeOf(raw);
    if(!k)return null;
    if(!aliases)return k;
    const serial=/^\d+$/.test(k)?String(Number(k)):k;
    if(aliases.has(serial))return aliases.get(serial);
    return aliases.has(k)?aliases.get(k):undefined;
  }
  function wardEntry(kind,r){
    const time=versionTime(r),v=r.updatedAt||r.createdAt;
    const common={id:r.id,time,nanos:v?.nanoseconds||0,kind};
    if(kind==='A')return {...common,unit:r.pollingUnitCode,unitName:r.pollingUnit||r.pollingUnitName,f:figures(r,3)};
    const rows=Array.isArray(r.pollingUnits)?r.pollingUnits.map(u=>({
      id:u?.pollingUnitId,code:u?.code||u?.pollingUnitCode,
      f:figures({pollingUnits:[u]},2)
    })):[];
    return {...common,rows,f:figures(r,2)};
  }
  // Supports replacing one unit without summing every previous EC8A again.
  class Tally{
    constructor(){this.count=0;this.sums=new Map();this.counts=new Map();this.incomplete=0}
    change(f,by){
      if(!f)return;
      this.count+=by;if(f.incomplete)this.incomplete+=by;
      const entries=[...Object.entries(f.votes).map(([p,n])=>['v:'+p,n]),...['registered','accredited','valid','rejected'].map(k=>[k,f[k]])];
      for(const [k,n] of entries){
        if(!Number.isFinite(n))continue;
        const count=(this.counts.get(k)||0)+by;
        if(count){this.counts.set(k,count);this.sums.set(k,(this.sums.get(k)||0)+by*n)}
        else{this.counts.delete(k);this.sums.delete(k)}
      }
    }
    value(k){return this.count>0&&this.counts.get(k)===this.count?this.sums.get(k):null}
    figures(){
      const votes=Object.create(null);let incomplete=this.incomplete>0;
      for(const [k,n] of this.sums)if(k.startsWith('v:')){votes[k.slice(2)]=n;if(this.counts.get(k)!==this.count)incomplete=true}
      return {votes,incomplete,registered:this.value('registered'),accredited:this.value('accredited'),valid:this.value('valid'),rejected:this.value('rejected')};
    }
  }
  function wardAt(w,until,withHistory){
    const pu=new Map(),receipts=new Map(),tally=new Tally(),trend=[];
    let overlay=new Map(),summary=null,wardForm=null,unresolved=0,heldSummary=false;
    for(let i=0;i<w.ordered.length;i++){
      const e=w.ordered[i];if(until!==Infinity&&(!e.time||e.time>until))continue;
      if(e.kind==='A'){
        const id=codeOf(resolveCode(e.unit,w.aliases||w.knownUnits)??e.unit);
        // A later EC8A replaces the effective contribution for this unit.
        if(summary){
          // A total-only EC8B cannot identify this unit's previous share.
          // Resume from individually attributable receipts and flag reduced coverage.
          tally.change(summary,-1);
          for(const prior of pu.values())tally.change(prior,1);
          summary=null;heldSummary=true;wardForm=null;
        }
        tally.change(overlay.get(id)||pu.get(id),-1);
        overlay.delete(id);
        tally.change(e.f,1);
        pu.set(id,e.f);
        receipts.set(id,{pollingUnitCode:e.unit,pollingUnitName:e.unitName,f:e.f,id:e.id});
      }else{
        const replacement=new Map();
        let valid=Object.keys(e.f.votes).length>0;
        for(const line of e.rows){
          const resolved=line.id?codeOf(line.id):w.aliases?resolveCode(line.code,w.aliases):null;
          const id=codeOf(resolved);
          if(!id||replacement.has(id)||!Object.keys(line.f.votes).length){valid=false;break}
          replacement.set(id,line.f);
        }
        if(valid){
          unresolved=0;heldSummary=false;
          // A replacement sheet is a complete revision of the previous EC8B.
          // Unlisted units fall back to their latest EC8A.
          if(summary){
            tally.change(summary,-1);
            for(const f of pu.values())tally.change(f,1);
          }else for(const [id,f] of overlay){tally.change(f,-1);tally.change(pu.get(id),1)}
          overlay=replacement;summary=null;wardForm=e;
          if(!overlay.size){
            summary=e.f;for(const f of pu.values())tally.change(f,-1);tally.change(summary,1);
          }else for(const [id,f] of overlay){tally.change(pu.get(id),-1);tally.change(f,1)}
        }else{unresolved=1}
      }
      if(withHistory&&e.time&&e.time!==w.ordered[i+1]?.time&&tally.count){
        trend.push([e.time,tally.value('registered'),tally.value('accredited')]);
      }
    }
    for(const [id,receipt] of receipts){
      if(summary)receipt.coverage='Header uses whole-ward EC8B';
      else if(overlay.has(id))receipt.coverage='Header uses newer EC8B row';
    }
    return {f:tally.count?tally.figures():null,ref:wardForm?.id||'',unresolved,
      provisional:summary?0:[...pu.keys()].filter(k=>!overlay.has(k)).length,
      amended:overlay.size,summary:!!summary,heldSummary,receipts,trend};
  }
  // Maintain turnout deltas by reporting minute for each parent. A fresh upload
  // updates four small chart indexes instead of replaying the national PU history.
  function chartDelta(w,sign){
    if(!w.live)return;
    const parents=fields.slice(0,3).map(k=>w.scope[k]);
    const charts=Array.from({length:4},(_,n)=>{
      const key=JSON.stringify(parents.slice(0,n));
      if(!scopeCharts.has(key))scopeCharts.set(key,new Map());
      return scopeCharts.get(key);
    });
    let prevR=0,prevA=0,prevMissing=0;
    for(const [t,r,a] of w.live.trend){
      const minute=Math.floor(t/60000)*60000,missing=Number(r==null||a==null);
      for(const chart of charts){
        const bin=chart.get(minute)||[0,0,0,0];
        bin[0]+=sign*((r??0)-prevR);bin[1]+=sign*((a??0)-prevA);bin[2]+=sign*(missing-prevMissing);bin[3]+=sign;
        if(bin[3])chart.set(minute,bin);else chart.delete(minute);
      }
      prevR=r??0;prevA=a??0;prevMissing=missing;
    }
  }
  function liveTrend(path){
    const chart=scopeCharts.get(JSON.stringify(path.map(p=>p.id)));
    if(!chart)return [];
    let reg=0,acc=0,missing=0;const points=[];
    for(const [minute,d] of [...chart].sort((a,b)=>a[0]-b[0])){
      reg+=d[0];acc+=d[1];missing+=d[2];if(!missing&&reg>0)points.push([minute,100*acc/reg]);
    }
    return thinTrend(points);
  }
  function thinTrend(points){
    const stride=Math.max(1,Math.ceil(points.length/400));
    return points.filter((p,i)=>i%stride===0||i===points.length-1);
  }
  function rebuild(w){
    chartDelta(w,-1);
    w.ordered=[...w.docs.values()].sort((a,b)=>a.time-b.time||a.nanos-b.nanos||a.kind.localeCompare(b.kind)||a.id.localeCompare(b.id));
    w.firstTime=w.ordered.find(e=>e.time>0)?.time;w.lastTime=w.ordered.at(-1)?.time;
    const named=new Map();
    for(const e of w.ordered)if(e.kind==='B')for(const row of e.rows)if(row.id){
      const k=codeOf(row.id);
      for(const v of [k,codeOf(row.code)].filter(Boolean))
        named.set(v,named.has(v)&&named.get(v)!==k?null:k);
    }
    w.knownUnits=named;
    w.live=wardAt(w,Infinity,true);
    chartDelta(w,1);
  }
  function directoryFor(w,key,epoch){
    const needs=[...w.docs.values()].some(e=>e.kind==='B'&&e.rows.some(r=>!r.id));
    if(!needs){w.stopDirectory?.();w.stopDirectory=null;w.aliases=null;w.directory='';return}
    if(w.stopDirectory)return;
    w.directory='loading';
    const filters=Object.fromEntries(fields.slice(0,3).map(k=>[k,w.scope[k]]));
    w.stopDirectory=onSnapshot(scoped(geoTables[3],filters),{includeMetadataChanges:true},s=>{
      if(epoch!==ledgerSession||book.get(key)!==w)return;
      w.directory=s.metadata.fromCache?'offline':'ready';
      w.aliases=s.metadata.fromCache?null:aliasesFor(s.docs.map(d=>({...d.data(),id:d.id})));
      rebuild(w);ledgerRevision++;schedulePaint();
    },e=>{
      if(epoch!==ledgerSession||book.get(key)!==w)return;
      w.directory=e.code||'unavailable';w.aliases=null;rebuild(w);ledgerRevision++;schedulePaint();
    });
  }
  function beginLedger(assignment){
    stopLedger();
    const epoch=ledgerSession;
    const required=['candidateId','electionType',...fields.slice(0,scopeDepth)];
    const base=Object.fromEntries(required.map(k=>[k,assignment?.[k]]));
    if(!required.every(k=>typeof base[k]==='string'&&base[k].trim()))throw Error('Missing live collation assignment.');

    for(const [kind,table,filter] of [['A','ec8aResults',{reportType:'successful_election'}],['B','wardEvidenceOfLoss',{documentType:'WARD_EC8B_EFORM'}]]){
      sourceStatus[kind]='loading';
      sourceStops.push(onSnapshot(scoped(table,{...base,...filter}),{includeMetadataChanges:true},s=>{
        if(epoch!==ledgerSession)return;
        const state=s.metadata.fromCache||s.metadata.hasPendingWrites?'unconfirmed':'ready';
        const changes=s.docChanges();
        if(!changes.length&&sourceStatus[kind]===state)return;
        const touched=new Set();
        for(const change of changes){
          const d=change.doc,id=kind+':'+d.id,prior=docWard.get(id);
          if(prior){book.get(prior)?.docs.delete(id);docWard.delete(id);touched.add(prior)}
          if(change.type==='removed')continue;
          const r={...d.data(),id:d.id};
          if(!required.every(k=>r[k]===base[k])||
             (r.status&&r.status!=='submitted')||!fields.slice(0,kind==='A'?4:3).every(k=>typeof r[k]==='string'&&r[k].trim()))continue;
          const key=JSON.stringify(fields.slice(0,3).map(k=>r[k]));
          if(!book.has(key))book.set(key,{scope:{},docs:new Map(),aliases:null});
          const w=book.get(key);
          for(const k of [...fields.slice(0,3),'state','stateName','lga','lgaName','ward','wardName'])if(r[k])w.scope[k]=r[k];
          w.docs.set(id,wardEntry(kind,r));docWard.set(id,key);touched.add(key);
        }
        for(const key of touched){const w=book.get(key);if(!w.docs.size){chartDelta(w,-1);w.stopDirectory?.();book.delete(key)}else{directoryFor(w,key,epoch);rebuild(w)}}
        sourceStatus[kind]=state;
        ledgerRevision++;schedulePaint();
      },e=>{if(epoch===ledgerSession){sourceStatus[kind]=e.code||'unavailable';ledgerRevision++;schedulePaint()}}));
    }
  }
  function aggregateTrend(wards,until){
    const delta=new Map();
    for(const w of wards){
      let oldR=0,oldA=0,oldMissing=0;
      for(const [t,r,a] of w.live.trend){
        if(t>until)break;
        const diff=delta.get(t)||[0,0,0],missing=Number(r==null||a==null);
        diff[0]+=(r??0)-oldR;diff[1]+=(a??0)-oldA;diff[2]+=missing-oldMissing;
        oldR=r??0;oldA=a??0;oldMissing=missing;delta.set(t,diff);
      }
    }
    const points=[];let reg=0,acc=0,missing=0;
    for(const [t,d] of [...delta].sort((a,b)=>a[0]-b[0])){
      reg+=d[0];acc+=d[1];missing+=d[2];if(!missing&&reg>0)points.push([t,100*acc/reg]);
    }
    // Keep the SVG compact while retaining the first and final observations.
    return thinTrend(points);
  }
  function projectLive(d,geo,bounds,ready,{path,generation,cut}){
    if(projectionCache&&projectionCache.rev===ledgerRevision&&projectionCache.gen===generation&&projectionCache.geo===geo&&projectionCache.cut===cut&&projectionCache.ready===ready)return projectionCache.result;
    const within=[...book.values()].filter(w=>path.every((p,i)=>w.scope[fields[i]]===p.id));
    const times=new Set(),packets=[];
    const counts={wardRef:'',provisional:0,amended:0,wards:0,summary:0,heldSummary:0,unresolved:0};
    for(const w of within){
      if(cut===Infinity&&d!==3){
        if(w.firstTime)times.add(w.firstTime);
        if(w.lastTime)times.add(w.lastTime);
      }else for(const e of w.ordered)if(e.time)times.add(e.time);
      if(!ready)continue;
      const v=cut===Infinity?w.live:wardAt(w,cut,false);
      packets.push({...w.scope,v,w});
    }
    const eligible=[];
    function include(p){
      counts.unresolved+=p.v.unresolved;counts.heldSummary+=Number(p.v.heldSummary);
      if(!p.v.f)return;
      if(d===3)counts.wardRef=p.v.ref;
      counts.provisional+=p.v.provisional;counts.amended+=p.v.amended;
      counts.wards+=Number(!!p.v.ref);counts.summary+=Number(p.v.summary);
      eligible.push(p);
    }
    let areas=[],unmatched=0;
    if(d<3){
      const groups=matchAreas(geo,bounds,packets,d);unmatched=groups.unmatched;
      areas=groups.areas.map((a,idx)=>{
        const inputs=a.forms;
        inputs.forEach(include);
        const active=inputs.filter(p=>p.v.f),f=active.length?combined(active.map(p=>p.v.f)):null;
        const pairs=f?ordered(f.votes):[],b=active.filter(p=>p.v.ref).length;
        return {...a,forms:[],idx,last:active.length>0,f,pairs,
          leading:f&&!f.incomplete&&pairs[0]?.[1]>0&&pairs[0][1]!==pairs[1]?.[1]?pairs[0][0]:null,
          coverage:b?b+' ward EC8B'+(b===1?'':'s'):'',source:b?'Synchronized':'Provisional EC8A'};
      });
    }else{
      packets.forEach(include);
      // Use the same snapshot for the ward's receipt cards and its headline.
      const receipts=eligible.flatMap(p=>Array.from(p.v.receipts.values()));
      areas=matchAreas(geo,bounds,receipts,3).areas.map((area,idx)=>{
        const last=area.forms.at(-1),f=last?.f,pairs=f?ordered(f.votes):[];
        const leading=pairs[0]?.[1]>0&&pairs[0][1]!==pairs[1]?.[1]?pairs[0][0]:null;
        return {...area,idx,last,f,pairs,leading,coverage:last?.coverage||''};
      });
    }
    const totals=combined(eligible.map(p=>p.v.f));
    const result={areas,unmatched,totals,counts,times:[...times],history:!ready?[]:cut===Infinity&&!unmatched?liveTrend(path):aggregateTrend(eligible.map(p=>p.w),cut)};
    projectionCache={rev:ledgerRevision,gen:generation,geo,cut,ready,result};return result;
  }
  return {start:beginLedger,stop:stopLedger,project:projectLive,status:sourceStatus};
}
