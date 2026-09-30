"""Database persistence tests using a fresh SQLite database."""

from __future__ import annotations

from datetime import date, datetime
from decimal import Decimal

import pytest
from sqlalchemy import create_engine, select, text
from sqlalchemy.exc import IntegrityError
from sqlalchemy.orm import Session

from backend.app.core.constants import LOCATION_IDS, MODEL_IDS
from backend.app.db.base import Base, ForecastRunStatus, Variable
from backend.app.db.init_db import seed_reference_data
from backend.app.models.forecast_run import ForecastRun
from backend.app.models.location import Location
from backend.app.models.model_forecast import ModelForecast
from backend.app.models.observation import Observation
from backend.app.models.source_model import SourceModel


@pytest.fixture
def db() -> Session:
    engine = create_engine("sqlite:///:memory:")
    Base.metadata.create_all(engine)
    with Session(engine) as session:
        yield session


def test_seed_contains_exactly_operational_reference_data(db: Session):
    seed_reference_data(db)
    seed_reference_data(db)

    locations = db.scalars(select(Location)).all()
    models = db.scalars(select(SourceModel)).all()
    assert {location.id for location in locations} == LOCATION_IDS
    assert {model.canonical_id for model in models} == MODEL_IDS
    assert len(locations) == 10
    assert len(models) == 2


def test_enum_values_persist_as_canonical_contract_values(db: Session):
    seed_reference_data(db)
    location = db.scalar(select(Location).where(Location.id == "delhi"))
    source_model = db.scalar(select(SourceModel).where(SourceModel.canonical_id == "ecmwf_aifs"))
    forecast_run = ForecastRun(
        reference_time=datetime(2025, 2, 25, 0),
        valid_time_start=datetime(2025, 2, 25, 6),
        valid_time_end=datetime(2025, 2, 26, 6),
        status=ForecastRunStatus.SUCCESS,
        locations_requested=1,
        locations_success=1,
    )
    db.add(forecast_run)
    db.flush()
    db.add(
        ModelForecast(
            forecast_run_id=forecast_run.id,
            source_model_id=source_model.id,
            location_id=location.id,
            variable=Variable.TMAX,
            reference_time=forecast_run.reference_time,
            valid_time=datetime(2025, 2, 25, 6),
            lead_hours=6,
            value=28.5,
            unit="degC",
        )
    )
    db.commit()

    raw_values = db.execute(text("SELECT status FROM forecast_runs")).scalars().all()
    raw_variable = db.execute(text("SELECT variable FROM model_forecasts")).scalar_one()
    assert raw_values == ["success"]
    assert raw_variable == "tmax"


def test_observation_unique_day_and_forecast_links_persist(db: Session):
    seed_reference_data(db)
    db.add(
        Observation(
            location_id="mumbai",
            variable=Variable.PRECIPITATION,
            obs_date=date(2025, 2, 25),
            value=12.4,
            unit="mm",
            source_resolution=0.25,
            imd_file_ref="cache/imd/rain.nc",
        )
    )
    db.commit()
    with pytest.raises(IntegrityError):
        db.add(
            Observation(
                location_id="mumbai",
                variable=Variable.PRECIPITATION,
                obs_date=date(2025, 2, 25),
                value=13.0,
                unit="mm",
                source_resolution=0.25,
            )
        )
        db.commit()
    db.rollback()
    assert db.scalar(select(Observation).where(Observation.location_id == "mumbai")).value == Decimal("12.4000")