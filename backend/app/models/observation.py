"""IMDLIB observation values."""

from __future__ import annotations

from datetime import date

from sqlalchemy import BigInteger, Date, Enum as SqlEnum, ForeignKey, Integer, Numeric, String, UniqueConstraint
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import BIGINT, Base, Variable, enum_values


class Observation(Base):
    __tablename__ = "observations"
    __table_args__ = (UniqueConstraint("location_id", "variable", "obs_date", name="uq_observation_day"),)

    id: Mapped[int] = mapped_column(BIGINT, primary_key=True, autoincrement=True)
    location_id: Mapped[str] = mapped_column(ForeignKey("locations.id"), nullable=False, index=True)
    variable: Mapped[Variable] = mapped_column(SqlEnum(Variable, values_callable=enum_values), nullable=False)
    obs_date: Mapped[date] = mapped_column(Date, nullable=False)
    value: Mapped[float] = mapped_column(Numeric(10, 4), nullable=False)
    unit: Mapped[str] = mapped_column(String(20), nullable=False)
    source_resolution: Mapped[float] = mapped_column(Numeric(5, 3), nullable=False)
    imd_file_ref: Mapped[str | None] = mapped_column(String(500))
    quality_flag: Mapped[int] = mapped_column(Integer, nullable=False, default=0)