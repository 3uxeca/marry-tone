import type {
  SidecarInferenceMetadata,
  SidecarLowConfidenceMetadata,
} from "./sidecar-diagnosis-common.contract";

export const sidecarBodySilhouetteTypes = [
  "balanced",
  "upper-heavy",
  "lower-heavy",
  "rectangular",
] as const;

export type SidecarBodySilhouetteType =
  (typeof sidecarBodySilhouetteTypes)[number];

export interface SidecarBodyMeasurementsDiagnosisRequest {
  user_id: string;
  height_cm: number;
  weight_kg?: number;
  image_uri?: string;
}

export interface SidecarBodyMeasurementsSnapshot {
  shoulder_width_cm: number;
  chest_cm: number;
  waist_cm: number;
  hip_cm: number;
  inseam_cm: number;
}

export interface SidecarBodyMeasurementsDiagnosisResponse {
  diagnosis_type: "body-measurements";
  silhouette_type: SidecarBodySilhouetteType;
  measurements: SidecarBodyMeasurementsSnapshot;
  confidence: number;
  model_version: string;
  low_confidence: SidecarLowConfidenceMetadata;
  inference: SidecarInferenceMetadata;
}

export const sidecarBodyMeasurementsDiagnosisPath = "/diagnosis/body-measurements";
