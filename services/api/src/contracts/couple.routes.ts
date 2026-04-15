import { defineRoute, type ContractTypeByName } from "./registry.types";

export type SubmitConsensusDecisionRequest = ContractTypeByName<"SubmitConsensusDecisionRequest">;
export type SubmitConsensusDecisionResponse = ContractTypeByName<"SubmitConsensusDecisionResponse">;

export const coupleRouteRegistry = {
  confirmConsensus: defineRoute({
    routeId: "couple.confirmConsensus",
    method: "POST",
    path: "/v1/couple/consensus/confirm",
    requestTypeName: "SubmitConsensusDecisionRequest",
    responseTypeName: "SubmitConsensusDecisionResponse",
  }),
} as const;

export type CoupleRouteRegistry = typeof coupleRouteRegistry;
