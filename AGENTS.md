# The Eyes — Codex Development Instructions

## Project

The Eyes is an election monitoring and reporting platform. This repository contains the Field Agent Prototype V1.

## Current scope

Build a polished prototype for Polling Unit Agents and Ward Collation Agents. Use simulated data only; do not connect live election feeds or production electoral systems.

## Rules

- Preserve approved workflows and labels from the product specification.
- Do not invent missing electoral form fields.
- Keep Polling Unit Agent and Ward Collation Agent workflows separate.
- Prefer reusable navigation, status cards, forms, evidence uploads, tables, and confirmation states.
- Prioritize responsive, mobile-first UI and a professional enterprise/government-grade design system.
- Clearly label simulated/prototype information.
- Do not remove approved functionality when adding functionality.
- Preserve known workflows and document ambiguity.
- Run linting, type checking, and tests before completing implementation tasks.

## Development workflow

- Read `docs/product-Specification.md` and `docs/user-flows.md` before implementation. (This casing matches the actual file name.)
- Make the smallest coherent change, add tests for meaningful behavior, run available checks, and update documentation when requirements change.
