"""Fused probabilistic forecast output."""

from __future__ import annotations

from datetime import datetime

from sqlalchemy import BigInteger, DateTime, Enum as SqlEnum, ForeignKey, Float, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, LeadBucket, ResultStatus, Season, Variable, enum_values, utc_now


class ProbabilisticForecast(Base):
    __tablename__ = "probabilistic_forecasts"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    forecast_run_id: Mapped[int] = mapped_column(BIGINT, ForeignKey("forecast_runs.id"), nullable=False, index=True)
    location_id: Mapped[str] = mapped_column(ForeignKey("locations.id"), nullable=False, index=True)
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    reference_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    valid_time: Mapped[datetime] = mapped_column(DateTime, nullable=False)
    lead_hours: Mapped[float] = mapped_column(Float, nullable=False)
    lead_bucket: Mapped[LeadBucket] = mapped_column(SqlEnum(LeadBucket, values_callable=enum_values), nullable=False)
    season: Mapped[Season] = mapped_column(SqlEnum(Season, values_callable=enum_values), nullable=False)
    distribution_type: Mapped[str] = mapped_column(String(50), nullable=False)
    mean_val: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    median_val: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p10: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p25: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p50: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p75: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    p90: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    prob_gt_0: Mapped[float | None] = mapped_column(Numeric(8, 6))
    prob_gt_1mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    prob_gt_10mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    prob_gt_25mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    prob_gt_50mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    prob_gt_100mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    aifs_input: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    gfs_input: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    w_aifs: Mapped[float] = mapped_column(Numeric(8, 6), nullable=False)
    w_gfs: Mapped[float] = mapped_column(Numeric(8, 6), nullable=False)
    parameter_version_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("bma_parameters.id"))
    fallback_level: Mapped[int] = mapped_column(Integer, nullable=False)
    status: Mapped[ResultStatus] = mapped_column(SqlEnum(ResultStatus, values_callable=enum_values), nullable=False)
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=utc_now)