import { defineRoute, type ContractTypeByName } from "./registry.types";

export type GenerateRecommendationRequest = ContractTypeByName<"GenerateRecommendationRequest">;
export type GenerateRecommendationResponse = ContractTypeByName<"GenerateRecommendationResponse">;

export const recommendationRouteRegistry = {
  generate: defineRoute({
    routeId: "recommendation.generateRecommendation",
    method: "POST",
    path: "/v1/recommendations/generate",
    requestTypeName: "GenerateRecommendationRequest",
    responseTypeName: "GenerateRecommendationResponse",
  }),
} as const;

export type RecommendationRouteRegistry = typeof recommendationRouteRegistry;
