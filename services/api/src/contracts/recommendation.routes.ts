import { defineRoute, type ContractTypeByName } from "./registry.types";

export type RecommendationGenerateRequest = ContractTypeByName<"RecommendationGenerateRequest">;
export type RecommendationGenerateResponse = ContractTypeByName<"RecommendationGenerateResponse">;
export type RecommendationRetryRequest = ContractTypeByName<"RecommendationRetryRequest">;
export type RecommendationRetryResponse = ContractTypeByName<"RecommendationRetryResponse">;
export type RecommendationLatestRequest = ContractTypeByName<"RecommendationLatestRequest">;
export type RecommendationLatestResponse = ContractTypeByName<"RecommendationLatestResponse">;

export const recommendationRouteRegistry = {
  generateRecommendation: defineRoute({
    routeId: "recommendation.generateRecommendation",
    method: "POST",
    path: "/v1/recommendations",
    requestTypeName: "RecommendationGenerateRequest",
    responseTypeName: "RecommendationGenerateResponse",
  }),
  retryRecommendation: defineRoute({
    routeId: "recommendation.retryRecommendation",
    method: "POST",
    path: "/v1/recommendations/retry",
    requestTypeName: "RecommendationRetryRequest",
    responseTypeName: "RecommendationRetryResponse",
  }),
  getLatestRecommendation: defineRoute({
    routeId: "recommendation.getLatestRecommendation",
    method: "GET",
    path: "/v1/recommendations/latest",
    requestTypeName: "RecommendationLatestRequest",
    responseTypeName: "RecommendationLatestResponse",
  }),
} as const;

export type RecommendationRouteRegistry = typeof recommendationRouteRegistry;
