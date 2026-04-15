from __future__ import annotations

import hashlib
import json

from .models import (
    BodyMeasurements,
    BodyMeasurementsDiagnosisRequest,
    BodyMeasurementsDiagnosisResponse,
    InferenceMetadata,
    LowConfidenceMetadata,
    PersonalColorDiagnosisRequest,
    PersonalColorDiagnosisResponse,
    SkeletonTypeDiagnosisRequest,
    SkeletonTypeDiagnosisResponse,
)


def _canonical_payload(data: dict) -> str:
    return json.dumps(data, sort_keys=True, separators=(",", ":"), ensure_ascii=True)


def _fraction(seed: str, minimum: float = 0.0, maximum: float = 1.0) -> float:
    digest = hashlib.sha256(seed.encode("utf-8")).digest()
    number = int.from_bytes(digest[:8], byteorder="big", signed=False)
    ratio = number / float(2**64 - 1)
    return minimum + (maximum - minimum) * ratio


def _pick(seed: str, options: list[str]) -> str:
    if not options:
        raise ValueError("options must not be empty")
    index = int(_fraction(seed) * len(options))
    if index >= len(options):
        index = len(options) - 1
    return options[index]


def _confidence_band(confidence: float, threshold: float) -> str:
    if confidence < threshold:
        return "low"
    if confidence >= 0.85:
        return "high"
    return "medium"


def _build_low_confidence_metadata(
    confidence: float,
    threshold: float,
) -> LowConfidenceMetadata:
    is_low_confidence = confidence < threshold
    return LowConfidenceMetadata(
        threshold=threshold,
        confidence_band=_confidence_band(confidence, threshold),  # type: ignore[arg-type]
        is_low_confidence=is_low_confidence,
        policy_action="request-additional-input" if is_low_confidence else "proceed",
        review_recommended=is_low_confidence,
    )


def _build_inference_metadata(canonical: str) -> InferenceMetadata:
    seed = hashlib.sha256(canonical.encode("utf-8")).hexdigest()[:16]
    return InferenceMetadata(deterministic_seed=seed)


def infer_personal_color(
    payload: PersonalColorDiagnosisRequest,
) -> PersonalColorDiagnosisResponse:
    canonical = _canonical_payload(payload.model_dump(mode="json", exclude_none=True))
    season = _pick(f"{canonical}:season", ["spring", "summer", "autumn", "winter"])
    undertone = _pick(f"{canonical}:undertone", ["warm", "cool", "neutral"])

    palette_by_season = {
        "spring": ["peach", "coral", "mint", "ivory"],
        "summer": ["dusty-rose", "lavender-gray", "sky-blue", "cool-beige"],
        "autumn": ["terracotta", "olive", "mustard", "camel"],
        "winter": ["emerald", "cobalt", "ruby", "charcoal"],
    }

    confidence = round(_fraction(f"{canonical}:confidence", 0.60, 0.92), 3)
    threshold = 0.72

    return PersonalColorDiagnosisResponse(
        season=season,  # type: ignore[arg-type]
        undertone=undertone,  # type: ignore[arg-type]
        recommended_colors=palette_by_season[season],
        confidence=confidence,
        low_confidence=_build_low_confidence_metadata(confidence, threshold),
        inference=_build_inference_metadata(canonical),
    )


def infer_body_measurements(
    payload: BodyMeasurementsDiagnosisRequest,
) -> BodyMeasurementsDiagnosisResponse:
    canonical = _canonical_payload(payload.model_dump(mode="json", exclude_none=True))
    height = payload.height_cm
    frame_scale = height / 170.0

    shoulder = round((40.0 * frame_scale) + _fraction(f"{canonical}:shoulder", -2.0, 2.0), 1)
    chest = round((90.0 * frame_scale) + _fraction(f"{canonical}:chest", -4.0, 4.0), 1)
    waist = round((72.0 * frame_scale) + _fraction(f"{canonical}:waist", -4.0, 4.0), 1)
    hip = round((94.0 * frame_scale) + _fraction(f"{canonical}:hip", -4.0, 4.0), 1)
    inseam = round((0.45 * height) + _fraction(f"{canonical}:inseam", -2.0, 2.0), 1)

    if chest - hip > 4:
        silhouette = "upper-heavy"
    elif hip - chest > 4:
        silhouette = "lower-heavy"
    elif abs(chest - waist) < 8 and abs(hip - waist) < 8:
        silhouette = "rectangular"
    else:
        silhouette = "balanced"

    confidence = round(_fraction(f"{canonical}:confidence", 0.58, 0.90), 3)
    threshold = 0.70

    return BodyMeasurementsDiagnosisResponse(
        silhouette_type=silhouette,  # type: ignore[arg-type]
        measurements=BodyMeasurements(
            shoulder_width_cm=shoulder,
            chest_cm=chest,
            waist_cm=waist,
            hip_cm=hip,
            inseam_cm=inseam,
        ),
        confidence=confidence,
        low_confidence=_build_low_confidence_metadata(confidence, threshold),
        inference=_build_inference_metadata(canonical),
    )


def infer_skeleton_type(
    payload: SkeletonTypeDiagnosisRequest,
) -> SkeletonTypeDiagnosisResponse:
    canonical = _canonical_payload(payload.model_dump(mode="json", exclude_none=True))
    skeleton_type = _pick(f"{canonical}:skeleton", ["straight", "wave", "natural"])

    tips_by_type = {
        "straight": [
            "Use clean tailoring and defined shoulder lines.",
            "Choose moderate structure around waist and hips.",
        ],
        "wave": [
            "Emphasize softness with drape and light fabrics.",
            "Prefer cropped or waist-marking silhouettes.",
        ],
        "natural": [
            "Use relaxed shapes and textured materials.",
            "Layer with longer lines and less constriction.",
        ],
    }

    confidence = round(_fraction(f"{canonical}:confidence", 0.62, 0.93), 3)
    threshold = 0.74

    return SkeletonTypeDiagnosisResponse(
        skeleton_type=skeleton_type,  # type: ignore[arg-type]
        style_tips=tips_by_type[skeleton_type],
        confidence=confidence,
        low_confidence=_build_low_confidence_metadata(confidence, threshold),
        inference=_build_inference_metadata(canonical),
    )
