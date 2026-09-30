# ClimaFuse BMA Backend — Product Requirements Document

## 1. Objective

Build the **production backend for ClimaFuse**, a weather forecasting system that combines:

* **ECMWF AIFS** — AI-based forecast
* **NOAA GFS** — physics-based NWP forecast
* **IMD gridded observations** — ground truth for calibration and verification
* **Bayesian Model Averaging (BMA)** — probabilistic fusion

The backend must expose the fused probabilistic forecast through a **FastAPI API** for the existing React frontend.

The frontend already exists and is visually complete. **This task is backend-only.**

---

## 2. Production Scope

The backend must support exactly these **10 operational locations**:

| ID        | Location  | Latitude | Longitude |
| --------- | --------- | -------: | --------: |
| delhi     | New Delhi |  28.6139 |   77.2090 |
| mumbai    | Mumbai    |  19.0760 |   72.8777 |
| bengaluru | Bengaluru |  12.9716 |   77.5946 |
| kolkata   | Kolkata   |  22.5726 |   88.3639 |
| chennai   | Chennai   |  13.0827 |   80.2707 |
| ahmedabad | Ahmedabad |  23.0225 |   72.5714 |
| hyderabad | Hyderabad |  17.3850 |   78.4867 |
| pune      | Pune      |  18.5204 |   73.8567 |
| jaipur    | Jaipur    |  26.9124 |   75.7873 |
| lucknow   | Lucknow   |  26.8467 |   80.9462 |

### Hard rule

The following production components must operate only on these 10 locations:

* BMA trainer
* BMA fuser
* forecast orchestrator
* database forecast records
* forecast API
* weight API
* verification API

Do **not** add arbitrary cities or accept arbitrary operational coordinates.

Using surrounding grid cells internally for interpolation or calibration is allowed.

---

## 3. Production Models

There are exactly **two** production forecast models:

### Model A — ECMWF AIFS

Use the current ECMWF AIFS deterministic open-data product through **Herbie**.

Do not assume historical Herbie identifiers are still correct. Inspect the installed Herbie version/model registry and verify the currently available AIFS product before implementation.

Record the actual AIFS product/model/version used for every forecast run.

### Model B — NOAA GFS

Use NOAA GFS through **Herbie**.

Prefer the current 0.25° product where appropriate, but verify the available product in the installed Herbie version rather than blindly hardcoding assumptions.

### Prohibited

Do not use:

* ECMWF IFS
* NCMRWF
* GraphCast as a third production model
* arbitrary external weather APIs
* fabricated forecast data

---

## 4. Ground Truth

Use **IMDLIB** to obtain historical IMD gridded observations.

Required target variables:

* `tmax`
* `tmin`
* `rain`

Canonical backend names:

* `tmax`
* `tmin`
* `precipitation`

Do not use instantaneous model temperature as a fake IMD ground-truth variable.

Respect the actual spatial resolution of each IMD dataset. Do not assume every variable uses the same grid resolution.

---

## 5. Forecast/Observation Alignment

Training and verification must explicitly track:

* forecast initialization/reference time
* model valid time
* observation date
* forecast lead time
* verification window
* timezone

Do not use uncontrolled nearest-time matching.

### Precipitation

IMD daily rainfall timing must be handled according to the actual IMD observation definition. Model precipitation accumulations must be converted into the same verification window before BMA training or verification.

### Temperature

`tmax` and `tmin` must be constructed from the model's **actual available forecast timesteps**.

Do not assume 3-hourly data or invent missing timesteps.

---

## 6. Spatial Processing

Do not build a giant global common grid unless technically necessary.

For operational forecasts:

1. obtain the model grid data;
2. interpolate/extract the required variables at the 10 operational locations;
3. use the relevant IMD grid cells for historical calibration.

Internal grid processing may use larger areas when required, but only the 10 defined locations are operational outputs.

---

## 7. BMA Requirements

Implement genuine **probabilistic Bayesian Model Averaging**, not a weighted arithmetic average of the two model forecasts.

For each forecast variable, BMA must estimate:

* model weight
* bias/calibration parameters
* uncertainty parameters

For temperature, use a calibrated two-component continuous mixture where each component represents one model.

Weights must be valid probabilities:

* \(w_{AIFS} \ge 0\)
* \(w_{GFS} \ge 0\)
* \(w_{AIFS}+w_{GFS}=1\)

