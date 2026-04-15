import { defineRoute, type ContractTypeByName } from "./registry.types";

export type ProfileGetRequest = ContractTypeByName<"ProfileGetRequest">;
export type ProfileGetResponse = ContractTypeByName<"ProfileGetResponse">;
export type ProfileUpsertRequest = ContractTypeByName<"ProfileUpsertRequest">;
export type ProfileUpsertResponse = ContractTypeByName<"ProfileUpsertResponse">;
export type ProfilePreferencePatchRequest = ContractTypeByName<"ProfilePreferencePatchRequest">;
export type ProfilePreferencePatchResponse = ContractTypeByName<"ProfilePreferencePatchResponse">;

export const profileRouteRegistry = {
  getProfile: defineRoute({
    routeId: "profile.getProfile",
    method: "GET",
    path: "/v1/profile",
    requestTypeName: "ProfileGetRequest",
    responseTypeName: "ProfileGetResponse",
  }),
  upsertProfile: defineRoute({
    routeId: "profile.upsertProfile",
    method: "PUT",
    path: "/v1/profile",
    requestTypeName: "ProfileUpsertRequest",
    responseTypeName: "ProfileUpsertResponse",
  }),
  patchPreferences: defineRoute({
    routeId: "profile.patchPreferences",
    method: "PATCH",
    path: "/v1/profile/preferences",
    requestTypeName: "ProfilePreferencePatchRequest",
    responseTypeName: "ProfilePreferencePatchResponse",
  }),
} as const;

export type ProfileRouteRegistry = typeof profileRouteRegistry;
