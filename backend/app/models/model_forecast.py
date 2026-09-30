"""Deterministic model forecast values."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import BigInteger, DateTime, Enum as SqlEnum, ForeignKey, Float, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, Variable, enum_values


class ModelForecast(Base):
    __tablename__ = "model_forecasts"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    forecast_run_id: Mapped[int] = mapped_column(BIGINT, ForeignKey("forecast_runs.id"), nullable=False, index=True)
    source_model_id: Mapped[int] = mapped_column(ForeignKey("source_models.id"), nullable=False, index=True)
    location_id: Mapped[str] = mapped_column(ForeignKey("locations.id"), nullable=False, index=True)
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    reference_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    lead_hours: Mapped[float] = mapped_column(Float, nullable=False)
    value: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    unit: Mapped[str] = mapped_column(String(20), nullable=False)
    quality_flag: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    source_file_ref: Mapped[str | None] = mapped_column(String(500))