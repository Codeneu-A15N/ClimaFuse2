ClimaFuse Backend — Implementation Plan

Status: Pre-implementation analysis complete. This plan is binding before any code is written.

0. Pre-Analysis Findings

0.1 Frontend Data Contracts

All frontend data is currently static/mock JS. The frontend does not call any real API.

Fields the backend CANNOT legitimately provide:

aqi / aqiStatus / aqiColor — not from AIFS/GFS/IMD

visibility — not a production variable

wind / windDir — not a BMA output variable

dewPoint, barometric pressure, UV index

Official alertTier / alertDesc / alertDuration — IMD alerts not integrated

These must be returned as null or omitted from the API.

Critical contract gap: Frontend uses 3 models (ECMWF IFS + ECMWF AIFS + NCMRWF). Backend has exactly 2 (AIFS + GFS). Frontend dev will update semantic binding later without visual redesign.

0.2 HybridAINWP Pitfalls

Wrong ensemble: IFS + AIFS instead of GFS + AIFS

Full global 0.25 degree grid — wasteful

Gaussian precipitation — allows negatives

Min sample threshold = 20 — too low (PRD: 300)

Single global bma_params.json — no regional/seasonal/lead stratification

No optimizer validation or convergence check

Calendar-date-only matching — no explicit verification windows

IMD resolution assumed uniform across variables

No caching strategy documented

No test suite, no API, no database

0.3 Validated Data Source Identifiers

Source

Herbie model

Herbie product

Notes

ECMWF AIFS

aifs

oper

Operational since Feb 25, 2025; early GRIBs before March 13, 2024 have encoding bugs

NOAA GFS

gfs

pgrb2.0p25

Stable

IMD rain

imdlib

—

0.25 deg resolution

IMD tmax

imdlib

—

1.0 deg (archive), 0.5 deg (real-time)

IMD tmin

imdlib

—

1.0 deg (archive), 0.5 deg (real-time)

0.4A Resolved 2025 AIFS Training Period and Verification Gate

BMA training: 2025-02-25 through 2025-09-30.

BMA test: 2025-10-01 through 2025-12-31.

Exclude 2025-01-01 through 2025-02-24 from production BMA fitting because deterministic AIFS became operational on 2025-02-25; do not mix experimental/pre-operational data into the production training set.

Record the actual AIFS product/model/version for each retrieved sample; 2025 includes AIFS operational version changes, so do not pretend the whole period is one unchanged model.

IMD daily rainfall semantics are resolved as 0830 IST -> 0830 IST (03:00 UTC -> 03:00 UTC).

IMDLIB documents daily tmax/tmin observations but the cited API docs do not explicitly define their UTC observation window. Therefore Run 3 must inspect authoritative IMD/IMDLIB dataset behavior and record the verified tmax/tmin observation-day mapping in docs/AGENT_STATE.md before Run 4 finalizes temporal.py.

Never hard-code a temperature UTC window solely because an earlier draft of this plan contained one.

0.4 Environment

Python 3.12.9 available

No backend dependencies installed yet

Backend/ directory is empty

1. Repository Structure

backend/
  app/
    __init__.py
    main.py                    # FastAPI app factory
    api/
      __init__.py
      deps.py                  # DI: DB session, settings
      v1/
        __init__.py
        router.py
        health.py
        locations.py
        forecasts.py
        bma.py
        verification.py
        runs.py
    core/
      __init__.py
      config.py                # Pydantic Settings
      constants.py             # 10 locations, seasons, lead buckets
      logging.py
      exceptions.py
    db/
      __init__.py
      base.py                  # SQLAlchemy Base
      session.py               # engine, SessionLocal
      init_db.py               # seed locations + models
    models/                    # SQLAlchemy ORM models (9 tables)
      __init__.py
      location.py
      model_source.py
      forecast_run.py
      model_forecast.py
      observation.py
      bma_parameter.py
      probabilistic_forecast.py
      training_run.py
      verification_metric.py
    schemas/                   # Pydantic response/request schemas
      __init__.py
      location.py
      forecast.py
      bma.py
      verification.py
      run.py
    data_sources/              # Adapter layer — external data ONLY
      __init__.py
      base.py                  # Abstract adapter interface
      herbie_base.py           # Shared Herbie wrapper + caching
      aifs_adapter.py          # ECMWF AIFS via Herbie
      gfs_adapter.py           # NOAA GFS via Herbie
      imd_adapter.py           # IMDLIB wrapper
    meteorology/               # Pure scientific transforms
      __init__.py
      units.py                 # Centralized unit conversions (K->C, m->mm)
      temporal.py              # UTC alignment, verification windows
      spatial.py               # Point extraction, nearest-neighbor
      precipitation.py         # Accumulation semantics
      extremes.py              # tmax/tmin from actual timesteps
    bma/                       # Probabilistic BMA — pure science, no I/O
      __init__.py
      trainer.py               # BMA parameter estimation (EM/SLSQP)
      predictor.py             # BMA forecast given fitted params
      distributions.py         # Gaussian mixture + hurdle-Gamma
      validator.py             # Parameter constraint validation
      fallback.py              # Fallback hierarchy logic
      metrics.py               # CRPS, reliability, RMSE
    services/                  # Orchestration between layers
      __init__.py
      forecast_service.py
      training_service.py
      verification_service.py
  migrations/
    env.py
    script.py.mako
    versions/
      0001_initial_schema.py
  scripts/
    seed_db.py
    train_bma.py
    run_forecast.py
    validate_sources.py
  tests/
    __init__.py
    conftest.py
    unit/
      test_bma_weights.py
      test_distributions.py
      test_precipitation.py
      test_temporal_alignment.py
      test_spatial.py
      test_fallback.py
      test_units.py
      test_parameter_validation.py
    integration/
      test_api_schemas.py
      test_location_whitelist.py
      test_db_persistence.py
    e2e/
      test_smoke_pipeline.py
  cache/                       # gitignored: GRIB/NetCDF cache
    aifs/
    gfs/
    imd/
  docker/
    Dockerfile
    docker-compose.yml
  pyproject.toml
  requirements.txt
  alembic.ini
  .env.example
  BMA_TRAINING_2025.md
  docs/AGENT_STATE.md

2. Database Schema (9 tables)

locations

id VARCHAR(20) PK
name, state, latitude, longitude, aws_id, is_active, created_at

source_models

id INT PK AUTO_INCREMENT
canonical_id VARCHAR(20) UNIQUE   -- 'ecmwf_aifs', 'noaa_gfs'
herbie_model, herbie_product, display_name, provider, is_active

forecast_runs

id BIGINT PK, run_uuid CHAR(36) UNIQUE
reference_time DATETIME UTC, valid_time_start, valid_time_end
status ENUM('pending','running','success','partial','fallback','failed')
aifs_available BOOL, gfs_available BOOL
locations_requested, locations_success, locations_failed INT
error_summary TEXT, provenance JSON
parameter_version_id BIGINT FK
created_at, completed_at DATETIME UTC

model_forecasts

id BIGINT PK
forecast_run_id FK, source_model_id FK, location_id FK
variable ENUM('tmax','tmin','precipitation')
reference_time, valid_time DATETIME UTC
lead_hours FLOAT
value DECIMAL(10,4), unit VARCHAR(20)
quality_flag TINYINT   -- 0=ok, 1=interp, 2=extrap, 3=rejected
source_file_ref VARCHAR(500)

observations

id BIGINT PK
location_id FK, variable ENUM
obs_date DATE
value DECIMAL(10,4), unit VARCHAR(20)
source_resolution DECIMAL(5,3)  -- 0.25, 1.0, 0.5
imd_file_ref VARCHAR(500), quality_flag TINYINT
UNIQUE(location_id, variable, obs_date)

training_runs

id BIGINT PK, run_uuid CHAR(36) UNIQUE
variable ENUM
train_start_date, train_end_date, test_start_date, test_end_date DATE
requested_records, aifs_retrieved, gfs_retrieved, imd_retrieved INT
paired_records, rejected_records, missing_records INT
status ENUM('running','success','failed','partial')
error_summary TEXT
parameter_version_id BIGINT FK
created_at, completed_at DATETIME UTC

bma_parameters

