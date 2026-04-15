import {
  ChecklistItemKey,
  ChecklistItemStatus,
  DiagnosisGateChoice,
  DiagnosisSourceType,
  LowConfidencePolicy,
  PersonalColorSeason,
  PersonalColorTone,
  PersonalColorUndertone,
  ProfileIntakeNextStep,
  ProfileIntakeStatus,
  SkeletonType,
  type GetProfileChecklistSummaryResponse,
  type SubmitDiagnosisGateChoiceRequest,
  type SubmitDiagnosisGateChoiceResponse,
  type SubmitProfileIntakeRequest,
  type SubmitProfileIntakeResponse,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

import { errorEnvelope, successEnvelope } from "../common/api-envelope";
import { P0MemoryStoreService } from "../p0/p0-memory-store.service";

const CHECKLIST_LABEL: Record<ChecklistItemKey, string> = {
  [ChecklistItemKey.PERSONAL_COLOR]: "퍼스널 컬러 진단",
  [ChecklistItemKey.SKELETON]: "골격 진단",
  [ChecklistItemKey.DRESS_TUXEDO_STYLE]: "드레스 & 턱시도 스타일 확정",
  [ChecklistItemKey.HAIR_MAKEUP]: "헤어 & 메이크업 확정",
  [ChecklistItemKey.SHOOT_CONCEPT]: "촬영 컨셉 확정",
  [ChecklistItemKey.VENUE_CONFIRMATION]: "예식장 환경 확정",
  [ChecklistItemKey.COUPLE_CONSENSUS]: "커플 합의 완료",
};

@Injectable()
export class ProfileService {
  constructor(private readonly store: P0MemoryStoreService) {}

  submitDiagnosisGate(
    request: SubmitDiagnosisGateChoiceRequest,
  ): SubmitDiagnosisGateChoiceResponse {
    if (!request.profileId || !request.choice || !request.selectedAt) {
      return errorEnvelope("BAD_REQUEST", "profileId, choice, selectedAt are required");
    }

    const requiresImageUpload = request.choice === DiagnosisGateChoice.NOT_EXPERIENCED;
    const nextStep = requiresImageUpload
      ? ProfileIntakeNextStep.REUPLOAD_REQUIRED
      : ProfileIntakeNextStep.READY_FOR_RECOMMENDATION;

    this.store.saveDiagnosisGate(request.profileId, request.choice, request.selectedAt);

    return successEnvelope({
      profileId: request.profileId,
      choice: request.choice,
      requiresImageUpload,
      nextStep,
    });
  }

  submitProfileIntake(request: SubmitProfileIntakeRequest): SubmitProfileIntakeResponse {
    if (!request.profileId || !request.gateChoice || !request.diagnosisInput) {
      return errorEnvelope("BAD_REQUEST", "profileId, gateChoice, diagnosisInput are required");
    }

    const intakeId = this.store.nextId("intake");
    const lowConfidencePolicy = LowConfidencePolicy.POLICY_C_REUPLOAD_THEN_MANUAL;

    if (request.gateChoice === DiagnosisGateChoice.EXPERIENCED) {
      const intakePayload = {
        profileId: request.profileId,
        intakeId,
        status: ProfileIntakeStatus.COMPLETED,
        nextStep: ProfileIntakeNextStep.READY_FOR_RECOMMENDATION,
        lowConfidencePolicy,
        diagnosisSummary: {
          personalColor: request.diagnosisInput.personalColor,
          skeleton: request.diagnosisInput.skeleton,
          sourceType: request.diagnosisInput.sourceType,
        },
      };

      this.store.saveIntake(intakePayload);
      return successEnvelope(intakePayload);
    }

    if (request.lowConfidencePolicy !== LowConfidencePolicy.POLICY_C_REUPLOAD_THEN_MANUAL) {
      return errorEnvelope("BAD_REQUEST", "lowConfidencePolicy must be POLICY_C_REUPLOAD_THEN_MANUAL");
    }

    const hasLowConfidenceSignal =
      request.diagnosisInput.facePhotoAssetId.includes("low") ||
      request.diagnosisInput.bodyPhotoAssetId.includes("low");

    const intakePayload = {
      profileId: request.profileId,
      intakeId,
      status: hasLowConfidenceSignal
        ? ProfileIntakeStatus.DIAGNOSIS_IN_PROGRESS
        : ProfileIntakeStatus.COMPLETED,
      nextStep: hasLowConfidenceSignal
        ? ProfileIntakeNextStep.MANUAL_SURVEY_REQUIRED
        : ProfileIntakeNextStep.READY_FOR_RECOMMENDATION,
      lowConfidencePolicy,
      diagnosisSummary: {
        personalColor: hasLowConfidenceSignal
          ? undefined
          : {
              season: PersonalColorSeason.SPRING,
              tone: PersonalColorTone.BRIGHT,
              undertone: PersonalColorUndertone.WARM,
              confidence: 0.84,
            },
        skeleton: hasLowConfidenceSignal
          ? undefined
          : {
              type: SkeletonType.STRAIGHT,
              confidence: 0.8,
            },
        sourceType: DiagnosisSourceType.AUTO_ANALYZED,
      },
    };

    this.store.saveIntake(intakePayload);
    return successEnvelope(intakePayload);
  }

  getChecklistSummary(profileId: string): GetProfileChecklistSummaryResponse {
    if (!profileId) {
      return errorEnvelope("BAD_REQUEST", "profileId query is required");
    }

    const statusByKey = this.store.buildChecklistStatus(profileId);
    const now = new Date().toISOString();
    const items = (Object.values(ChecklistItemKey) as ChecklistItemKey[]).map((key) => {
      const status = statusByKey[key] ?? ChecklistItemStatus.PENDING;
      return {
        key,
        label: CHECKLIST_LABEL[key],
        status,
        ...(status === ChecklistItemStatus.COMPLETED ? { completedAt: now } : {}),
      };
    });

    const totalItems = items.length;
    const completedItems = items.filter((item) => item.status === ChecklistItemStatus.COMPLETED).length;
    const completionRate = totalItems === 0 ? 0 : Number((completedItems / totalItems).toFixed(2));

    return successEnvelope({
      profileId,
      totalItems,
      completedItems,
      completionRate,
      isCompleted: completedItems === totalItems,
      items,
    });
  }
}
