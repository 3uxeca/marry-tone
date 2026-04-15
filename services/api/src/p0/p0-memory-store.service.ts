import {
  ChecklistItemKey,
  ChecklistItemStatus,
  CoupleDecisionStatus,
  type ProfileIntakePayload,
  type RecommendationGenerationCompleted,
  type SubmitConsensusDecisionPayload,
  type WardrobeComparisonSet,
  type WardrobeStyleCard,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

@Injectable()
export class P0MemoryStoreService {
  private readonly diagnosisGateByProfile = new Map<string, { choice: string; selectedAt: string }>();
  private readonly intakeByProfile = new Map<string, ProfileIntakePayload>();
  private readonly recommendationById = new Map<string, RecommendationGenerationCompleted>();
  private readonly recommendationIdsByProfile = new Map<string, string[]>();
  private readonly styleCardsByProfile = new Map<string, WardrobeStyleCard[]>();
  private readonly comparisonSetById = new Map<string, WardrobeComparisonSet>();
  private readonly consensusByProfile = new Map<string, SubmitConsensusDecisionPayload>();

  private readonly counters: Record<
    "intake" | "recommendation" | "option" | "card" | "comparison" | "decision" | "event",
    number
  > = {
    intake: 0,
    recommendation: 0,
    option: 0,
    card: 0,
    comparison: 0,
    decision: 0,
    event: 0,
  };

  nextId(kind: keyof P0MemoryStoreService["counters"]): string {
    this.counters[kind] += 1;
    return `${kind}-${String(this.counters[kind]).padStart(4, "0")}`;
  }

  saveDiagnosisGate(profileId: string, choice: string, selectedAt: string): void {
    this.diagnosisGateByProfile.set(profileId, { choice, selectedAt });
  }

  saveIntake(payload: ProfileIntakePayload): void {
    this.intakeByProfile.set(payload.profileId, payload);
  }

  getIntake(profileId: string): ProfileIntakePayload | undefined {
    return this.intakeByProfile.get(profileId);
  }

  saveRecommendation(payload: RecommendationGenerationCompleted): void {
    this.recommendationById.set(payload.recommendationId, payload);
    const profileIds = this.recommendationIdsByProfile.get(payload.profileId) ?? [];
    this.recommendationIdsByProfile.set(payload.profileId, [payload.recommendationId, ...profileIds]);
  }

  getRecommendation(recommendationId: string): RecommendationGenerationCompleted | undefined {
    return this.recommendationById.get(recommendationId);
  }

  hasCompletedRecommendation(profileId: string): boolean {
    const recommendationIds = this.recommendationIdsByProfile.get(profileId) ?? [];
    return recommendationIds.length > 0;
  }

  saveStyleCard(card: WardrobeStyleCard): void {
    const current = this.styleCardsByProfile.get(card.profileId) ?? [];
    this.styleCardsByProfile.set(card.profileId, [card, ...current]);
  }

  listStyleCards(profileId: string): WardrobeStyleCard[] {
    return this.styleCardsByProfile.get(profileId) ?? [];
  }

  saveComparisonSet(set: WardrobeComparisonSet): void {
    this.comparisonSetById.set(set.comparisonSetId, set);
  }

  saveConsensus(profileId: string, payload: SubmitConsensusDecisionPayload): void {
    this.consensusByProfile.set(profileId, payload);
  }

  hasConsensus(profileId: string): boolean {
    const item = this.consensusByProfile.get(profileId);
    if (!item) {
      return false;
    }

    return (
      item.status === CoupleDecisionStatus.FINALIZED ||
      item.status === CoupleDecisionStatus.POLICY_A_APPLIED ||
      item.status === CoupleDecisionStatus.AGREED
    );
  }

  buildChecklistStatus(profileId: string): Record<ChecklistItemKey, ChecklistItemStatus> {
    const intake = this.getIntake(profileId);
    const hasPersonalColor = Boolean(intake?.diagnosisSummary.personalColor);
    const hasSkeleton = Boolean(intake?.diagnosisSummary.skeleton);
    const hasRecommendation = this.hasCompletedRecommendation(profileId);
    const hasConsensus = this.hasConsensus(profileId);

    return {
      [ChecklistItemKey.PERSONAL_COLOR]: hasPersonalColor
        ? ChecklistItemStatus.COMPLETED
        : ChecklistItemStatus.PENDING,
      [ChecklistItemKey.SKELETON]: hasSkeleton ? ChecklistItemStatus.COMPLETED : ChecklistItemStatus.PENDING,
      [ChecklistItemKey.DRESS_TUXEDO_STYLE]: hasRecommendation
        ? ChecklistItemStatus.COMPLETED
        : ChecklistItemStatus.PENDING,
      [ChecklistItemKey.HAIR_MAKEUP]: hasRecommendation
        ? ChecklistItemStatus.COMPLETED
        : ChecklistItemStatus.PENDING,
      [ChecklistItemKey.SHOOT_CONCEPT]: hasRecommendation
        ? ChecklistItemStatus.COMPLETED
        : ChecklistItemStatus.PENDING,
      [ChecklistItemKey.VENUE_CONFIRMATION]: ChecklistItemStatus.PENDING,
      [ChecklistItemKey.COUPLE_CONSENSUS]: hasConsensus
        ? ChecklistItemStatus.COMPLETED
        : ChecklistItemStatus.PENDING,
    };
  }
}
