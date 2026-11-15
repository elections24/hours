import fs from 'node:fs';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import os from 'node:os';
import path from 'node:path';

const root = new URL('.', import.meta.url);
const read = name => fs.readFileSync(new URL(name, root), 'utf8');
const admin = read('super-admin-dashboard.html');
const agent = read('polling-unit-agent.html');
const login = read('index.html');
const rules = read('firestore.rules');

assert.match(admin, /projectId:"election-8e790"/);
assert.match(admin, /const NIGERIAN_STATES=\[/);
assert.match(admin, /id="electionType"/);
assert.match(admin, /id="assignedParty"/);
assert.match(admin, /id="contestStateSelect"/);
assert.match(admin, /id="contestZoneSelect"/);
assert.match(admin, /id="contestConstituencySelect"/);
assert.match(admin, /id="stateSelect"/);
assert.match(admin, /id="contestAssignment"|contestAssignment:\{/);
assert.match(admin, /geographicalCoverage:\{/);
assert.match(admin, /function syncCoverageState\(/);
assert.match(admin, /function loadCoverageLGAs\(/);
assert.doesNotMatch(admin, /id="actualElection"|id="assignedCandidate"|id="createCandidateForm"/);
assert.match(admin, /assignmentMode:'contest_party'/);
assert.match(admin, /function makeContest\(/);
assert.match(agent, /projectId: "election-8e790"/);
assert.match(agent, /currentProfile\.partyName/);
assert.match(agent, /assignmentMode: "contest_party"/);
assert.doesNotMatch(agent, /currentProfile\.candidateId|candidateId: currentProfile\.candidateId/);
assert.match(login, /super_admin: "super-admin-dashboard\.html"/);
assert.match(rules, /assignmentMode == 'contest_party'/);
assert.match(rules, /request\.resource\.data\.partyName == agentDoc\(\)\.data\.partyName/);
assert.doesNotMatch(rules, /candidateId/);

for (const [file, html] of [['admin', admin], ['agent', agent]]) {
  const match = html.match(/<script type="module">([\s\S]*?)<\/script>/);
  assert.ok(match, `${file} module script exists`);
  const tmp = path.join(os.tmpdir(), `the-eyes-${file}-${process.pid}.mjs`);
  fs.writeFileSync(tmp, match[1]);
  const result = spawnSync(process.execPath, ['--check', tmp], { encoding: 'utf8' });
  fs.rmSync(tmp, { force: true });
  assert.equal(result.status, 0, `${file} JavaScript syntax: ${result.stderr || result.stdout}`);
}

console.log('Separated contest assignment / Firestore geographical coverage checks passed.');
