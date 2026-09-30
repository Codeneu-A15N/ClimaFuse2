"""Versioned BMA calibration parameters."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import BigInteger, Boolean, DateTime, Enum as SqlEnum, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, LeadBucket, Season, Variable, enum_values, utc_now


class BmaParameter(Base):
    __tablename__ = "bma_parameters"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    version: Mapped[str] = mapped_column(String(50), unique=True, nullable=False)
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    location_id: Mapped[str | None] = mapped_column(ForeignKey("locations.id"))
    region: Mapped[str | None] = mapped_column(String(50))
    season: Mapped[Season | None] = mapped_column(SqlEnum(Season, values_callable=enum_values))
    lead_bucket: Mapped[LeadBucket | None] = mapped_column(SqlEnum(LeadBucket, values_callable=enum_values))
    fallback_level: Mapped[int] = mapped_column(Integer, nullable=False)
    w_aifs: Mapped[float] = mapped_column(Numeric(8, 6), nullable=False)
    w_gfs: Mapped[float] = mapped_column(Numeric(8, 6), nullable=False)
    bias_aifs: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    bias_gfs: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    sigma_aifs: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    sigma_gfs: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p_zero_aifs: Mapped[float | None] = mapped_column(Numeric(8, 6))
    p_zero_gfs: Mapped[float | None] = mapped_column(Numeric(8, 6))
    shape_aifs: Mapped[float | None] = mapped_column(Numeric(10, 6))
    scale_aifs: Mapped[float | None] = mapped_column(Numeric(10, 6))
    shape_gfs: Mapped[float | None] = mapped_column(Numeric(10, 6))
    scale_gfs: Mapped[float | None] = mapped_column(Numeric(10, 6))
    n_samples: Mapped[int] = mapped_column(Integer, nullable=False)
    optimizer_success: Mapped[bool] = mapped_column(Boolean, nullable=False)
    optimizer_message: Mapped[str | None] = mapped_column(String(200))
    training_run_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("training_runs.id"))
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=utc_now)