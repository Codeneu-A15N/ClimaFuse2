"""
ClimaFuse — Operational constants.

All hardcoded scientific constants live here and here alone.
No production forecast values are stored here.
"""

from __future__ import annotations

from typing import Final

# ---------------------------------------------------------------------------
# Operational locations (exactly 10 fixed stations per PRD)
# ---------------------------------------------------------------------------

OPERATIONAL_LOCATIONS: Final[list[dict]] = [
    {"id": "delhi",     "name": "New Delhi",  "state": "National Capital Territory (NCR)",       "lat": 28.6139, "lon": 77.2090, "aws_id": "AWS: 42182"},
    {"id": "mumbai",    "name": "Mumbai",     "state": "Maharashtra Coastal Plain",              "lat": 19.0760, "lon": 72.8777, "aws_id": "AWS: 43003"},
    {"id": "bengaluru", "name": "Bengaluru",  "state": "Karnataka Deccan Plateau",               "lat": 12.9716, "lon": 77.5946, "aws_id": "AWS: 43295"},
    {"id": "kolkata",   "name": "Kolkata",    "state": "West Bengal Gangetic Delta",             "lat": 22.5726, "lon": 88.3639, "aws_id": "AWS: 42807"},
    {"id": "chennai",   "name": "Chennai",    "state": "Coromandel Coast (Tamil Nadu)",          "lat": 13.0827, "lon": 80.2707, "aws_id": "AWS: 43279"},
    {"id": "ahmedabad", "name": "Ahmedabad",  "state": "Gujarat Semi-Arid Basin",                "lat": 23.0225, "lon": 72.5714, "aws_id": "AWS: 42647"},
    {"id": "hyderabad", "name": "Hyderabad",  "state": "Telangana Central Plateau",              "lat": 17.3850, "lon": 78.4867, "aws_id": "AWS: 43128"},
    {"id": "pune",      "name": "Pune",       "state": "Western Maharashtra Foothills",          "lat": 18.5204, "lon": 73.8567, "aws_id": "AWS: 43063"},
    {"id": "jaipur",    "name": "Jaipur",     "state": "Rajasthan Semi-Arid Zone",               "lat": 26.9124, "lon": 75.7873, "aws_id": "AWS: 42348"},
    {"id": "lucknow",   "name": "Lucknow",    "state": "Central Uttar Pradesh (Gangetic Plain)", "lat": 26.8467, "lon": 80.9462, "aws_id": "AWS: 42369"},
]

LOCATION_IDS: Final[set[str]] = {loc["id"] for loc in OPERATIONAL_LOCATIONS}

# Region groupings for BMA parameter stratification
LOCATION_REGIONS: Final[dict[str, str]] = {
    "delhi":     "gangetic",
    "lucknow":   "gangetic",
    "kolkata":   "eastern",
    "mumbai":    "western_coast",
    "pune":      "deccan",
    "ahmedabad": "arid_west",
    "jaipur":    "arid_west",
    "bengaluru": "peninsular",
    "hyderabad": "peninsular",
    "chennai":   "eastern_coast",
}

# ---------------------------------------------------------------------------
# Source model canonical identifiers (strictly 2 production models)
# ---------------------------------------------------------------------------

SOURCE_MODELS: Final[list[dict]] = [
    {
        "canonical_id":   "ecmwf_aifs",
        "display_name":   "ECMWF AIFS",
        "provider":       "ECMWF",
        "herbie_model":   "aifs",
        "herbie_product": "oper",
    },
    {
        "canonical_id":   "noaa_gfs",
        "display_name":   "NOAA GFS",
        "provider":       "NOAA",
        "herbie_model":   "gfs",
        "herbie_product": "pgrb2.0p25",
    },
]

MODEL_IDS: Final[set[str]] = {m["canonical_id"] for m in SOURCE_MODELS}

# ---------------------------------------------------------------------------
# Variables
# ---------------------------------------------------------------------------

VARIABLES: Final[tuple[str, ...]] = ("tmax", "tmin", "precipitation")

# Canonical units for each variable (internal representation)
VARIABLE_UNITS: Final[dict[str, str]] = {
    "tmax":          "degC",
    "tmin":          "degC",
    "precipitation": "mm",
}

# Physical plausibility bounds (for validation, not clipping)
VARIABLE_BOUNDS: Final[dict[str, tuple[float, float]]] = {
    "tmax":          (-20.0, 55.0),   # °C
    "tmin":          (-30.0, 45.0),   # °C
    "precipitation": (0.0,  1500.0),  # mm/day (upper bound for extreme events)
}

