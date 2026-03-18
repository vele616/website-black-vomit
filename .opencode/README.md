# OpenCode SCE Setup

This folder configures a Shared Context Engineering (SCE) workflow for OpenCode.

## What changed

- Legacy single-agent `lode` workflow was replaced with role-specific SCE agents.
- Commands in `.opencode/command/` route user intents to the right agent.
- Skills in `.opencode/skills/` hold the detailed execution rules.

## Agents

- `Shared Context Plan` (`.opencode/agent/Shared Context Plan.md`)
  - Converts change requests into atomic plans under `context/plans/`.
  - Never edits application code.
- `Shared Context Code` (`.opencode/agent/Shared Context Code.md`)
  - Executes exactly one approved plan task at a time.
  - Runs checks, updates plan task status, and syncs `context/`.
- `Shared Context Drift` (`.opencode/agent/Shared Context Drift.md`)
  - Detects and fixes drift between code and `context/` docs.

## Commands

- `/change-to-plan` -> create/update `context/plans/{plan_name}.md`
- `/next-task {plan} {task?}` -> review plan readiness and execute one task
- `/validate` -> final plan validation pass
- `/commit` -> propose atomic commit message(s), no auto-commit
- `/drift-detect` -> generate drift report in `context/tmp/`
- `/fix-drift` -> apply approved drift fixes in `context/`
- `/handover` -> create handover doc in `context/handovers/`

## Skill ownership

- Plan creation: `sce-plan-authoring`
- Plan continuation/readiness: `sce-plan-review`
- Task implementation: `sce-task-execution`
- Context synchronization: `sce-context-sync`
- Drift analysis/fix: `sce-drift-analyzer`, `sce-drift-fixer`
- Final validation: `sce-validation`
- Commit guidance: `sce-atomic-commit`
- Context bootstrap (when missing): `sce-bootstrap-context`

## Preconditions

- SCE workflows expect a `context/` directory.
- If `context/` is missing, workflows should trigger `sce-bootstrap-context` after user approval.
- Code remains source of truth when docs and implementation diverge.
