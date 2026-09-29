# ClimaFuse Agent Run Protocol

Standard operating procedure for the 10-run, stateful Gemini 3.8 backend implementation of ClimaFuse.

---

## 1. Core Principles & Source of Truth

* **Source code and tests are the ultimate source of truth**: Working code, migrations, and passing tests define system reality.
* **Git is the detailed historical record**: Every bounded run produces a clean, atomic Git commit documenting its exact changes.
* **`docs/AGENT_STATE.md` is the compact current-state checkpoint**: It provides a high-density, concise (<= 120 lines) status summary for the incoming run. It is **not** a verbose narrative diary.
* **Context isolation between runs**: Each subsequent run starts fresh and must **NOT** receive the previous run's full transcript or conversation history. Context is handed off solely through the repository files, Git log, and `docs/AGENT_STATE.md`.

---

## 2. Standard Run Lifecycle

Every implementation run MUST follow this exact 3-phase lifecycle:

### START Phase
1. Read `.agents/AGENTS.md`.
2. Read workspace rules in `.agents/rules/workspace.md`.
3. Read the compact PRD in `docs/CLIMAFUSE_BMA_BACKEND_PRD.md`.
4. Read the implementation plan in `docs/CLIMAFUSE_IMPLEMENTATION_PLAN.md`.
5. Read current state in `docs/AGENT_STATE.md`.
6. Inspect current source tree.
7. Inspect the latest Git commit (`git log -1`).
8. Continue strictly from the existing implementation state.

### DURING Phase
1. Implement **only** the single run assigned for this session.
2. Do **not** redo completed work from earlier runs.
3. Do **not** begin or anticipate the next run.
4. Run focused tests/checks as implementation proceeds.
5. Keep all modifications strictly inside the assigned run scope.

### END Phase
1. Run phase-specific unit/integration tests and verify zero regressions.
2. Run `git diff --check` to verify no whitespace errors or merge conflicts.
3. Review `git diff` and `git status` to ensure only intentional files are touched.
4. Update `docs/AGENT_STATE.md` with current run results.
5. Record important verified scientific/architectural decisions in `docs/AGENT_STATE.md`.
6. Record unresolved blockers (or `none`) in `docs/AGENT_STATE.md`.
7. Record the next run identifier and scope in `docs/AGENT_STATE.md`.
8. Record the resulting Git commit message in `docs/AGENT_STATE.md`.
9. Commit the completed run with a clean, descriptive message.
10. **STOP**. Do not proceed to the next run.

---

## 3. Strict Non-Negotiable Guardrails

* **Frontend Immutable**: Never modify files in `src/`. No UI redesigns, styling tweaks, refactoring, or dependency changes.
* **Two Models Only**: Production ensemble contains strictly `ecmwf_aifs` and `noaa_gfs`. Prohibit ECMWF IFS, NCMRWF, GraphCast, or dummy 3rd models.
* **Ground Truth**: Ground truth strictly uses IMDLIB (`tmax`, `tmin`, `precipitation`).
* **No Hardcoded Production Values**: Never fabricate forecasts, BMA weights, skill scores, or official IMD alerts.
* **Real BMA Mathematics**: Calibrated continuous mixture for temperature; non-negative hurdle-Gamma for precipitation; deterministic quantiles via numerical root-finding (`brentq`), not Monte Carlo.
* **Fixed Operational Scope**: Exactly the 10 PRD locations. No arbitrary operational coordinates.
* **Data Artifact Safety**: Large scientific binaries (GRIB, NetCDF, cache files) must never be committed to Git.

---

## 4. 10 Bounded Implementation Runs Reference

1. **Run 1 — Foundation**: Backend structure, dependencies, config, constants, logging, exceptions, cache dirs, `.gitignore`, state verification.
2. **Run 2 — Database**: SQLAlchemy Base, 9 ORM tables, Alembic migrations, database seed (10 locations + 2 models), DB tests.
3. **Run 3 — Data Sources + Verification**: Herbie base/cache, AIFS adapter, GFS adapter, IMDLIB adapter, interface validation, verification of tmax/tmin observation-day semantics.
4. **Run 4 — Meteorology**: Units, temporal windows, spatial extraction, precipitation accumulation/reset handling, daily extreme calculations.
5. **Run 5 — BMA Core**: Mathematical distributions (Gaussian mixture, hurdle-Gamma), parameter validation, deterministic quantile solver, unit tests.
6. **Run 6 — BMA Trainer**: Expectation-Maximization fitting, optimizer validation, regional/seasonal/lead adaptive hierarchy, fallback ladder, CRPS metrics.
7. **Run 7 — Training Service + CLI**: Training pipeline service, persistence of parameter sets/runs, `train_bma.py` CLI, source-validation CLI, coverage accounting.
8. **Run 8 — Forecast Service + API**: Forecast generation service, verification service, FastAPI application, Pydantic schemas, REST endpoints.
9. **Run 9 — Testing + Hardening**: Unit, integration, and E2E test suites, clean database migration smoke tests, API health/docs validation, defect resolution.
10. **Run 10 — Deployment + Docs + Final Audit**: Dockerfile, docker-compose, documentation, final PRD/AGENTS audit pass, zero frontend changes verification.
