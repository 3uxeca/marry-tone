export const sidecarConfidenceBands = ["low", "medium", "high"] as const;

export type SidecarConfidenceBand = (typeof sidecarConfidenceBands)[number];

export const sidecarConfidencePolicyCodes = ["policy-c"] as const;

export type SidecarConfidencePolicyCode = (typeof sidecarConfidencePolicyCodes)[number];

export const sidecarConfidencePolicyActions = [
  "proceed",
  "request-additional-input",
  "manual-review",
] as const;

export type SidecarConfidencePolicyAction =
  (typeof sidecarConfidencePolicyActions)[number];

export interface SidecarLowConfidenceMetadata {
  policy_code: SidecarConfidencePolicyCode;
  threshold: number;
  confidence_band: SidecarConfidenceBand;
  is_low_confidence: boolean;
  policy_action: SidecarConfidencePolicyAction;
  review_recommended: boolean;
}

export const sidecarInferenceBackends = ["deterministic-placeholder"] as const;

export type SidecarInferenceBackend = (typeof sidecarInferenceBackends)[number];

export interface SidecarInferenceMetadata {
  backend: SidecarInferenceBackend;
  deterministic_seed: string;
}
