import type { ApiEnvelope } from "./common-api.contract";
import type { PersonalColorProfile, SkeletonProfile, StyleCategory } from "./style-domain.contract";

export enum RecommendationRequestType {
  INITIAL = "INITIAL",
  REGENERATE = "REGENERATE",
}

export enum RecommendationGenerationStatus {
  QUEUED = "QUEUED",
  GENERATING = "GENERATING",
  COMPLETED = "COMPLETED",
  FAILED = "FAILED",
}

export enum RecommendationExecutionMode {
  AI_PRIMARY = "AI_PRIMARY",
  RULE_BASED_FALLBACK = "RULE_BASED_FALLBACK",
}

export enum RecommendationFallbackPolicy {
  RULE_BASED_TOP3 = "RULE_BASED_TOP3",
}

export enum RecommendationRetryState {
  NONE = "NONE",
  RETRYING_ONCE = "RETRYING_ONCE",
  RETRY_EXHAUSTED = "RETRY_EXHAUSTED",
  MANUAL_SELECTION_REQUIRED = "MANUAL_SELECTION_REQUIRED",
}

export enum RecommendationRationaleSource {
  PERSONAL_COLOR = "PERSONAL_COLOR",
  SKELETON = "SKELETON",
  VENUE = "VENUE",
  COUPLE_POLICY_A = "COUPLE_POLICY_A",
  USER_PREFERENCE = "USER_PREFERENCE",
}

export interface GenerateRecommendationRequest {
  profileId: string;
  coupleId: string;
  requestType: RecommendationRequestType;
  maxOptions: 1 | 2 | 3;
  requireMainOption: true;
  categories: StyleCategory[];
}

export interface RecommendationContextSnapshot {
  personalColor?: PersonalColorProfile;
  skeleton?: SkeletonProfile;
  venueStyleHint?: string;
}

export interface RecommendationRationaleItem {
  source: RecommendationRationaleSource;
  reason: string;
  score: number;
}

export interface RecommendationRationalePayload {
  headline: string;
  items: RecommendationRationaleItem[];
}

export interface RecommendationCategorySuggestion {
  category: StyleCategory;
  title: string;
  description: string;
  tags: string[];
}

export interface RecommendationOption {
  optionId: string;
  rank: 1 | 2 | 3;
  isMain: boolean;
  summary: string;
  suggestions: RecommendationCategorySuggestion[];
  rationale: RecommendationRationalePayload;
}

export type RecommendationOptionList =
  | [RecommendationOption]
  | [RecommendationOption, RecommendationOption]
  | [RecommendationOption, RecommendationOption, RecommendationOption];

export interface RecommendationGenerationBase {
  recommendationId: string;
  profileId: string;
  coupleId: string;
  status: RecommendationGenerationStatus;
  executionMode: RecommendationExecutionMode;
  fallbackPolicy: RecommendationFallbackPolicy | null;
  retryState: RecommendationRetryState;
  retriedCount: 0 | 1;
  context: RecommendationContextSnapshot;
  requestedAt: string;
}

export interface RecommendationGenerationCompleted extends RecommendationGenerationBase {
  status: RecommendationGenerationStatus.COMPLETED;
  options: RecommendationOptionList;
  mainOptionId: string;
}

export interface RecommendationGenerationInProgress extends RecommendationGenerationBase {
  status: RecommendationGenerationStatus.QUEUED | RecommendationGenerationStatus.GENERATING;
  options: [];
  mainOptionId: null;
}

export interface RecommendationGenerationFailed extends RecommendationGenerationBase {
  status: RecommendationGenerationStatus.FAILED;
  options: [];
  mainOptionId: null;
  failureReason: string;
}

export type GenerateRecommendationPayload =
  | RecommendationGenerationCompleted
  | RecommendationGenerationInProgress
  | RecommendationGenerationFailed;

export type GenerateRecommendationResponse = ApiEnvelope<GenerateRecommendationPayload>;
