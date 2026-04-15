import type { ApiEnvelope } from "./common-api.contract";

export enum CoupleDecisionActor {
  BRIDE = "BRIDE",
  GROOM = "GROOM",
  SYSTEM = "SYSTEM",
}

export enum CoupleConflictResolutionPolicy {
  POLICY_A = "POLICY_A",
}

export enum CoupleDecisionStatus {
  PENDING = "PENDING",
  AGREED = "AGREED",
  POLICY_A_APPLIED = "POLICY_A_APPLIED",
  FINALIZED = "FINALIZED",
}

export enum CoupleDecisionEventType {
  PREFERENCE_SUBMITTED = "PREFERENCE_SUBMITTED",
  CONFLICT_DETECTED = "CONFLICT_DETECTED",
  POLICY_A_APPLIED = "POLICY_A_APPLIED",
  FINAL_SELECTION_CONFIRMED = "FINAL_SELECTION_CONFIRMED",
}

export interface CouplePreferenceVote {
  actor: CoupleDecisionActor.BRIDE | CoupleDecisionActor.GROOM;
  optionId: string;
  preferenceRank: 1 | 2 | 3;
  reason?: string;
}

export interface CoupleDecisionEventPayload {
  eventId: string;
  type: CoupleDecisionEventType;
  actor: CoupleDecisionActor;
  occurredAt: string;
  optionId?: string;
  policy?: CoupleConflictResolutionPolicy;
  note?: string;
}

export interface SubmitConsensusDecisionRequest {
  coupleId: string;
  recommendationId: string;
  selectedOptionId: string;
  policy: CoupleConflictResolutionPolicy.POLICY_A;
  votes: CouplePreferenceVote[];
}

export interface SubmitConsensusDecisionPayload {
  decisionId: string;
  coupleId: string;
  recommendationId: string;
  selectedOptionId: string;
  status: CoupleDecisionStatus;
  appliedPolicy: CoupleConflictResolutionPolicy.POLICY_A;
  latestEvent: CoupleDecisionEventPayload;
}

export type SubmitConsensusDecisionResponse = ApiEnvelope<SubmitConsensusDecisionPayload>;
