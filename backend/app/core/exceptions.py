"""
ClimaFuse — Custom exception hierarchy.

Centralized domain exceptions for data retrieval, alignment,
BMA fitting/prediction, and API operational errors.
"""

from __future__ import annotations

from typing import Any, Optional


class ClimaFuseException(Exception):
    """Base exception for all ClimaFuse domain errors."""

    def __init__(self, message: str, details: Optional[dict[str, Any]] = None) -> None:
        super().__init__(message)
        self.message = message
        self.details = details or {}

    def __str__(self) -> str:
        if self.details:
            return f"{self.message} (details: {self.details})"
        return self.message


class ConfigurationError(ClimaFuseException):
    """Raised when environment or runtime configuration is invalid."""


class LocationNotFoundError(ClimaFuseException):
    """Raised when an operation requests a location outside the 10 PRD whitelist stations."""


class ModelSourceError(ClimaFuseException):
    """Raised when an unsupported model is requested or a model source is unavailable."""


class DataRetrievalError(ClimaFuseException):
    """Raised when fetching meteorological data from Herbie or IMDLIB fails."""


class DataAlignmentError(ClimaFuseException):
    """Raised when forecast and observation timestamps, steps, or grids cannot be aligned."""


class BMATrainingError(ClimaFuseException):
    """Raised when BMA parameter optimization fails, violates constraints, or encounters data insufficiency."""


class BMAPredictionError(ClimaFuseException):
    """Raised when probabilistic prediction cannot be computed from given parameters and forecasts."""


class DegradedForecastError(ClimaFuseException):
    """Raised when a forecast run operates in a degraded mode (e.g. single-model fallback)."""
