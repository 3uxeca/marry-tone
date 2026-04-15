import type {
  SidecarInferenceMetadata,
  SidecarLowConfidenceMetadata,
} from "./sidecar-diagnosis-common.contract";

export const sidecarPersonalColorCaptureSources = [
  "camera",
  "gallery",
  "unknown",
] as const;

export type SidecarPersonalColorCaptureSource =
  (typeof sidecarPersonalColorCaptureSources)[number];

export const sidecarPersonalColorSeasons = [
  "spring",
  "summer",
  "autumn",
  "winter",
] as const;

export type SidecarPersonalColorSeason =
  (typeof sidecarPersonalColorSeasons)[number];

export const sidecarPersonalColorUndertones = [
  "warm",
  "cool",
  "neutral",
] as const;

export type SidecarPersonalColorUndertone =
  (typeof sidecarPersonalColorUndertones)[number];

export interface SidecarPersonalColorDiagnosisRequest {
  user_id: string;
  image_uri?: string;
  capture_source?: SidecarPersonalColorCaptureSource;
  skin_tone_note?: string;
}

export interface SidecarPersonalColorDiagnosisResponse {
  diagnosis_type: "personal-color";
  season: SidecarPersonalColorSeason;
  undertone: SidecarPersonalColorUndertone;
  recommended_colors: string[];
  confidence: number;
  model_version: string;
  low_confidence: SidecarLowConfidenceMetadata;
  inference: SidecarInferenceMetadata;
}

export const sidecarPersonalColorDiagnosisPath = "/diagnosis/personal-color";
