"use client";

type ApiErrorPayload = {
  code: string;
  message: string;
  retriable: boolean;
};

type ApiEnvelope<TData> =
  | {
      success: true;
      data: TData;
      error: null;
    }
  | {
      success: false;
      data: null;
      error: ApiErrorPayload;
    };

type GateChoice = "EXPERIENCED" | "NOT_EXPERIENCED";

export type ChecklistItem = {
  key: string;
  label: string;
  status: "PENDING" | "COMPLETED";
  completedAt?: string;
};

type RecommendationOption = {
  optionId: string;
  rank: 1 | 2 | 3;
  isMain: boolean;
  summary: string;
  suggestions: Array<{
    category: string;
    title: string;
    description: string;
    tags: string[];
  }>;
};

type GatePayload = {
  profileId: string;
  choice: GateChoice;
  requiresImageUpload: boolean;
  nextStep: string;
};

type IntakePayload = {
  profileId: string;
  intakeId: string;
  status: string;
  nextStep: string;
  diagnosisSummary: {
    personalColor?: {
      season: string;
      tone: string;
      undertone: string;
      confidence: number;
    };
    skeleton?: {
      type: string;
      confidence: number;
    };
    sourceType: string;
  };
};

type RecommendationPayload = {
  recommendationId: string;
  profileId: string;
  coupleId: string;
  status: string;
  mainOptionId: string | null;
  options: RecommendationOption[];
};

type ChecklistPayload = {
  profileId: string;
  totalItems: number;
  completedItems: number;
  completionRate: number;
  isCompleted: boolean;
  items: ChecklistItem[];
};

type StyleCardPayload = {
  cardId: string;
  optionId?: string;
  title: string;
  category: string;
};

type ComparisonSetPayload = {
  comparisonSetId: string;
  profileId: string;
  cardIds: string[];
  status: string;
  createdAt: string;
};

type ConsensusPayload = {
  decisionId: string;
  coupleId: string;
  recommendationId: string;
  selectedOptionId: string;
  status: string;
  latestEvent: {
    type: string;
    note?: string;
  };
};

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000").replace(/\/$/, "");

async function requestApi<TResponse>(path: string, init?: RequestInit): Promise<ApiEnvelope<TResponse>> {
  const response = await fetch(`${API_BASE_URL}${path}`, {
    cache: "no-store",
    headers: {
      "content-type": "application/json",
      accept: "application/json",
      ...(init?.headers ?? {}),
    },
    ...init,
  });

  const parsed = (await response.json()) as ApiEnvelope<TResponse>;
  if (!response.ok && parsed.success) {
    return {
      success: false,
      data: null,
      error: {
        code: "HTTP_ERROR",
        message: `Request failed with status ${response.status}`,
        retriable: response.status >= 500,
      },
    };
  }

  return parsed;
}

export async function submitDiagnosisGate(profileId: string, choice: GateChoice): Promise<ApiEnvelope<GatePayload>> {
  return requestApi<GatePayload>("/v1/profile/diagnosis-gate", {
    method: "POST",
    body: JSON.stringify({
      profileId,
      choice,
      selectedAt: new Date().toISOString(),
    }),
  });
}

export async function submitExperiencedIntake(input: {
  profileId: string;
  season: string;
  tone: string;
  undertone: string;
  skeletonType: string;
}): Promise<ApiEnvelope<IntakePayload>> {
  return requestApi<IntakePayload>("/v1/profile/diagnosis-intake", {
    method: "POST",
    body: JSON.stringify({
      profileId: input.profileId,
      gateChoice: "EXPERIENCED",
      diagnosisInput: {
        personalColor: {
          season: input.season,
          tone: input.tone,
          undertone: input.undertone,
          confidence: 0.88,
        },
        skeleton: {
          type: input.skeletonType,
          confidence: 0.84,
        },
        sourceType: "SELF_REPORTED",
      },
    }),
  });
}

export async function submitPhotoIntake(input: {
  profileId: string;
  facePhotoAssetId: string;
  bodyPhotoAssetId: string;
}): Promise<ApiEnvelope<IntakePayload>> {
  return requestApi<IntakePayload>("/v1/profile/diagnosis-intake", {
    method: "POST",
    body: JSON.stringify({
      profileId: input.profileId,
      gateChoice: "NOT_EXPERIENCED",
      diagnosisInput: {
        facePhotoAssetId: input.facePhotoAssetId,
        bodyPhotoAssetId: input.bodyPhotoAssetId,
        encryptionNoticeAccepted: true,
        sourceType: "AUTO_ANALYZED",
      },
      lowConfidencePolicy: "POLICY_C_REUPLOAD_THEN_MANUAL",
    }),
  });
}

export async function generateRecommendations(input: {
  profileId: string;
  coupleId: string;
  isRegenerate: boolean;
}): Promise<ApiEnvelope<RecommendationPayload>> {
  return requestApi<RecommendationPayload>("/v1/recommendations/generate", {
    method: "POST",
    body: JSON.stringify({
      profileId: input.profileId,
      coupleId: input.coupleId,
      requestType: input.isRegenerate ? "REGENERATE" : "INITIAL",
      maxOptions: 3,
      requireMainOption: true,
      categories: ["DRESS", "TUXEDO", "HAIR", "MAKEUP", "SHOOT_CONCEPT", "VENUE"],
    }),
  });
}

export async function saveStyleCard(input: {
  profileId: string;
  recommendationId: string;
  optionId: string;
  title: string;
  description: string;
  tags: string[];
  isMainOption: boolean;
}): Promise<ApiEnvelope<StyleCardPayload>> {
  return requestApi<StyleCardPayload>("/v1/wardrobe/style-cards", {
    method: "POST",
    body: JSON.stringify({
      profileId: input.profileId,
      recommendationId: input.recommendationId,
      optionId: input.optionId,
      category: "DRESS",
      title: input.title,
      description: input.description,
      tags: input.tags,
      source: "RECOMMENDATION",
      isMainOption: input.isMainOption,
    }),
  });
}

export async function createComparisonSet(input: {
  profileId: string;
  cardIds: [string, string] | [string, string, string];
}): Promise<ApiEnvelope<ComparisonSetPayload>> {
  return requestApi<ComparisonSetPayload>("/v1/wardrobe/comparison-sets", {
    method: "POST",
    body: JSON.stringify({
      profileId: input.profileId,
      cardIds: input.cardIds,
    }),
  });
}

export async function submitConsensus(input: {
  coupleId: string;
  recommendationId: string;
  selectedOptionId: string;
  votes: Array<{ actor: "BRIDE" | "GROOM"; optionId: string; preferenceRank: 1 | 2 | 3; reason?: string }>;
}): Promise<ApiEnvelope<ConsensusPayload>> {
  return requestApi<ConsensusPayload>("/v1/couple/consensus/confirm", {
    method: "POST",
    body: JSON.stringify({
      coupleId: input.coupleId,
      recommendationId: input.recommendationId,
      selectedOptionId: input.selectedOptionId,
      policy: "POLICY_A",
      votes: input.votes,
    }),
  });
}

export async function fetchChecklist(profileId: string): Promise<ApiEnvelope<ChecklistPayload>> {
  return requestApi<ChecklistPayload>(`/v1/profile/checklist?profileId=${encodeURIComponent(profileId)}`, {
    method: "GET",
    headers: {
      accept: "application/json",
    },
  });
}