Parameters must be constrained to finite, physically meaningful values.

The optimizer must verify convergence/success and reject invalid parameter sets.

---

## 8. Adaptive BMA Parameters

Parameters should support:

**location/region + variable + season + lead bucket**

with fallback to broader parameter groups when insufficient training data exists.

Recommended hierarchy:

1. location/region + variable + season + lead
2. region + variable + lead
3. region + variable
4. national + variable + season + lead
5. national + variable

Use configurable minimum sample thresholds.

Default starting threshold: **300 valid training samples**.

### Seasons

* DJF
* MAM
* JJAS
* ON

### Lead buckets

* `0_6h`
* `6_24h`
* `1_3d`
* `3_7d`
* `7_14d`

The implementation may adjust these only when required by the actual forecast timestep structure, provided the final hierarchy remains explicit and versioned.

---

## 9. Precipitation Distribution

Do **not** model rainfall with an unrestricted Gaussian distribution.

The precipitation distribution must prevent physically impossible negative rainfall.

Use a suitable hurdle/zero-inflated formulation such as:

* probability of no rain
* positive-rain distribution for rainfall > 0

The API must be able to return precipitation exceedance probabilities such as:

* P(rain > 0)
* P(rain > 10 mm)
* P(rain > 25 mm)

Thresholds should be configurable.

---

## 10. Probabilistic Output

For each location, valid time, and variable, return:

* distribution type
* mean
* median
* p10
* p25
* p50
* p75
* p90
* model inputs
* model weights
* calibration parameters/version
* provenance
* data/fusion quality status

For temperature, quantiles should be computed from the mixture distribution analytically/numerically rather than relying on unnecessary Monte Carlo sampling.

Monte Carlo may be used for diagnostics/tests.

---

## 11. Fallback Behavior

The backend must handle insufficient data or unavailable model input explicitly.

Examples:

* AIFS unavailable
* GFS unavailable
* missing observations
* insufficient BMA training data
* invalid fitted parameters
* failed forecast retrieval

Do not silently continue after critical errors.

Every forecast must have an explicit status such as:

* `success`
* `partial`
* `fallback`
* `failed`

The API must not present fallback data as if it were a normal two-model BMA result.

---

## 12. Training

Provide a reproducible BMA training pipeline using **calendar-year 2025 historical data**.

Training must:

1. obtain AIFS forecasts;
2. obtain GFS forecasts;
3. align forecasts with IMD observations;
4. generate training samples for the 10 locations;
5. fit BMA parameters;
6. validate parameters;
7. calculate verification metrics;
8. persist versioned parameters.

Training must prevent train/test leakage.

The final repository must contain:

`backend/BMA_TRAINING_2025.md`

This document must explain:

* prerequisites
* environment setup
* required data access
* exact training command(s)
* 2025 date range
* variables trained
* 10 operational locations
* where data are cached
* where parameters are written
* verification procedure
* how to activate a trained parameter version
* troubleshooting

Commands and paths in the document must match the actual implementation.

Do not invent performance numbers.

---

## 13. Database

Use **MySQL** for persistent operational data.

Use SQLAlchemy + Alembic.

At minimum persist:

### locations

Operational location metadata.

### models

AIFS/GFS model metadata.

### forecast_runs

Forecast execution metadata and status.

### model_forecasts

Raw/processed deterministic AIFS and GFS forecast values needed for fusion/provenance.

### observations

IMD verification observations.

### bma_parameters

Versioned trained BMA parameters.

### probabilistic_forecasts

Final BMA distributions and forecast quantiles.

### training_runs

Training metadata, data coverage, parameter version and status.

### verification_metrics

Forecast verification statistics.

Do **not** store raw GRIB/NetCDF files in MySQL. Store files in a cache/object/file layer and persist references/metadata in the DB.

---

## 14. API

Implement the backend with FastAPI.

Required endpoints:

### System

* `GET /api/v1/health`
* `GET /api/v1/health/ready`

### Locations

* `GET /api/v1/locations`

### Forecasts

* `GET /api/v1/forecasts/latest`
* `GET /api/v1/forecasts/location/{location_id}`
* `GET /api/v1/forecasts/map`

### BMA

* `GET /api/v1/bma/weights`
* `GET /api/v1/bma/weights/map`

### Verification

* `GET /api/v1/verification/summary`

### Runs