id BIGINT PK
version VARCHAR(50) UNIQUE     -- e.g. 'v1.0.0-2025-tmax'
variable ENUM
location_id VARCHAR(20) NULL FK
region VARCHAR(50) NULL
season ENUM('DJF','MAM','JJAS','ON') NULL
lead_bucket ENUM('0_6h','6_24h','1_3d','3_7d','7_14d') NULL
fallback_level TINYINT         -- 1=most specific, 5=national+var only
w_aifs DECIMAL(8,6)            -- [0,1]
w_gfs DECIMAL(8,6)             -- [0,1], w_aifs + w_gfs = 1
bias_aifs, bias_gfs DECIMAL(10,4)
sigma_aifs, sigma_gfs DECIMAL(10,4)
-- Precipitation extras (NULL for temperature)
p_zero_aifs, p_zero_gfs DECIMAL(8,6)
shape_aifs, scale_aifs, shape_gfs, scale_gfs DECIMAL(10,6)
-- Metadata
n_samples INT
optimizer_success BOOL
optimizer_message VARCHAR(200)
training_run_id BIGINT FK
is_active BOOL DEFAULT FALSE
created_at DATETIME UTC

probabilistic_forecasts

id BIGINT PK
forecast_run_id FK, location_id FK
variable ENUM
reference_time, valid_time DATETIME UTC
lead_hours FLOAT
lead_bucket ENUM, season ENUM
distribution_type VARCHAR(50)  -- 'gaussian_mixture', 'hurdle_gamma'
mean_val, median_val DECIMAL(10,4)
p10, p25, p50, p75, p90 DECIMAL(10,4)
-- Precipitation exceedance (NULL for temperature)
prob_gt_0, prob_gt_1mm, prob_gt_10mm DECIMAL(8,6)
prob_gt_25mm, prob_gt_50mm, prob_gt_100mm DECIMAL(8,6)
aifs_input, gfs_input DECIMAL(10,4)
w_aifs, w_gfs DECIMAL(8,6)
parameter_version_id BIGINT FK
fallback_level TINYINT
status ENUM('success','partial','fallback','failed')
created_at DATETIME UTC

verification_metrics

id BIGINT PK
training_run_id BIGINT FK NULL
forecast_run_id BIGINT FK NULL
location_id FK NULL
variable ENUM
model ENUM('ecmwf_aifs','noaa_gfs','bma')
lead_bucket ENUM NULL, season ENUM NULL
eval_start_date, eval_end_date DATE
n_samples INT
rmse, mae, bias, crps DECIMAL(10,4)
reliability DECIMAL(8,4)
brier_1mm, brier_10mm, brier_25mm DECIMAL(8,6)
parameter_version VARCHAR(50)
created_at DATETIME UTC

3. Data Source Adapters

AIFS Adapter

Candidate Herbie identifiers: model='aifs', product='oper' from the pre-analysis.

Run 3 MUST verify the actual installed-Herbie identifiers and live availability before treating them as authoritative.

Operational BMA training starts 2025-02-25; exclude earlier experimental/pre-operational samples.

Verify actual forecast cycles, steps, variables, precipitation units/semantics, and current AIFS model/version before implementation.

Reject any GRIB file that cannot be read by cfgrib.

Cache by: (init_date, cycle_hour, variable, fxx).

Record AIFS product/model/version in provenance.

GFS Adapter

model='gfs', product='pgrb2.0p25'

GFS cycles: 00Z, 06Z, 12Z, 18Z

Steps: 0-120h hourly, then 3-hourly to 384h

Variables: TMP:2 m (Kelvin), APCP (accumulated precip, mm since init)

APCP must be differenced to get incremental precipitation per step

Expose successful Herbie source in provenance

IMD Adapter

rain: 0.25 deg resolution, daily, mm/day

tmax: 1.0 deg resolution (archive), 0.5 deg (recent/real-time)

tmin: 1.0 deg resolution (archive), 0.5 deg (recent/real-time)

Missing value: -999 -> reject and count

IMD rain day: 08:30 IST to 08:30 IST next day = UTC 03:00Z to 03:00Z

Latitude orientation: verify whether ascending or descending, normalize

Record resolution per variable in observations table

4. Meteorology Module

temporal.py — Explicit verification windows

IMD rain obs_date D:
  verification_window_start = (D-1) 03:00 UTC
  verification_window_end   = D     03:00 UTC

