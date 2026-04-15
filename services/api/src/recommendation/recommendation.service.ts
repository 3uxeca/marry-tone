import {
  RecommendationExecutionMode,
  RecommendationFallbackPolicy,
  RecommendationGenerationStatus,
  RecommendationRationaleSource,
  RecommendationRetryState,
  type GenerateRecommendationRequest,
  type GenerateRecommendationResponse,
  type RecommendationGenerationCompleted,
  type StyleCategory,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

import { errorEnvelope, successEnvelope } from "../common/api-envelope";
import { P0MemoryStoreService } from "../p0/p0-memory-store.service";

@Injectable()
export class RecommendationService {
  constructor(private readonly store: P0MemoryStoreService) {}

  generate(request: GenerateRecommendationRequest): GenerateRecommendationResponse {
    if (!request.profileId || !request.coupleId) {
      return errorEnvelope("BAD_REQUEST", "profileId and coupleId are required");
    }

    if (!request.requireMainOption) {
      return errorEnvelope("BAD_REQUEST", "requireMainOption must be true");
    }

    const categories = request.categories ?? [];
    if (categories.length === 0) {
      return errorEnvelope("BAD_REQUEST", "categories must include at least one style category");
    }

    const optionCount = Math.min(3, Math.max(1, request.maxOptions));
    const recommendationId = this.store.nextId("recommendation");
    const requestedAt = new Date().toISOString();

    const options = Array.from({ length: optionCount }, (_, index) => {
      const rank = (index + 1) as 1 | 2 | 3;
      const optionId = `${recommendationId}-${this.store.nextId("option")}`;
      return {
        optionId,
        rank,
        isMain: rank === 1,
        summary: `추천안 ${rank} · ${request.requestType}`,
        suggestions: categories.map((category) => this.toCategorySuggestion(category, rank)),
        rationale: {
          headline: "퍼스널 컬러/골격/예식장/커플 정책 A를 종합 반영했습니다.",
          items: [
            {
              source: RecommendationRationaleSource.PERSONAL_COLOR,
              reason: "퍼스널컬러 톤과 대비를 안정적으로 유지",
              score: 0.88,
            },
            {
              source: RecommendationRationaleSource.SKELETON,
              reason: "골격 비율에 맞춘 실루엣 우선",
              score: 0.84,
            },
            {
              source: RecommendationRationaleSource.COUPLE_POLICY_A,
              reason: "취향 충돌 시 정책 A 우선 반영",
              score: 0.8,
            },
          ],
        },
      };
    });

    const completedPayload: RecommendationGenerationCompleted = {
      recommendationId,
      profileId: request.profileId,
      coupleId: request.coupleId,
      status: RecommendationGenerationStatus.COMPLETED,
      executionMode: RecommendationExecutionMode.AI_PRIMARY,
      fallbackPolicy: RecommendationFallbackPolicy.RULE_BASED_TOP3,
      retryState: RecommendationRetryState.NONE,
      retriedCount: 0,
      context: {
        personalColor: this.store.getIntake(request.profileId)?.diagnosisSummary.personalColor,
        skeleton: this.store.getIntake(request.profileId)?.diagnosisSummary.skeleton,
        venueStyleHint: "garden-daylight",
      },
      requestedAt,
      options: options as RecommendationGenerationCompleted["options"],
      mainOptionId: options[0].optionId,
    };

    this.store.saveRecommendation(completedPayload);
    return successEnvelope(completedPayload);
  }

  private toCategorySuggestion(category: StyleCategory, rank: 1 | 2 | 3) {
    return {
      category,
      title: `${category} 제안 ${rank}`,
      description: `${category} 카테고리의 ${rank}순위 추천 스타일`,
      tags: ["main-fit", `rank-${rank}`],
    };
  }
}
