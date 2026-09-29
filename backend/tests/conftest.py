"""
ClimaFuse — Pytest configuration and shared fixtures.
"""

from __future__ import annotations

import pytest

from backend.app.core.config import Settings, settings


@pytest.fixture
def app_settings() -> Settings:
    """Fixture returning application settings."""
    return settings
