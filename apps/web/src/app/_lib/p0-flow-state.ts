"use client";

export type RecommendationPreview = {
  isMain: boolean;
  optionId: string;
  rank: 1 | 2 | 3;
  summary: string;
  title: string;
};

export type P0FlowState = {
  cardIdsByOption: Record<string, string>;
  comparisonSetId?: string;
  consensusDecisionId?: string;
  coupleId: string;
  gateChoice?: "EXPERIENCED" | "NOT_EXPERIENCED";
  intakeId?: string;
  optionIds: string[];
  profileId: string;
  recommendationId?: string;
  recommendations: RecommendationPreview[];
  selectedOptionId?: string;
};

const FLOW_STATE_STORAGE_KEY = "marrytone:p0-flow-state";

function generateId(prefix: string): string {
  const random = typeof crypto !== "undefined" && "randomUUID" in crypto
    ? crypto.randomUUID().slice(0, 8)
    : Math.random().toString(16).slice(2, 10);
  return `${prefix}-${random}`;
}

export function createDefaultFlowState(): P0FlowState {
  return {
    profileId: generateId("profile"),
    coupleId: generateId("couple"),
    optionIds: [],
    recommendations: [],
    cardIdsByOption: {},
  };
}

export function readFlowState(): P0FlowState {
  if (typeof window === "undefined") {
    return createDefaultFlowState();
  }

  const raw = window.localStorage.getItem(FLOW_STATE_STORAGE_KEY);
  if (!raw) {
    const seed = createDefaultFlowState();
    writeFlowState(seed);
    return seed;
  }

  try {
    const parsed = JSON.parse(raw) as Partial<P0FlowState>;
    const hydrated: P0FlowState = {
      ...createDefaultFlowState(),
      ...parsed,
      optionIds: parsed.optionIds ?? [],
      recommendations: parsed.recommendations ?? [],
      cardIdsByOption: parsed.cardIdsByOption ?? {},
    };
    writeFlowState(hydrated);
    return hydrated;
  } catch {
    const fallback = createDefaultFlowState();
    writeFlowState(fallback);
    return fallback;
  }
}

export function writeFlowState(next: P0FlowState): P0FlowState {
  if (typeof window !== "undefined") {
    window.localStorage.setItem(FLOW_STATE_STORAGE_KEY, JSON.stringify(next));
  }
  return next;
}

export function patchFlowState(patch: Partial<P0FlowState>): P0FlowState {
  const current = readFlowState();
  return writeFlowState({
    ...current,
    ...patch,
    optionIds: patch.optionIds ?? current.optionIds,
    recommendations: patch.recommendations ?? current.recommendations,
    cardIdsByOption: patch.cardIdsByOption ?? current.cardIdsByOption,
  });
}