# ---------------------------------------------------------------------------
# IMD resolution by variable & observation window
# ---------------------------------------------------------------------------

IMD_RESOLUTIONS: Final[dict[str, float]] = {
    "rain":  0.25,   # degrees
    "tmax":  1.0,    # degrees (archive); 0.5 for recent real-time — resolved at runtime
    "tmin":  1.0,    # degrees (archive); 0.5 for recent real-time — resolved at runtime
}

# IMD missing value sentinel
IMD_MISSING_VALUE: Final[float] = -999.0

# IMD rainfall observation window (08:30 IST to 08:30 IST = 03:00 UTC to 03:00 UTC)
IMD_RAIN_WINDOW_START_UTC: Final[str] = "03:00"
IMD_RAIN_WINDOW_END_UTC: Final[str] = "03:00"

# ---------------------------------------------------------------------------
# AIFS & GFS Historical Data Periods (2025)
# ---------------------------------------------------------------------------

# Operational deterministic AIFS began on 2025-02-25.
# Pre-operational data before 2025-02-25 is strictly excluded from training.
BMA_TRAIN_START_DATE: Final[str] = "2025-02-25"
BMA_TRAIN_END_DATE: Final[str] = "2025-09-30"
BMA_TEST_START_DATE: Final[str] = "2025-10-01"
BMA_TEST_END_DATE: Final[str] = "2025-12-31"

AIFS_OPERATIONAL_START_DATE: Final[str] = "2025-02-25"

# ---------------------------------------------------------------------------
# BMA seasonal partitioning
# ---------------------------------------------------------------------------

SEASONS: Final[dict[str, list[int]]] = {
    "DJF":  [12, 1, 2],
    "MAM":  [3, 4, 5],
    "JJAS": [6, 7, 8, 9],
    "ON":   [10, 11],
}

def get_season(month: int) -> str:
    """Return the season code for a given month number (1-12)."""
    for season, months in SEASONS.items():
        if month in months:
            return season
    raise ValueError(f"Invalid month: {month}")

# ---------------------------------------------------------------------------
# BMA lead-time buckets (hours)
# ---------------------------------------------------------------------------

LEAD_BUCKETS: Final[dict[str, tuple[float, float]]] = {
    "0_6h":   (0.0,   6.0),
    "6_24h":  (6.0,   24.0),
    "1_3d":   (24.0,  72.0),
    "3_7d":   (72.0,  168.0),
    "7_14d":  (168.0, 336.0),
}

def get_lead_bucket(lead_hours: float) -> str:
    """Return the lead bucket string for a given lead time in hours."""
    for bucket, (lo, hi) in LEAD_BUCKETS.items():
        if lo <= lead_hours < hi:
            return bucket
    if lead_hours >= 336.0:
        return "7_14d"
    raise ValueError(f"Cannot classify lead_hours={lead_hours}")

# ---------------------------------------------------------------------------
# BMA minimum sample thresholds per fallback level
# ---------------------------------------------------------------------------

MIN_SAMPLES: Final[dict[int, int]] = {
    1: 300,  # Level 1: location + variable + season + lead_bucket
    2: 300,  # Level 2: region + variable + lead_bucket
    3: 300,  # Level 3: region + variable
    4: 150,  # Level 4: national + variable + season + lead_bucket
    5: 100,  # Level 5: national + variable
}

# ---------------------------------------------------------------------------
# Precipitation exceedance thresholds (mm)
# ---------------------------------------------------------------------------

PRECIP_THRESHOLDS_MM: Final[list[float]] = [0.0, 1.0, 10.0, 25.0, 50.0, 100.0]

# ---------------------------------------------------------------------------
# AIFS & GFS Forecast Step Schedules
# ---------------------------------------------------------------------------

AIFS_FORECAST_STEPS: Final[list[int]] = list(range(0, 361, 6))  # 0 to 360h, 6-hourly

# GFS forecast step schedule (hours)
# 0-120h: hourly; 123-384h: 3-hourly
GFS_FORECAST_STEPS_HOURLY: Final[list[int]] = list(range(0, 121, 1))
GFS_FORECAST_STEPS_3H: Final[list[int]] = list(range(123, 385, 3))
GFS_FORECAST_STEPS: Final[list[int]] = GFS_FORECAST_STEPS_HOURLY + GFS_FORECAST_STEPS_3H
