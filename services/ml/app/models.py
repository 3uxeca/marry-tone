from __future__ import annotations

from typing import Literal

from pydantic import AnyUrl, BaseModel, Field, PositiveFloat


class HealthResponse(BaseModel):
    status: Literal["ok"] = "ok"
    service: str = "marrytone-ml-sidecar"
    version: str = "0.1.0"
    model_version: str = "placeholder-v0"


class PersonalColorDiagnosisRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=64)
    image_uri: AnyUrl | None = None
    capture_source: Literal["camera", "gallery", "unknown"] = "unknown"
    skin_tone_note: str | None = Field(default=None, max_length=120)


class PersonalColorDiagnosisResponse(BaseModel):
    diagnosis_type: Literal["personal-color"] = "personal-color"
    season: Literal["spring", "summer", "autumn", "winter"]
    undertone: Literal["warm", "cool", "neutral"]
    recommended_colors: list[str]
    confidence: float = Field(ge=0.0, le=1.0)
    model_version: str = "placeholder-v0"
    low_confidence: "LowConfidenceMetadata"
    inference: "InferenceMetadata"


class BodyMeasurementsDiagnosisRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=64)
    height_cm: PositiveFloat
    weight_kg: PositiveFloat | None = None
    image_uri: AnyUrl | None = None


class BodyMeasurements(BaseModel):
    shoulder_width_cm: float = Field(gt=0)
    chest_cm: float = Field(gt=0)
    waist_cm: float = Field(gt=0)
    hip_cm: float = Field(gt=0)
    inseam_cm: float = Field(gt=0)


class BodyMeasurementsDiagnosisResponse(BaseModel):
    diagnosis_type: Literal["body-measurements"] = "body-measurements"
    silhouette_type: Literal["balanced", "upper-heavy", "lower-heavy", "rectangular"]
    measurements: BodyMeasurements
    confidence: float = Field(ge=0.0, le=1.0)
    model_version: str = "placeholder-v0"
    low_confidence: "LowConfidenceMetadata"
    inference: "InferenceMetadata"


class SkeletonTypeDiagnosisRequest(BaseModel):
    user_id: str = Field(min_length=1, max_length=64)
    image_uri: AnyUrl | None = None
    shoulder_slope_note: str | None = Field(default=None, max_length=120)


class SkeletonTypeDiagnosisResponse(BaseModel):
    diagnosis_type: Literal["skeleton-type"] = "skeleton-type"
    skeleton_type: Literal["straight", "wave", "natural"]
    style_tips: list[str]
    confidence: float = Field(ge=0.0, le=1.0)
    model_version: str = "placeholder-v0"
    low_confidence: "LowConfidenceMetadata"
    inference: "InferenceMetadata"


class LowConfidenceMetadata(BaseModel):
    policy_code: Literal["policy-c"] = "policy-c"
    threshold: float = Field(gt=0.0, lt=1.0)
    confidence_band: Literal["low", "medium", "high"]
    is_low_confidence: bool
    policy_action: Literal["proceed", "request-additional-input", "manual-review"]
    review_recommended: bool


class InferenceMetadata(BaseModel):
    backend: Literal["deterministic-placeholder"] = "deterministic-placeholder"
    deterministic_seed: str = Field(min_length=8, max_length=64)
