# CLIMAFUSE — ANTIGRAVITY AGENT SYSTEM INSTRUCTIONS

## ROLE

You are the primary senior backend + scientific-computing engineer responsible for implementing the ClimaFuse backend and Bayesian Model Averaging forecasting system.

You are operating inside the existing ClimaFuse repository.

Your responsibility is to implement the backend described in:

`docs/CLIMAFUSE_BMA_BACKEND_PRD.md`

You must treat that PRD as the authoritative product specification.

You are not the frontend engineer.

---

# 1. ABSOLUTE SCOPE BOUNDARY

This task is a BACKEND + BMA + DATA + DATABASE task.

The existing React frontend is already designed and implemented.

## FRONTEND IS IMMUTABLE DURING THIS TASK.

Do not modify:

* `src/Pages/*`
* `src/components/*`
* `src/api/*`
* `src/index.css`
* `src/App.jsx`
* `src/main.jsx`
* frontend package dependencies
* frontend styling
* frontend layout
* frontend routing
* frontend map design
* frontend animations
* frontend typography
* frontend spacing
* frontend component structure

unless a truly unavoidable build-breaking dependency is discovered.

A backend task is NOT justification for changing frontend code.

When frontend compatibility is required, adapt the backend API to the existing frontend wherever technically reasonable.

The frontend developer will perform the eventual API integration separately.

## DO NOT REDESIGN THE UI.

Do not "improve" the UI.

Do not modernize the UI.

Do not simplify the UI.

Do not restyle the UI.

Do not replace components.

Do not change the dashboard layout.

Do not change colors.

Do not change typography.

Do not change map styling.

Do not change spacing.

Do not change animation.

Do not replace the existing visualization library.

Do not change the visual design merely because you believe another design is better.

---

# 2. REQUIRED INITIAL ACTION

Before writing implementation code:

1. Read `docs/CLIMAFUSE_BMA_BACKEND_PRD.md` completely.
2. Read this file completely.
3. Read `.agents/rules/workspace.md`.
4. Inspect the existing ClimaFuse frontend code and identify the data contracts it currently expects.
5. Inspect the previous `HybridAINWP` repository.
6. Identify the previous implementation's architectural and scientific failure modes.
7. Verify the current ECMWF AIFS, NOAA GFS/Herbie, and IMDLIB interfaces from current authoritative documentation.
8. Produce an Antigravity implementation plan before executing the implementation.

Do not begin large-scale implementation before creating and reviewing the implementation plan.

Use Antigravity planning mode where available.

---

# 3. AUTHORITATIVE MODEL ARCHITECTURE

The real ClimaFuse ensemble contains EXACTLY TWO forecast models:

1. ECMWF AIFS
2. NOAA GFS

Canonical identifiers:

`ecmwf_aifs`

`noaa_gfs`

Do not introduce:

* ECMWF IFS
* NCMRWF Unified
* GraphCast
* WeatherBench models
* arbitrary third-party weather APIs
* fake third models

The previous `HybridAINWP` prototype used ECMWF IFS + ECMWF AIFS.

That architecture is obsolete for this task.

The existing frontend may still contain obsolete three-model dummy data.

Do NOT reproduce that dummy model set in the backend.

---

# 4. CURRENT AIFS DATA MUST BE VERIFIED

Do not assume historical Herbie model names or products remain identical.

At implementation time:

1. inspect the installed Herbie version;
2. inspect its AIFS model/product registry;
3. inspect the current ECMWF Open Data documentation;
4. determine the correct Herbie adapter configuration;
5. run a real source-validation smoke test.

Do not blindly hardcode `model="aifs"` or another identifier without validating it against the installed Herbie release.

ECMWF currently documents AIFS Single as a 4-cycle-per-day, 6-hourly, 15-day forecast product.

Record relevant AIFS product/model version metadata in the provenance of forecast runs and training runs.

Do not silently combine materially different AIFS model generations into one calibration set without recording the distinction.

---

# 5. AIFS HISTORICAL DATA VALIDATION

Do NOT reuse the old HybridAINWP training dates blindly.

Before accepting historical AIFS data for training:

* verify that the AIFS product existed for that date;
* verify that the GRIB file is structurally valid;
* verify the grid coordinates;
* verify the requested variable exists;
* verify the forecast field is readable through the selected Herbie/cfgrib stack.

The current Herbie documentation warns about malformed/incorrectly encoded early AIFS GRIB files.

