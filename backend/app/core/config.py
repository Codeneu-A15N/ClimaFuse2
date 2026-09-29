"""
ClimaFuse — Application Configuration.

Loads environment variables via pydantic-settings.
All operational settings have defaults for local development
and can be overridden via environment variables or a .env file.
"""

from __future__ import annotations

from pathlib import Path
from typing import List, Optional
from pydantic import Field, field_validator
from pydantic_settings import BaseSettings, SettingsConfigDict


class Settings(BaseSettings):
    """Production and development settings for ClimaFuse backend."""

    model_config = SettingsConfigDict(
        env_file=(".env", "backend/.env", "../.env"),
        env_file_encoding="utf-8",
        extra="ignore",
        case_sensitive=False,
    )

    # Project metadata
    PROJECT_NAME: str = "ClimaFuse BMA Backend"
    VERSION: str = "0.1.0"
    API_V1_STR: str = "/api/v1"
    ENVIRONMENT: str = Field(default="development", description="development, test, or production")
    DEBUG: bool = False
    LOG_LEVEL: str = "INFO"

    # CORS origins
    CORS_ORIGINS: List[str] = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
    ]

    # Database
    MYSQL_HOST: str = "localhost"
    MYSQL_PORT: int = 3306
    MYSQL_USER: str = "climafuse"
    MYSQL_PASSWORD: str = "climafuse_pass"
    MYSQL_DATABASE: str = "climafuse"
    DATABASE_URL: Optional[str] = None

    @property
    def sync_database_url(self) -> str:
        """Return the synchronous SQLAlchemy MySQL connection string."""
        if self.DATABASE_URL:
            if self.DATABASE_URL.startswith("mysql://"):
                return self.DATABASE_URL.replace("mysql://", "mysql+pymysql://", 1)
            return self.DATABASE_URL
        return (
            f"mysql+pymysql://{self.MYSQL_USER}:{self.MYSQL_PASSWORD}"
            f"@{self.MYSQL_HOST}:{self.MYSQL_PORT}/{self.MYSQL_DATABASE}"
        )

    # Cache directories
    BASE_DIR: Path = Path(__file__).resolve().parent.parent.parent
    CACHE_DIR: Path = Field(
        default_factory=lambda: Path(__file__).resolve().parent.parent.parent / "cache"
    )
    AIFS_CACHE_DIR: Optional[Path] = None
    GFS_CACHE_DIR: Optional[Path] = None
    IMD_CACHE_DIR: Optional[Path] = None

    @field_validator("AIFS_CACHE_DIR", mode="after")
    @classmethod
    def set_aifs_cache(cls, v: Optional[Path], info) -> Path:
        if v is not None:
            return v
        cache_dir = info.data.get("CACHE_DIR") or (
            Path(__file__).resolve().parent.parent.parent / "cache"
        )
        return cache_dir / "aifs"

    @field_validator("GFS_CACHE_DIR", mode="after")
    @classmethod
    def set_gfs_cache(cls, v: Optional[Path], info) -> Path:
        if v is not None:
            return v
        cache_dir = info.data.get("CACHE_DIR") or (
            Path(__file__).resolve().parent.parent.parent / "cache"
        )
        return cache_dir / "gfs"

    @field_validator("IMD_CACHE_DIR", mode="after")
    @classmethod
    def set_imd_cache(cls, v: Optional[Path], info) -> Path:
        if v is not None:
            return v
        cache_dir = info.data.get("CACHE_DIR") or (
            Path(__file__).resolve().parent.parent.parent / "cache"
        )
        return cache_dir / "imd"

    # Data Source Products
    AIFS_MODEL: str = "aifs"
    AIFS_PRODUCT: str = "oper"
    GFS_MODEL: str = "gfs"
    GFS_PRODUCT: str = "pgrb2.0p25"

    # BMA Optimization & Training Period (2025)
    BMA_TRAIN_START: str = "2025-02-25"
    BMA_TRAIN_END: str = "2025-09-30"
    BMA_TEST_START: str = "2025-10-01"
    BMA_TEST_END: str = "2025-12-31"

    # Minimum sample counts per fallback level
    MIN_SAMPLES_L1: int = 300
    MIN_SAMPLES_L2: int = 300
    MIN_SAMPLES_L3: int = 300
    MIN_SAMPLES_L4: int = 150
    MIN_SAMPLES_L5: int = 100


settings = Settings()