IMD tmax/tmin obs_date D:
  verification_window_start = D     00:00 UTC
  verification_window_end   = D+1   00:00 UTC
  tmax = max(2t values in window)
  tmin = min(2t values in window)
  Use actual timesteps only — no invented values

units.py — Centralized conversions

temperature: K to C  = K - 273.15
precipitation AIFS:  metres to mm = * 1000 (verify GRIB units)
precipitation GFS:   already in mm (verify GRIB units)
lead_hours: float = (valid_time - reference_time).total_seconds() / 3600
all timestamps: datetime UTC

precipitation.py — Accumulation semantics

GFS APCP step N = APCP(N) - APCP(N-1)
AIFS tp: inspect GRIB stepRange/typeOfStatisticalProcessing
  if cumulative from init: difference steps
  if 6-hourly accumulation: use directly
Never silently assume; record assumed type in provenance

5. BMA Design

Temperature: Gaussian Mixture

p(y | f_A, f_G) = w_A * N(y; f_A + bias_A, sigma_A^2)
                + w_G * N(y; f_G + bias_G, sigma_G^2)

Constraints:
  w_A + w_G = 1,  w_i >= 0
  sigma_i >= 0.01
  |bias_i| <= 20 degrees C

Quantile calculation: brentq on mixture CDF — deterministic, not Monte Carlo
Fitting: SLSQP with constraints, or EM algorithm
Optimizer validation: success=True, finite params, weights sum to 1
Failed fits: NOT persisted, fallback to broader partition

Precipitation: Hurdle-Gamma Model

P(Y = 0) = pi_0
P(Y > 0) = (1 - pi_0) * Gamma(shape, scale)

pi_0 = w_A * sigmoid(alpha_A * f_A + beta_A)
     + w_G * sigmoid(alpha_G * f_G + beta_G)

Exceedance P(Y > t) = (1 - pi_0) * (1 - Gamma.cdf(t, shape, scale))
Precipitation always >= 0 by construction

Configurable thresholds: [0, 1, 10, 25, 50, 100] mm

Adaptive Parameter Hierarchy

Level 1: location + variable + season + lead_bucket  (min: 300 samples)
Level 2: region   + variable + lead_bucket           (min: 300 samples)
Level 3: region   + variable                         (min: 300 samples)
Level 4: national + variable + season + lead_bucket  (min: 150 samples)
Level 5: national + variable                         (min: 100 samples)

Fallback level recorded in bma_parameters, probabilistic_forecasts, and API response.

Seasons

DJF:  months 12, 1, 2
MAM:  months 3, 4, 5
JJAS: months 6, 7, 8, 9
ON:   months 10, 11

Lead Buckets

0_6h:   0  to 6 hours
6_24h:  6  to 24 hours
1_3d:   24 to 72 hours
3_7d:   72 to 168 hours
7_14d:  168 to 336 hours

6. Training Workflow

Input: operational 2025 data, 10 locations, variables [tmax, tmin, precipitation]
Train: 2025-02-25 to 2025-09-30
Test:  2025-10-01 to 2025-12-31 (no leakage)
Exclude 2025-01-01 to 2025-02-24 from production BMA fitting.
Before finalizing temperature pairing, use the verified IMD tmax/tmin observation-day semantics recorded during Run 3.

For each date D:
  1. Retrieve/cache AIFS 00Z cycle, extract needed fxx steps
  2. Retrieve/cache GFS 00Z cycle, extract needed fxx steps
  3. Compute tmax/tmin from actual available 2t timesteps
  4. Compute daily precip from accumulation differencing
  5. Load IMD obs for date D (rain) and D (tmax/tmin)
  6. Align by explicit verification window
  7. Validate: no NaN, physically plausible values
  8. Record coverage counts

For each (variable, partition):
  1. If n >= threshold: fit BMA parameters via optimizer
  2. Validate fitted parameters (finite, weights sum to 1, sigmas > 0)
  3. If valid: persist to bma_parameters (inactive)
  4. If invalid: log, fallback to broader partition

After all partitions fitted:
  1. Mark parameter version as active
  2. Run verification on test set
  3. Persist verification_metrics
  4. Record training_run with full coverage accounting

7. Operational Forecast Workflow

