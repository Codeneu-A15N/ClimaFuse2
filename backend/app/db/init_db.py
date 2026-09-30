"""Create database tables and seed immutable operational reference data."""

from __future__ import annotations

from sqlalchemy import Engine, select
from sqlalchemy.orm import Session

from backend.app.core.constants import OPERATIONAL_LOCATIONS, SOURCE_MODELS
from backend.app.db.base import Base
from backend.app.db.session import SessionLocal, engine as default_engine
from backend.app.models.location import Location
from backend.app.models.source_model import SourceModel


def seed_reference_data(db: Session) -> None:
    """Insert or refresh only the ten locations and two production models."""
    existing_locations = {
        location.id: location
        for location in db.scalars(select(Location)).all()
    }
    for location_data in OPERATIONAL_LOCATIONS:
        location = existing_locations.get(location_data["id"])
        if location is None:
            db.add(
                Location(
                    id=location_data["id"],
                    name=location_data["name"],
                    state=location_data["state"],
                    latitude=location_data["lat"],
                    longitude=location_data["lon"],
                    aws_id=location_data["aws_id"],
                )
            )
        else:
            location.name = location_data["name"]
            location.state = location_data["state"]
            location.latitude = location_data["lat"]
            location.longitude = location_data["lon"]
            location.aws_id = location_data["aws_id"]
            location.is_active = True

    existing_models = {
        model.canonical_id: model
        for model in db.scalars(select(SourceModel)).all()
    }
    for model_data in SOURCE_MODELS:
        model = existing_models.get(model_data["canonical_id"])
        if model is None:
            db.add(
                SourceModel(
                    canonical_id=model_data["canonical_id"],
                    herbie_model=model_data["herbie_model"],
                    herbie_product=model_data["herbie_product"],
                    display_name=model_data["display_name"],
                    provider=model_data["provider"],
                )
            )
        else:
            model.herbie_model = model_data["herbie_model"]
            model.herbie_product = model_data["herbie_product"]
            model.display_name = model_data["display_name"]
            model.provider = model_data["provider"]
            model.is_active = True
    db.commit()


def initialize_database(bind: Engine | None = None) -> None:
    """Create all tables and seed reference rows for a configured database."""
    database_engine = bind or default_engine
    Base.metadata.create_all(database_engine)
    with SessionLocal(bind=database_engine) as db:
        seed_reference_data(db)


if __name__ == "__main__":
    initialize_database()