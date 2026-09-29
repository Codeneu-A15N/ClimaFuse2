"""
Unit tests for ClimaFuse backend foundation.

Tests configuration, constants, location whitelist, models,
periods, seasons, exceptions, and logging setup.
"""

from __future__ import annotations

import pytest

from backend.app.core.config import Settings
from backend.app.core.constants import (
    AIFS_OPERATIONAL_START_DATE,
    BMA_TEST_END_DATE,
    BMA_TEST_START_DATE,
    BMA_TRAIN_END_DATE,
    BMA_TRAIN_START_DATE,
    IMD_MISSING_VALUE,
    IMD_RAIN_WINDOW_END_UTC,
    IMD_RAIN_WINDOW_START_UTC,
    IMD_RESOLUTIONS,
    LEAD_BUCKETS,
    LOCATION_IDS,
    LOCATION_REGIONS,
    MIN_SAMPLES,
    MODEL_IDS,
    OPERATIONAL_LOCATIONS,
    PRECIP_THRESHOLDS_MM,
    SEASONS,
    SOURCE_MODELS,
    VARIABLE_BOUNDS,
    VARIABLE_UNITS,
    VARIABLES,
    get_lead_bucket,
    get_season,
)
from backend.app.core.exceptions import (
    BMAPredictionError,
    BMATrainingError,
    ClimaFuseException,
    ConfigurationError,
    DataAlignmentError,
    DataRetrievalError,
    DegradedForecastError,
    LocationNotFoundError,
    ModelSourceError,
)
from backend.app.core.logging import get_logger, setup_logging


class TestSettings:
    """Test application settings and environment handling."""

    def test_default_settings(self, app_settings: Settings):
        assert app_settings.PROJECT_NAME == "ClimaFuse BMA Backend"
        assert app_settings.VERSION == "0.1.0"
        assert app_settings.API_V1_STR == "/api/v1"
        assert app_settings.ENVIRONMENT == "development"
        assert not app_settings.DEBUG
        assert len(app_settings.CORS_ORIGINS) >= 2

    def test_database_url_generation(self, app_settings: Settings):
        url = app_settings.sync_database_url
        assert "mysql+pymysql://" in url
        assert "climafuse" in url

    def test_cache_directories(self, app_settings: Settings):
        assert app_settings.CACHE_DIR is not None
        assert app_settings.AIFS_CACHE_DIR.name == "aifs"
        assert app_settings.GFS_CACHE_DIR.name == "gfs"
        assert app_settings.IMD_CACHE_DIR.name == "imd"


class TestConstants:
    """Test operational scientific constants."""

    def test_operational_locations_count_and_whitelist(self):
        assert len(OPERATIONAL_LOCATIONS) == 10
        expected_ids = {
            "delhi",
            "mumbai",
            "bengaluru",
            "kolkata",
            "chennai",
            "ahmedabad",
            "hyderabad",
            "pune",
            "jaipur",
            "lucknow",
        }
        assert LOCATION_IDS == expected_ids
        for loc in OPERATIONAL_LOCATIONS:
            assert loc["id"] in expected_ids
            assert -90.0 <= loc["lat"] <= 90.0
            assert -180.0 <= loc["lon"] <= 180.0
            assert loc["name"]
            assert loc["state"]

    def test_all_locations_have_region_mapping(self):
        for loc_id in LOCATION_IDS:
            assert loc_id in LOCATION_REGIONS
            assert isinstance(LOCATION_REGIONS[loc_id], str)

    def test_strictly_two_production_models(self):
        assert len(SOURCE_MODELS) == 2
        assert MODEL_IDS == {"ecmwf_aifs", "noaa_gfs"}
        assert "ecmwf_ifs" not in MODEL_IDS
        assert "ncmrwf" not in MODEL_IDS
        assert "graphcast" not in MODEL_IDS

    def test_variables_and_units(self):
        assert set(VARIABLES) == {"tmax", "tmin", "precipitation"}
        assert VARIABLE_UNITS["tmax"] == "degC"
        assert VARIABLE_UNITS["tmin"] == "degC"
        assert VARIABLE_UNITS["precipitation"] == "mm"

        for var in VARIABLES:
            lo, hi = VARIABLE_BOUNDS[var]
            assert lo < hi

    def test_imd_resolutions(self):
        assert IMD_RESOLUTIONS["rain"] == 0.25
        assert IMD_RESOLUTIONS["tmax"] == 1.0
        assert IMD_RESOLUTIONS["tmin"] == 1.0
        assert IMD_MISSING_VALUE == -999.0

    def test_imd_rain_observation_window_utc(self):
        assert IMD_RAIN_WINDOW_START_UTC == "03:00"
        assert IMD_RAIN_WINDOW_END_UTC == "03:00"

    def test_aifs_2025_period_rules(self):
        assert BMA_TRAIN_START_DATE == "2025-02-25"
        assert BMA_TRAIN_END_DATE == "2025-09-30"
        assert BMA_TEST_START_DATE == "2025-10-01"
        assert BMA_TEST_END_DATE == "2025-12-31"
        assert AIFS_OPERATIONAL_START_DATE == "2025-02-25"

    def test_seasons_mapping(self):
        months_covered = []
        for season_months in SEASONS.values():
            months_covered.extend(season_months)
        assert sorted(months_covered) == list(range(1, 13))

        assert get_season(1) == "DJF"
        assert get_season(4) == "MAM"
        assert get_season(7) == "JJAS"
        assert get_season(10) == "ON"
        with pytest.raises(ValueError):
            get_season(13)

    def test_lead_buckets(self):
        assert get_lead_bucket(3.0) == "0_6h"
        assert get_lead_bucket(12.0) == "6_24h"
        assert get_lead_bucket(48.0) == "1_3d"
        assert get_lead_bucket(120.0) == "3_7d"
        assert get_lead_bucket(240.0) == "7_14d"
        assert get_lead_bucket(360.0) == "7_14d"

    def test_min_samples_ladder(self):
        assert MIN_SAMPLES[1] == 300
        assert MIN_SAMPLES[2] == 300
        assert MIN_SAMPLES[3] == 300
        assert MIN_SAMPLES[4] == 150
        assert MIN_SAMPLES[5] == 100

    def test_precip_thresholds(self):
        assert PRECIP_THRESHOLDS_MM == [0.0, 1.0, 10.0, 25.0, 50.0, 100.0]


class TestExceptions:
    """Test custom exception hierarchy."""

    def test_exceptions_inheritance(self):
        exc_classes = [
            ConfigurationError,
            LocationNotFoundError,
            ModelSourceError,
            DataRetrievalError,
            DataAlignmentError,
            BMATrainingError,
            BMAPredictionError,
            DegradedForecastError,
        ]
        for cls in exc_classes:
            assert issubclass(cls, ClimaFuseException)
            instance = cls("test error", details={"key": "val"})
            assert "test error" in str(instance)
            assert instance.details["key"] == "val"


class TestLogging:
    """Test logging setup."""

    def test_setup_logging_and_logger(self):
        setup_logging(level="DEBUG")
        logger = get_logger("climafuse.test")
        assert logger.name == "climafuse.test"
        # Reset back to INFO
        setup_logging(level="INFO")
