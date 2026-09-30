---
trigger: always_on
---

# ClimaFuse Workspace Rules

## BACKEND-ONLY TASK

This workspace task is to implement:

* FastAPI backend
* MySQL database
* Alembic migrations
* AIFS data acquisition
* NOAA GFS data acquisition
* IMDLIB ground truth
* BMA training
* BMA calibration
* probabilistic forecast generation
* verification
* backend API

The existing frontend is already complete.

---

## FRONTEND IMMUTABLE

DO NOT modify the frontend during this task.

Protected paths:

```text
src/
src/Pages/
src/components/
src/api/
src/index.css
src/App.jsx
src/main.jsx
```

Do not redesign, restyle, refactor, or reorganize the UI.

Do not change:

* layout
* colors
* typography
* spacing
* cards
* map design
* animations
* routing
* component structure

The frontend developer will perform API integration separately.

---

## TWO MODELS ONLY

Production ensemble:

```text
ECMWF AIFS
NOAA GFS
```

Do not introduce:

```text
ECMWF IFS
NCMRWF
GraphCast
fake third model
```

---

## NO FABRICATION

Never hardcode production:

* forecast values
* probabilities
* BMA weights
* CRPS
* reliability
* model skill
* official IMD warnings
* unsupported telemetry

Unsupported fields must be null/omitted.

---

## SCIENTIFIC INTEGRITY

BMA must be actual probabilistic model averaging.

Do not implement a simple arithmetic weighted average.

Temperature requires a calibrated continuous predictive mixture.

Precipitation requires a non-negative distributional model.

---

## DATA INTEGRITY

Do not silently swallow source failures.

Do not accept unmatched forecast/observation dates.

Do not assume all IMD variables have the same spatial resolution.

Do not assume all models have the same forecast timestep.

Do not assume AIFS historical files are valid merely because a download succeeded.

---

## SOURCE VALIDATION

Validate current Herbie/AIFS/GFS interfaces against current installed versions.

Never blindly copy old model identifiers from HybridAINWP.

---

## PREVIOUS REPOSITORY

Use:

`https://github.com/Mohammed-Yousuf-creator/HybridAINWP`

only as a failure-analysis reference.

Do not copy its:

* IFS+AIFS architecture
* global common grid
* single global BMA parameter file
* Gaussian precipitation model
* Monte Carlo-only quantile implementation
* three-model assumptions
* missing dependency configuration
* placeholder API architecture

---

## COMPLETION

Implementation is incomplete until tests pass and a realistic end-to-end backend path is demonstrated.

Do not declare completion because files were created.

The system must actually run.
