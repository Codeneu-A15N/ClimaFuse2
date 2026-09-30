"""Shared SQLAlchemy metadata and database enum definitions."""

from __future__ import annotations

from datetime import datetime, timezone
from enum import Enum

from sqlalchemy import BigInteger, Integer
from sqlalchemy.orm import DeclarativeBase


class Base(DeclarativeBase):
    """Base class for all ClimaFuse ORM models."""


BIGINT = BigInteger().with_variant(Integer(), "sqlite")


class ForecastRunStatus(str, Enum):
    PENDING = "pending"
    RUNNING = "running"
    SUCCESS = "success"
    PARTIAL = "partial"
    FALLBACK = "fallback"
    FAILED = "failed"


class TrainingRunStatus(str, Enum):
    RUNNING = "running"
    SUCCESS = "success"
    FAILED = "failed"
    PARTIAL = "partial"


class ResultStatus(str, Enum):
    SUCCESS = "success"
    PARTIAL = "partial"
    FALLBACK = "fallback"
    FAILED = "failed"


class Variable(str, Enum):
    TMAX = "tmax"
    TMIN = "tmin"
    PRECIPITATION = "precipitation"


class Season(str, Enum):
    DJF = "DJF"
    MAM = "MAM"
    JJAS = "JJAS"
    ON = "ON"


class LeadBucket(str, Enum):
    ZERO_TO_SIX_HOURS = "0_6h"
    SIX_TO_TWENTY_FOUR_HOURS = "6_24h"
    ONE_TO_THREE_DAYS = "1_3d"
    THREE_TO_SEVEN_DAYS = "3_7d"
    SEVEN_TO_FOURTEEN_DAYS = "7_14d"


class ForecastModel(str, Enum):
    AIFS = "ecmwf_aifs"
    GFS = "noaa_gfs"
    BMA = "bma"


def enum_values(enum_type: type[Enum]) -> list[str]:
    """Tell SQLAlchemy to persist each enum member's canonical value."""
    return [member.value for member in enum_type]


def utc_now() -> datetime:
    """Return a timezone-normalized UTC value for MySQL DATETIME columns."""
    return datetime.now(timezone.utc).replace(tzinfo=None)