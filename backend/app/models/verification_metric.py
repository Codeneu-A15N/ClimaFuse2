"""Forecast verification metrics."""

from __future__ import annotations

from datetime import date, datetime

from sqlalchemy import BigInteger, Date, DateTime, Enum as SqlEnum, ForeignKey, Integer, Numeric, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, ForecastModel, LeadBucket, Season, Variable, enum_values, utc_now


class VerificationMetric(Base):
    __tablename__ = "verification_metrics"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    training_run_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("training_runs.id"))
    forecast_run_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("forecast_runs.id"))
    location_id: Mapped[str | None] = mapped_column(ForeignKey("locations.id"))
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    model: Mapped[ForecastModel] = mapped_column(SqlEnum(ForecastModel, values_callable=enum_values), nullable=False)
    lead_bucket: Mapped[LeadBucket | None] = mapped_column(SqlEnum(LeadBucket, values_callable=enum_values))
    season: Mapped[Season | None] = mapped_column(SqlEnum(Season, values_callable=enum_values))
    eval_start_date: Mapped[date] = mapped_column(Date, nullable=False)
    eval_end_date: Mapped[date] = mapped_column(Date, nullable=False)
    n_samples: Mapped[int] = mapped_column(Integer, nullable=False)
    rmse: Mapped[float | None] = mapped_column(Numeric(10, 4))
    mae: Mapped[float | None] = mapped_column(Numeric(10, 4))
    bias: Mapped[float | None] = mapped_column(Numeric(10, 4))
    crps: Mapped[float | None] = mapped_column(Numeric(10, 4))
    reliability: Mapped[float | None] = mapped_column(Numeric(8, 4))
    brier_1mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    brier_10mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    brier_25mm: Mapped[float | None] = mapped_column(Numeric(8, 6))
    parameter_version: Mapped[str | None] = mapped_column(String(50))
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=utc_now)