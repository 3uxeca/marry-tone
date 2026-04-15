import { defineRoute, type ContractTypeByName } from "./registry.types";

export type CouplePreferenceGetRequest = ContractTypeByName<"CouplePreferenceGetRequest">;
export type CouplePreferenceGetResponse = ContractTypeByName<"CouplePreferenceGetResponse">;
export type CouplePreferenceUpsertRequest = ContractTypeByName<"CouplePreferenceUpsertRequest">;
export type CouplePreferenceUpsertResponse = ContractTypeByName<"CouplePreferenceUpsertResponse">;
export type CoupleConsensusCreateRequest = ContractTypeByName<"CoupleConsensusCreateRequest">;
export type CoupleConsensusCreateResponse = ContractTypeByName<"CoupleConsensusCreateResponse">;

export const coupleRouteRegistry = {
  getPreferences: defineRoute({
    routeId: "couple.getPreferences",
    method: "GET",
    path: "/v1/couple/preferences",
    requestTypeName: "CouplePreferenceGetRequest",
    responseTypeName: "CouplePreferenceGetResponse",
  }),
  upsertPreferences: defineRoute({
    routeId: "couple.upsertPreferences",
    method: "PUT",
    path: "/v1/couple/preferences",
    requestTypeName: "CouplePreferenceUpsertRequest",
    responseTypeName: "CouplePreferenceUpsertResponse",
  }),
  createConsensus: defineRoute({
    routeId: "couple.createConsensus",
    method: "POST",
    path: "/v1/couple/consensus",
    requestTypeName: "CoupleConsensusCreateRequest",
    responseTypeName: "CoupleConsensusCreateResponse",
  }),
} as const;

export type CoupleRouteRegistry = typeof coupleRouteRegistry;
