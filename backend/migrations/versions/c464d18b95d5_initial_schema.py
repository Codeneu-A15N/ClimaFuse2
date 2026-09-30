"""initial schema

Revision ID: c464d18b95d5
Revises:
Create Date: 2026-09-30 05:18:40.257139
"""
from typing import Sequence, Union

from alembic import op

from backend.app.db.base import Base
from backend.app import models  # noqa: F401


revision: str = 'c464d18b95d5'
down_revision: Union[str, None] = None
branch_labels: Union[str, Sequence[str], None] = None
depends_on: Union[str, Sequence[str], None] = None




def upgrade() -> None:
    """Create all nine ORM tables, including their foreign keys."""
    Base.metadata.create_all(op.get_bind())


def downgrade() -> None:
    """Drop all nine ORM tables."""
    Base.metadata.drop_all(op.get_bind())