1. Check latest AIFS cycle availability (00Z, 06Z, 12Z, 18Z)
2. Check latest GFS cycle availability
3. Download/cache fields
4. Extract 10-location values for forecast horizon
5. Transform to tmax/tmin/precipitation per day
6. Load active BMA parameters for each (location, variable, season, lead)
7. Apply BMA predictor:
   a. Lookup params with fallback
   b. Compute mixture quantiles via brentq
   c. Compute exceedance probabilities analytically
8. Persist probabilistic_forecasts
9. Persist forecast_run with status and coverage counts

8. API Endpoints

GET  /api/v1/health
GET  /api/v1/health/ready
GET  /api/v1/locations
GET  /api/v1/forecasts/latest?variable={tmax|tmin|precipitation}
GET  /api/v1/forecasts/location/{location_id}?variable=&days=
GET  /api/v1/forecasts/map?variable=
GET  /api/v1/bma/weights?variable=&lead=
GET  /api/v1/bma/weights/map?variable=
GET  /api/v1/verification/summary
GET  /api/v1/runs/latest
GET  /api/v1/runs/{run_id}
POST /api/v1/admin/forecast  (trigger operational forecast)
POST /api/v1/admin/train     (trigger training run)

All location endpoints enforce 10-location whitelist.
All responses are Pydantic-validated.
No production forecasts are triggered by frontend GET requests.

9. Tests

Unit tests (no external dependencies)

test_bma_weights.py: weights sum to 1, non-negative, gradient of log-likelihood

test_distributions.py: Gaussian mixture CDF/quantile matches Monte Carlo within 0.1 C

test_precipitation.py: non-negativity, hurdle structure, exceedance probabilities >= 0

test_temporal_alignment.py: IMD rain window UTC, tmax/tmin window

test_spatial.py: nearest-cell extraction accuracy

test_fallback.py: correct fallback level chosen given data counts

test_units.py: K->C, metres->mm

test_parameter_validation.py: rejects invalid, accepts valid

Integration tests (test DB + API)

test_api_schemas.py: all endpoints return Pydantic-valid JSON

test_location_whitelist.py: unknown location returns 404

test_db_persistence.py: training_run and bma_parameters write and read correctly

E2E tests (mocked adapters)

test_smoke_pipeline.py: mocked AIFS + GFS + IMD -> BMA -> DB -> API response

10. Docker

services:
  db:
    image: mysql:8.0
    environment:
      MYSQL_ROOT_PASSWORD: ${MYSQL_ROOT_PASSWORD}
      MYSQL_DATABASE: climafuse
      MYSQL_USER: ${MYSQL_USER}
      MYSQL_PASSWORD: ${MYSQL_PASSWORD}
    volumes:
      - mysql_data:/var/lib/mysql
    ports: ["3306:3306"]

  api:
    build: .
    command: uvicorn app.main:app --host 0.0.0.0 --port 8000 --reload
    depends_on: [db]
    environment:
      DATABASE_URL: mysql+pymysql://${MYSQL_USER}:${MYSQL_PASSWORD}@db/climafuse
      CACHE_DIR: /app/cache
    volumes: [./cache:/app/cache]
    ports: ["8000:8000"]

volumes:
  mysql_data:

11. Configuration (core/config.py)

class Settings(BaseSettings):
    database_url: str = "mysql+pymysql://root:password@localhost/climafuse"
    cache_dir: Path = Path("cache")
    herbie_save_dir: Path = Path("cache/herbie")
    train_start_date: date = date(2025, 1, 1)
    train_end_date: date = date(2025, 9, 30)
    test_start_date: date = date(2025, 10, 1)
    test_end_date: date = date(2025, 12, 31)
    min_samples_specific: int = 300
    min_samples_national_season_lead: int = 150
    min_samples_national: int = 100
    forecast_horizon_days: int = 10
    precip_thresholds_mm: list[float] = [0, 1, 10, 25, 50, 100]
    api_v1_prefix: str = "/api/v1"
    class Config:
        env_file = ".env"

12. Frontend Compatibility Strategy

Backend API is designed for eventual frontend wiring WITHOUT visual redesign:

GET /api/v1/forecasts/latest -> replaces CITIES static data

