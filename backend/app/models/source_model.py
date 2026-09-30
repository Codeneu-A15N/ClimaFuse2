"""Forecast source model metadata."""

from __future__ import annotations

from sqlalchemy import Boolean, String
from sqlalchemy.orm import Mapped, mapped_column

from backend.app.db.base import Base


class SourceModel(Base):
    __tablename__ = "source_models"

    id: Mapped[int] = mapped_column(primary_key=True, autoincrement=True)
    canonical_id: Mapped[str] = mapped_column(String(20), nullable=False, unique=True)
    herbie_model: Mapped[str] = mapped_column(String(30), nullable=False)
    herbie_product: Mapped[str] = mapped_column(String(50), nullable=False)
    display_name: Mapped[str] = mapped_column(String(100), nullable=False)
    provider: Mapped[str] = mapped_column(String(50), nullable=False)
    is_active: Mapped[bool] = mapped_column(Boolean, nullable=False, default=True)