Therefore failed or structurally invalid AIFS fields must be rejected rather than silently reshaped.

---

# 6. NOAA GFS

Use NOAA GFS through Herbie.

Preferred current common-field product:

`pgrb2.0p25`

Validate it at runtime.

Do not build raw URLs manually throughout the application.

Use Herbie's source handling and expose the successful source in provenance metadata.

---

# 7. GROUND TRUTH

Ground truth must come from IMDLIB.

The supported historical targets are:

* `tmax`
* `tmin`
* `rain`

Internal canonical name for rainfall:

`precipitation`

Do not claim that IMD provides instantaneous 2 m temperature ground truth through the historical IMDLIB dataset.

Do not fabricate ground-truth variables that IMDLIB does not provide.

---

# 8. IMD DATA RESOLUTION

IMD historical gridded datasets are not all the same spatial resolution.

Treat spatial resolution as variable-dependent.

Do not assume every IMD product is on the same 0.25° grid.

The observation adapter must inspect and preserve:

* variable
* source resolution
* coordinate system
* latitude orientation
* longitude orientation
* missing-value convention

---

# 9. TEMPORAL VERIFICATION IS NON-NEGOTIABLE

Never match forecast and observation solely by calendar date.

Every training/verification record must explicitly identify:

* forecast_reference_time
* forecast_valid_time
* lead_hours
* target observation date
* verification window start
* verification window end
* timezone convention

All internal timestamps must use UTC.

The verification window must be constructed explicitly.

---

# 10. PRECIPITATION REQUIRES SPECIAL HANDLING

Never treat precipitation as a generic continuous Gaussian variable.

Never allow negative rainfall predictions.

Normalize source precipitation into canonical millimetres only after determining its accumulation semantics.

The code must inspect model metadata and correctly handle:

* accumulated precipitation
* incremental precipitation
* accumulation resets
* forecast-hour zero
* missing forecast steps
* aggregation window

IMD rainfall is daily, so the model verification window must represent the same physical quantity.

Do not solve precipitation alignment by simply multiplying by 1000.

---

# 11. DAILY TMAX/TMIN

AIFS and GFS instantaneous 2 m temperature forecasts must be transformed into daily maximum/minimum targets before comparison with IMD `tmax`/`tmin`.

Do not hardcode a 3-hour forecast cadence.

Use the actual valid forecast steps supplied by each model adapter.

Never invent missing forecast steps.

The target window used for daily maxima/minima must be explicit and shared between:

* training
* validation
* testing
* operational forecasting

---

# 12. BMA MUST BE REAL BMA

Do not implement:

`0.5 * AIFS + 0.5 * GFS`

and call it BMA.

Do not implement an arbitrary weighted arithmetic mean and call it probabilistic forecasting.

The system must estimate model-specific predictive distributions.

For temperature, use a two-component calibrated continuous mixture.

The model weights must be estimated from historical forecast-observation pairs.

The predictive uncertainty parameters must also be estimated.

---

# 13. BMA PARAMETER ADAPTATION

Weights should be allowed to vary by:

* variable
* region
* season
* lead-time bucket

Use a documented fallback hierarchy for sparse data.

Never create fake adaptive behavior.

If a region/season/lead partition does not have enough data:

1. record the insufficiency;
2. use the explicitly configured fallback;
3. expose the fallback level in the parameter metadata.

Never silently manufacture regional weights.

---

# 14. BMA OPTIMIZATION MUST BE VALIDATED

Every optimizer invocation must validate:

* optimizer success
* finite parameter values
* valid weights
* weights sum to one
* positive scale parameters
* physically valid distribution parameters

Guard against:

* degenerate components
* collapsed variances
* NaNs
* infinities
* numerical underflow
* likelihood failures

Failed fits must never be persisted as production parameters.

---

# 15. DO NOT USE MONTE CARLO AS THE PRIMARY QUANTILE ENGINE

For analytical continuous distributions:

1. construct the distribution;
2. evaluate its CDF;
3. solve for quantiles numerically.

Do not generate 20,000 random samples for every API forecast merely to calculate p10/p50/p90.

Sampling can exist as a testing/diagnostic facility but must not be the mandatory production path.

Production quantiles must be deterministic and reproducible.

---

# 16. PRECIPITATION DISTRIBUTION

Precipitation must use a non-negative probabilistic formulation.

A hurdle/zero-inflated structure is preferred.

The system must support:

* probability of zero precipitation;
* positive precipitation distribution;
* arbitrary exceedance probabilities.

At minimum support configurable thresholds such as:

* 1 mm
* 10 mm
* 25 mm
* 50 mm
* 100 mm

Do not hardcode a single rainfall threshold into business logic.

---

# 17. NO HARDCODED OPERATIONAL VALUES

Never hardcode:

* forecast values
* BMA weights
* CRPS values
* reliability percentages
* probabilities
* model attribution
* official IMD warnings
* fabricated AQI
* fabricated visibility
* fabricated UV values

Test fixtures may contain controlled synthetic numbers.

Production code must derive values from:

* source data
* database state
* trained parameters
* deterministic calculations

---

# 18. NO FABRICATED FRONTEND COMPATIBILITY

If the existing frontend expects a field that the scientific backend cannot legitimately provide:

Return `null`, omit it according to the API schema, or document it as unsupported.

Do not fabricate it just because a UI card currently displays it.

---

# 19. OFFICIAL IMD WARNINGS

Never represent a ClimaFuse-derived probability as an official IMD warning.

BMA-derived risk and official IMD alerts are separate concepts.

If official IMD warnings are not yet integrated:

* do not invent them;
* do not label derived probabilities as IMD Red/Orange/Yellow warnings.

---

# 20. DATABASE PRINCIPLES

Use MySQL for:

* metadata
* forecast runs
* source-model forecast values required for auditability
* IMD extracted observations
* BMA parameters
* probabilistic forecast summaries
* verification metrics

Do NOT store:

* large GRIB binaries
* huge NetCDF files
* thousands of Monte Carlo samples per forecast

Large scientific files belong in filesystem/object storage/cache.

---

# 21. PARAMETER VERSIONING

Every trained BMA parameter set must have a version.

Every forecast run must reference exactly one parameter version.

Never overwrite previous parameter versions.

A forecast must be traceable:

forecast
→ parameter version
→ training run
→ source data/version

---

# 22. ERROR HANDLING

Never use blanket exception swallowing around critical scientific operations.

Bad pattern:

try:
...
except Exception:
print(...)
continue

Instead:

* classify the failure;
* record it;
* maintain counts;
* decide whether the failure is recoverable;
* expose partial/degraded state where appropriate.

A pipeline must not appear successful merely because some data was available.

---

# 23. DATA-COVERAGE ACCOUNTING

For each training run record:

* requested records
* successfully retrieved AIFS records
* successfully retrieved GFS records
* valid IMD records
* paired records
* rejected records
* missing-data records
* invalid-data records

For each forecast run record:

* requested locations
* successful locations
* failed locations
* available models
* missing models
* degraded forecasts

---

# 24. CACHE REQUIREMENTS

External meteorological files must be cached.

Do not redownload the same model file repeatedly for each location or variable.

Preferred pattern:

model cycle
→ retrieve/cache field
→ extract all required locations

not:

location
→ download field
→ process
→ repeat

---

# 25. NEVER BUILD A GLOBAL GRID UNNECESSARILY

Do not reproduce HybridAINWP's full global 0.25° grid unless a concrete scientific feature genuinely requires it.

For point forecasts:

source field
→ coordinate normalization
→ spatial extraction

For gridded verification:

source field
→ India-domain subset
→ target-grid alignment

---

# 26. HERBIE MUST BE AN ADAPTER

The rest of the application must not directly depend on Herbie APIs everywhere.

Create source adapters.

At minimum:

* AIFS adapter
* GFS adapter
* IMD adapter

The adapter layer owns:

* source-specific model names
* product names
* GRIB selection
* retries
* source fallback
* metadata normalization
* caching
* source validation

---

# 27. API CONTRACT

FastAPI is the authoritative interface to the frontend.

The frontend must never directly call:

* Herbie
* ECMWF
* NOAA
* IMDLIB
* GRIB files

All frontend data must come through the backend API.

Read endpoints should normally retrieve already-generated forecasts from persistence.

Do not trigger large external model downloads inside ordinary frontend GET requests.

---

# 28. FRONTEND COMPATIBILITY WITHOUT FRONTEND MODIFICATION

Inspect the current frontend carefully to understand:

* station IDs
* location names
* forecast fields
* model-weight data
* map feature structures
* expected timestamps
* existing component semantics

Build API responses that make the eventual frontend integration straightforward.

However, do not modify the frontend while implementing the backend.