* `GET /api/v1/runs/latest`
* `GET /api/v1/runs/{run_id}`

Administrative training/forecast execution endpoints may also be added if needed.

All location endpoints must enforce the 10-location whitelist.

---

## 15. Frontend Contract

The existing frontend is the consumer of this API.

The backend must expose clean JSON responses suitable for:

* national overview
* city/station telemetry
* model comparison
* model-weight map
* probability distributions

Do not hardcode frontend colors, layout, typography, or UI behavior into the backend.

### UI freeze

**Do not modify the frontend during this task.**

Do not edit:

* JSX
* CSS
* Tailwind classes
* routing
* charts
* map components
* layout
* visual styling
* dummy-data files

even when frontend compatibility problems are discovered.

Report API/contract mismatches instead.

The existing frontend currently contains dummy model data; that data must **not** be used as the backend's source of truth.

The final production models are only:

**AIFS + GFS**

Any required visual change from the existing three-model dummy comparison will be handled separately by the frontend developer after the backend is complete.

---

## 16. Backend Structure

Use a clean separation similar to:

```text
backend/
  app/
    api/
    bma/
    data_sources/
    meteorology/
    db/
    models/
    services/
    schemas/
    core/
  scripts/
  tests/
  migrations/
  cache/
  BMA_TRAINING_2025.md
```

Exact structure may differ when justified, but responsibilities must remain separated.

---

## 17. Data Source Architecture

Create adapter layers for:

* Herbie base functionality
* ECMWF AIFS
* NOAA GFS
* IMDLIB

The rest of the backend must not depend directly on provider-specific retrieval details.

The adapters must expose normalized forecast/observation data with consistent:

* units
* timestamps
* coordinates
* variable names
* provenance
* availability status

---

## 18. Caching and Reproducibility

Cache downloaded/retrieved forecast and observation files.

The cache should prevent unnecessary re-downloads and make training reproducible.

Record:

* source
* model/product
* initialization time
* valid time
* retrieval time
* file/cache path
* data version where available

Do not commit large forecast artifacts to Git.

---

## 19. Verification

The system must calculate forecast quality metrics comparing:

* AIFS
* GFS
* BMA

At minimum support appropriate metrics for deterministic and probabilistic forecasts, including distributional/probabilistic verification where applicable.

Verification results must identify:

* location
* variable
* lead bucket
* model
* parameter version
* evaluation period

Do not claim BMA improves performance unless the verification results actually demonstrate it.

---

## 20. Testing

Implement automated tests for:

* BMA weight constraints
* parameter validation
* mixture distribution calculations
* precipitation non-negativity
* quantile calculation
* temporal alignment
* spatial interpolation/extraction
* fallback selection
* location whitelist
* API schemas
* database persistence

Also perform at least one end-to-end smoke test covering:

**model data → preprocessing → BMA → DB → API response**

---

## 21. Configuration

All environment-specific settings must be configurable through environment variables/configuration, including:

* MySQL connection
* data/cache directories
* Herbie settings
* model products
* training parameters
* minimum sample thresholds
* forecast horizon
* precipitation thresholds

Do not hardcode secrets or API keys.

---

## 22. Acceptance Criteria

The implementation is complete only when:

1. AIFS and GFS can be retrieved through the implemented adapters.
2. IMD observations can be retrieved through IMDLIB.
3. Forecast and observation timestamps are correctly aligned.
4. The 10-location whitelist is enforced end-to-end.
5. BMA parameters can be trained from 2025 historical data.
6. Fitted parameters are validated and versioned.
7. BMA produces probabilistic forecasts rather than simple averages.
8. Precipitation forecasts cannot contain negative rainfall.
9. Quantiles and exceedance probabilities are available through the API.
10. Forecasts and parameters are persisted in MySQL.
11. API endpoints return structured production-ready data.
12. Failure/fallback states are explicit.
13. Tests pass.
14. An end-to-end smoke test passes.
15. `backend/BMA_TRAINING_2025.md` is present and executable.
16. **No frontend file has been modified.**

---

## 23. Engineering Priority

When requirements conflict, use this priority:

**Correct scientific implementation > data integrity > reproducibility > API correctness > performance > convenience**

Do not simplify the statistical model merely to make implementation easier.

Do not fabricate unavailable data.

Do not silently substitute another model or observation source.

Do not modify the frontend to hide backend problems.
