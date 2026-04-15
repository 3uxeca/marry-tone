import type { ApiEnvelope } from "./common-api.contract";
import type { PersonalColorProfile, SkeletonProfile } from "./style-domain.contract";

export enum DiagnosisGateChoice {
  EXPERIENCED = "EXPERIENCED",
  NOT_EXPERIENCED = "NOT_EXPERIENCED",
}

export enum DiagnosisSourceType {
  SELF_REPORTED = "SELF_REPORTED",
  STUDIO_REPORTED = "STUDIO_REPORTED",
  AUTO_ANALYZED = "AUTO_ANALYZED",
  MANUAL_SURVEY = "MANUAL_SURVEY",
}

export enum LowConfidencePolicy {
  POLICY_C_REUPLOAD_THEN_MANUAL = "POLICY_C_REUPLOAD_THEN_MANUAL",
}

export enum ProfileIntakeStatus {
  SUBMITTED = "SUBMITTED",
  DIAGNOSIS_IN_PROGRESS = "DIAGNOSIS_IN_PROGRESS",
  COMPLETED = "COMPLETED",
}

export enum ProfileIntakeNextStep {
  READY_FOR_RECOMMENDATION = "READY_FOR_RECOMMENDATION",
  REUPLOAD_REQUIRED = "REUPLOAD_REQUIRED",
  MANUAL_SURVEY_REQUIRED = "MANUAL_SURVEY_REQUIRED",
}

export interface SubmitDiagnosisGateChoiceRequest {
  profileId: string;
  choice: DiagnosisGateChoice;
  selectedAt: string;
}

export interface DiagnosisGateChoicePayload {
  profileId: string;
  choice: DiagnosisGateChoice;
  requiresImageUpload: boolean;
  nextStep: ProfileIntakeNextStep;
}

export type SubmitDiagnosisGateChoiceResponse = ApiEnvelope<DiagnosisGateChoicePayload>;

export interface ExistingDiagnosisInput {
  personalColor: PersonalColorProfile;
  skeleton: SkeletonProfile;
  sourceType: DiagnosisSourceType.SELF_REPORTED | DiagnosisSourceType.STUDIO_REPORTED;
  diagnosedAt?: string;
}

export interface PhotoDiagnosisInput {
  facePhotoAssetId: string;
  bodyPhotoAssetId: string;
  encryptionNoticeAccepted: true;
  sourceType: DiagnosisSourceType.AUTO_ANALYZED;
}

export interface ExperiencedProfileIntakeRequest {
  profileId: string;
  gateChoice: DiagnosisGateChoice.EXPERIENCED;
  diagnosisInput: ExistingDiagnosisInput;
}

export interface NewProfileIntakeRequest {
  profileId: string;
  gateChoice: DiagnosisGateChoice.NOT_EXPERIENCED;
  diagnosisInput: PhotoDiagnosisInput;
  lowConfidencePolicy: LowConfidencePolicy.POLICY_C_REUPLOAD_THEN_MANUAL;
}

export type SubmitProfileIntakeRequest = ExperiencedProfileIntakeRequest | NewProfileIntakeRequest;

export interface ProfileDiagnosisSummary {
  personalColor?: PersonalColorProfile;
  skeleton?: SkeletonProfile;
  sourceType: DiagnosisSourceType;
}

export interface ProfileIntakePayload {
  profileId: string;
  intakeId: string;
  status: ProfileIntakeStatus;
  nextStep: ProfileIntakeNextStep;
  lowConfidencePolicy: LowConfidencePolicy.POLICY_C_REUPLOAD_THEN_MANUAL;
  diagnosisSummary: ProfileDiagnosisSummary;
}

export type SubmitProfileIntakeResponse = ApiEnvelope<ProfileIntakePayload>;

export enum ChecklistItemKey {
  PERSONAL_COLOR = "PERSONAL_COLOR",
  SKELETON = "SKELETON",
  DRESS_TUXEDO_STYLE = "DRESS_TUXEDO_STYLE",
  HAIR_MAKEUP = "HAIR_MAKEUP",
  SHOOT_CONCEPT = "SHOOT_CONCEPT",
  VENUE_CONFIRMATION = "VENUE_CONFIRMATION",
  COUPLE_CONSENSUS = "COUPLE_CONSENSUS",
}

export enum ChecklistItemStatus {
  PENDING = "PENDING",
  COMPLETED = "COMPLETED",
}

export interface ChecklistItemSummary {
  key: ChecklistItemKey;
  label: string;
  status: ChecklistItemStatus;
  completedAt?: string;
}

export interface ProfileChecklistSummaryPayload {
  profileId: string;
  totalItems: number;
  completedItems: number;
  completionRate: number;
  isCompleted: boolean;
  items: ChecklistItemSummary[];
}

export interface GetProfileChecklistSummaryRequest {
  profileId: string;
}

export type GetProfileChecklistSummaryResponse = ApiEnvelope<ProfileChecklistSummaryPayload>;
