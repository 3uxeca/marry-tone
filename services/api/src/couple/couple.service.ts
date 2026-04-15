import {
  CoupleConflictResolutionPolicy,
  CoupleDecisionActor,
  CoupleDecisionEventType,
  CoupleDecisionStatus,
  type SubmitConsensusDecisionRequest,
  type SubmitConsensusDecisionResponse,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

import { errorEnvelope, successEnvelope } from "../common/api-envelope";
import { P0MemoryStoreService } from "../p0/p0-memory-store.service";

@Injectable()
export class CoupleService {
  constructor(private readonly store: P0MemoryStoreService) {}

  confirmConsensus(request: SubmitConsensusDecisionRequest): SubmitConsensusDecisionResponse {
    if (!request.coupleId || !request.recommendationId || !request.selectedOptionId) {
      return errorEnvelope(
        "BAD_REQUEST",
        "coupleId, recommendationId and selectedOptionId are required",
      );
    }

    if (request.policy !== CoupleConflictResolutionPolicy.POLICY_A) {
      return errorEnvelope("BAD_REQUEST", "only POLICY_A is supported");
    }

    const recommendation = this.store.getRecommendation(request.recommendationId);
    if (!recommendation) {
      return errorEnvelope("NOT_FOUND", "recommendation not found");
    }

    const knownOptionIds = new Set(recommendation.options.map((option) => option.optionId));
    if (!knownOptionIds.has(request.selectedOptionId)) {
      return errorEnvelope("BAD_REQUEST", "selectedOptionId is not part of recommendation options");
    }

    const voteOptions = new Set(request.votes.map((vote) => vote.optionId));
    const conflict = voteOptions.size > 1;

    const status = conflict ? CoupleDecisionStatus.POLICY_A_APPLIED : CoupleDecisionStatus.FINALIZED;
    const eventType = conflict
      ? CoupleDecisionEventType.POLICY_A_APPLIED
      : CoupleDecisionEventType.FINAL_SELECTION_CONFIRMED;

    const payload = {
      decisionId: this.store.nextId("decision"),
      coupleId: request.coupleId,
      recommendationId: request.recommendationId,
      selectedOptionId: request.selectedOptionId,
      status,
      appliedPolicy: CoupleConflictResolutionPolicy.POLICY_A,
      latestEvent: {
        eventId: this.store.nextId("event"),
        type: eventType,
        actor: conflict ? CoupleDecisionActor.SYSTEM : CoupleDecisionActor.BRIDE,
        occurredAt: new Date().toISOString(),
        optionId: request.selectedOptionId,
        policy: CoupleConflictResolutionPolicy.POLICY_A,
        note: conflict
          ? "취향 충돌 감지로 정책 A를 적용하여 최종안을 확정했습니다."
          : "양측 선호 일치로 최종안을 확정했습니다.",
      },
    };

    this.store.saveConsensus(recommendation.profileId, payload);
    return successEnvelope(payload);
  }
}
