from fastapi import FastAPI

from .logic import infer_body_measurements, infer_personal_color, infer_skeleton_type
from .models import (
    BodyMeasurementsDiagnosisRequest,
    BodyMeasurementsDiagnosisResponse,
    HealthResponse,
    PersonalColorDiagnosisRequest,
    PersonalColorDiagnosisResponse,
    SkeletonTypeDiagnosisRequest,
    SkeletonTypeDiagnosisResponse,
)

app = FastAPI(
    title="MarryTone ML Sidecar",
    version="0.1.0",
    description="Phase 0 placeholder diagnosis APIs for personal color, body measurements, and skeleton type.",
)


@app.get("/health", response_model=HealthResponse, tags=["system"])
def health() -> HealthResponse:
    return HealthResponse()


@app.post(
    "/diagnosis/personal-color",
    response_model=PersonalColorDiagnosisResponse,
    tags=["diagnosis"],
)
def diagnose_personal_color(
    payload: PersonalColorDiagnosisRequest,
) -> PersonalColorDiagnosisResponse:
    return infer_personal_color(payload)


@app.post(
    "/diagnosis/body-measurements",
    response_model=BodyMeasurementsDiagnosisResponse,
    tags=["diagnosis"],
)
def diagnose_body_measurements(
    payload: BodyMeasurementsDiagnosisRequest,
) -> BodyMeasurementsDiagnosisResponse:
    return infer_body_measurements(payload)


@app.post(
    "/diagnosis/skeleton-type",
    response_model=SkeletonTypeDiagnosisResponse,
    tags=["diagnosis"],
)
def diagnose_skeleton_type(
    payload: SkeletonTypeDiagnosisRequest,
) -> SkeletonTypeDiagnosisResponse:
    return infer_skeleton_type(payload)