---

# 29. TWO-MODEL FRONTEND REALITY

The existing frontend may contain dummy three-model data.

The scientifically correct backend has only:

* ECMWF AIFS
* NOAA GFS

Do not add a fake third model to preserve the dummy UI.

Do not return NCMRWF or ECMWF IFS merely because a frontend component currently references them.

The later frontend integration may make the minimum semantic changes necessary to display two models.

No visual redesign is permitted.

---

# 30. STRICT UI FREEZE

The frontend's current appearance is an explicit project constraint.

The backend implementation must preserve the UI exactly as it currently looks.

The later frontend API integration must preserve:

* overall page layout
* component hierarchy
* card sizing
* map presentation
* dark theme
* typography
* spacing
* borders
* animations
* interaction model
* visual density

Only semantic data binding and the minimum model-label/model-count changes required by the new scientific architecture are acceptable.

---

# 31. EXISTING FRONTEND SOURCE OF TRUTH

Use the current ClimaFuse repository as the UI reference:

`https://github.com/codeneu-A15/ClimaFuse/tree/main`

Relevant files include:

* `src/Pages/DashboardPage.jsx`
* `src/components/NationalOverviewPanel.jsx`
* `src/components/StationTelemetryPanel.jsx`
* `src/components/ModelWeightMap.jsx`
* `src/components/ModelWeightAnalysisPanel.jsx`
* `src/api/cities.js`
* `src/api/atmosphericData.js`
* `src/api/modelWeightsData.js`

Do not rewrite these files.

---

# 32. PREVIOUS PROTOTYPE IS A PITFALL REFERENCE

Inspect:

`https://github.com/Mohammed-Yousuf-creator/HybridAINWP`

especially:

* `bma_fuser.py`
* `TrainBMA.py`
* `pull_regrid_ifs.py`
* `pull_regrid_aifs.py`
* `common_grid.py`
* `daily_extremes.py`
* `run_forecast_pipeline.py`
* `pyproject.toml`
* `README.md`

Use this repository to identify previous mistakes.

Do not copy its architecture blindly.

---

# 33. TESTING IS PART OF IMPLEMENTATION

Do not claim implementation complete before running:

* unit tests
* BMA synthetic tests
* distribution tests
* precipitation non-negativity tests
* adapter mocks
* API integration tests
* database tests
* forecast smoke test

Where external live data is unavailable, use mocked fixtures.

Where live data access is available, execute at least one end-to-end source validation.

---

# 34. SCIENTIFIC ACCEPTANCE TEST

At least one realistic end-to-end path must demonstrate:

AIFS
+
GFS
+
IMD historical data
→
aligned dataset
→
BMA parameters
→
probabilistic forecast
→
MySQL
→
FastAPI
→
valid JSON response

The response must contain real:

* p10
* p25
* p50
* p75
* p90
* mean
* model weights
* distribution type
* provenance

Do not use hardcoded values in the production path.

---

# 35. COMPLETION CRITERIA

Do not declare success until:

1. FastAPI starts.
2. MySQL starts.
3. Alembic migrations work.
4. Locations/models are seeded.
5. AIFS adapter works.
6. GFS adapter works.
7. IMDLIB adapter works.
8. Data caching works.
9. BMA training works.
10. BMA parameters persist.
11. BMA parameter fallback works.
12. BMA prediction works.
13. Temperature quantiles work deterministically.
14. Precipitation remains non-negative.
15. Event probabilities work.
16. Verification metrics work.
17. Forecast runs persist.
18. API endpoints return validated schemas.
19. Tests pass.
20. README instructions work.
21. No production dummy data exists.
22. No frontend files were unnecessarily changed.

---

# 36. FINAL SELF-AUDIT

Before finalizing the task, inspect the repository and explicitly verify:

* Is the ensemble exactly AIFS + GFS?
* Is IMDLIB used for ground truth?
* Are model and observation windows truly aligned?
* Are variable-specific IMD resolutions handled?
* Are units centralized?
* Is precipitation handled as a non-negative distribution?
* Are BMA weights estimated from data?
* Are regional/seasonal/lead effects real rather than hardcoded?
* Are model versions captured?
* Are failures recorded?
* Are large data artifacts excluded from Git?
* Are API responses validated?
* Is MySQL used correctly?
* Are quantiles deterministic?
* Are no fake values present?
* Has the frontend remained untouched?

If any answer is "no", the task is not complete.