GET /api/v1/bma/weights -> replaces modelWeightsData.js static data

GET /api/v1/forecasts/map -> GeoJSON for map layer

GET /api/v1/locations -> replaces city list

Documented mismatches for frontend developer:

Backend: 2 models (ecmwf_aifs, noaa_gfs). Frontend currently shows 3.

Backend: probabilistic quantiles. Frontend shows scalars.

Backend: does NOT provide aqi, visibility, wind, dewPoint, UV, alertTier, alertDesc.
These fields will be null in the API response.

13. Validation Strategy

validate_sources.py — AIFS and GFS accessible via Herbie

pytest tests/unit/ — all pass

pytest tests/integration/ — all pass (with SQLite for CI)

pytest tests/e2e/ — smoke test passes with mocked adapters

uvicorn app.main — starts without error

GET /api/v1/health — {"status": "ok"}

GET /api/v1/locations — 10 locations returned

GET /api/v1/docs — OpenAPI docs load

alembic upgrade head — migrations apply to fresh MySQL

python scripts/seed_db.py — seeds without error

14. Final Audit Checklist

Chained-run integrity

docs/AGENT_STATE.md reflects only the current state and latest handoff.

Each bounded run has a corresponding Git commit.

Detailed history is in Git, not in AGENT_STATE.md.

No frontend file was modified.

Ensemble is exactly AIFS + GFS (no IFS, no NCMRWF)

IMDLIB used for ground truth

IMD resolution tracked per variable (0.25 rain, 1.0/0.5 temperature)

All timestamps UTC

Verification windows explicitly constructed

Precipitation non-negative by construction

BMA weights estimated from data

Regional/seasonal/lead partitioning real and tested

Fallback levels tracked in DB and API response

Quantiles deterministic (brentq, not Monte Carlo)

No hardcoded operational forecast values

Failed optimizer fits NOT persisted

Large GRIB/NetCDF files excluded from Git (.gitignore)

API responses Pydantic-validated

MySQL schema correct with Alembic migration

Frontend src/ files untouched

Tests pass

API starts

16. Execution Order — 10 Bounded Gemini 3.8 Runs

Run 1 — Foundation

Backend structure, dependencies, config, constants, logging, exceptions, cache dirs, .gitignore, docs/AGENT_STATE.md. No DB/data/BMA/API implementation.

Run 2 — Database

SQLAlchemy, 9 ORM tables, Alembic, DB init/seed, exactly 10 locations + 2 models, DB tests. No adapters/BMA/API/frontend.

Run 3 — Data Sources + Verification

Herbie base/cache, AIFS, GFS, IMDLIB. Verify actual installed-Herbie identifiers, live availability, variables/steps, precipitation semantics, IMDLIB resolutions, rainfall window, and exact tmax/tmin observation-day semantics before Run 4. Record findings in AGENT_STATE.md.

Run 4 — Meteorology

Units, temporal, spatial, precipitation, extremes using Run 3's verified semantics. No BMA/API/frontend.

Run 5 — BMA Core

Pure mathematical distributions, temperature Gaussian mixture, non-negative precipitation hurdle-Gamma, validator, predictor, deterministic quantiles, unit tests. No I/O/DB.

Run 6 — BMA Trainer

Trainer, optimizer validation, adaptive hierarchy, fallback, metrics, exact 2025-02-25 to 2025-09-30 fit / 2025-10-01 to 2025-12-31 test split, leakage protection, tests.

Run 7 — Training Service + CLI

Training orchestration, persistence of training runs/parameters/metrics, train_bma.py, source-validation CLI, coverage accounting, mocked training E2E.

Run 8 — Forecast Service + API

Forecast/verification services, FastAPI app, schemas, all required endpoints, whitelist enforcement, DB-backed probabilistic output. No frontend changes.

Run 9 — Testing + Hardening

Unit/integration/E2E, source validation, fresh migration/seed, API startup/health/docs checks. Fix correctness defects only; no new scope.

Run 10 — Deployment + Docs + Final Audit

Docker, .env.example, backend/BMA_TRAINING_2025.md, full validation, PRD/AGENTS audit, zero frontend changes, final Git cleanliness.

Each run must update AGENT_STATE.md, commit, and stop at its boundary.