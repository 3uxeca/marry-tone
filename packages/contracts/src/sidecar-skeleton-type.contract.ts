import type {
  SidecarInferenceMetadata,
  SidecarLowConfidenceMetadata,
} from "./sidecar-diagnosis-common.contract";

export const sidecarSkeletonTypes = ["straight", "wave", "natural"] as const;

export type SidecarSkeletonType = (typeof sidecarSkeletonTypes)[number];

export interface SidecarSkeletonTypeDiagnosisRequest {
  user_id: string;
  image_uri?: string;
  shoulder_slope_note?: string;
}

export interface SidecarSkeletonTypeDiagnosisResponse {
  diagnosis_type: "skeleton-type";
  skeleton_type: SidecarSkeletonType;
  style_tips: string[];
  confidence: number;
  model_version: string;
  low_confidence: SidecarLowConfidenceMetadata;
  inference: SidecarInferenceMetadata;
}

export const sidecarSkeletonTypeDiagnosisPath = "/diagnosis/skeleton-type";
