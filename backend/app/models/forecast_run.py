"""Forecast execution metadata."""

from __future__ import annotations

from datetime import datetime
from uuid import uuid4

from sqlalchemy import BigInteger, Boolean, DateTime, Enum as SqlEnum, ForeignKey, Integer, JSON, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, ForecastRunStatus, enum_values, utc_now


class ForecastRun(Base):
    __tablename__ = "forecast_runs"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    run_uuid: Mapped[str] = mapped_column(String(36), unique=True, nullable=False, default=lambda: str(uuid4()))
    reference_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_time_start: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_time_end: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    status: Mapped[ForecastRunStatus] = mapped_column(SqlEnum(ForecastRunStatus, values_callable=enum_values), nullable=False, default=ForecastRunStatus.PENDING)
    aifs_available: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    gfs_available: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    locations_requested: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    locations_success: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    locations_failed: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    error_summary: Mapped[str | None] = mapped_column(Text)
    provenance: Mapped[dict | None] = mapped_column(JSON)
    parameter_version_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("bma_parameters.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=utc_now)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime)