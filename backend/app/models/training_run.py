"""BMA training execution metadata."""

from __future__ import annotations

from datetime import date, datetime
from uuid import uuid4

from sqlalchemy import BigInteger, Date, DateTime, Enum as SqlEnum, ForeignKey, Integer, String, Text
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, TrainingRunStatus, Variable, enum_values, utc_now


class TrainingRun(Base):
    __tablename__ = "training_runs"

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    run_uuid: Mapped[str] = mapped_column(String(36), unique=True, nullable=False, default=lambda: str(uuid4()))
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    train_start_date: Mapped[date] = mapped_column(Date, nullable=False)
    train_end_date: Mapped[date] = mapped_column(Date, nullable=False)
    test_start_date: Mapped[date] = mapped_column(Date, nullable=False)
    test_end_date: Mapped[date] = mapped_column(Date, nullable=False)
    requested_records: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    aifs_retrieved: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    gfs_retrieved: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    imd_retrieved: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    paired_records: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    rejected_records: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    missing_records: Mapped[int] = mapped_column(Integer, nullable=False, default=0)
    status: Mapped[TrainingRunStatus] = mapped_column(SqlEnum(TrainingRunStatus, values_callable=enum_values), nullable=False, default=TrainingRunStatus.RUNNING)
    error_summary: Mapped[str | None] = mapped_column(Text)
    parameter_version_id: Mapped[int | None] = mapped_column(BIGINT, ForeignKey("bma_parameters.id"))
    created_at: Mapped[datetime] = mapped_column(DateTime, nullable=False, default=utc_now)
    completed_at: Mapped[datetime | None] = mapped_column(DateTime)