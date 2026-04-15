import { defineRoute, type ContractTypeByName } from "./registry.types";

export type WardrobeChecklistGetRequest = ContractTypeByName<"WardrobeChecklistGetRequest">;
export type WardrobeChecklistGetResponse = ContractTypeByName<"WardrobeChecklistGetResponse">;
export type WardrobeChecklistItemPatchRequest = ContractTypeByName<"WardrobeChecklistItemPatchRequest">;
export type WardrobeChecklistItemPatchResponse = ContractTypeByName<"WardrobeChecklistItemPatchResponse">;
export type WardrobeVenueConfirmRequest = ContractTypeByName<"WardrobeVenueConfirmRequest">;
export type WardrobeVenueConfirmResponse = ContractTypeByName<"WardrobeVenueConfirmResponse">;

export const wardrobeRouteRegistry = {
  getChecklist: defineRoute({
    routeId: "wardrobe.getChecklist",
    method: "GET",
    path: "/v1/wardrobe/checklist",
    requestTypeName: "WardrobeChecklistGetRequest",
    responseTypeName: "WardrobeChecklistGetResponse",
  }),
  patchChecklistItem: defineRoute({
    routeId: "wardrobe.patchChecklistItem",
    method: "PATCH",
    path: "/v1/wardrobe/checklist/:itemId",
    requestTypeName: "WardrobeChecklistItemPatchRequest",
    responseTypeName: "WardrobeChecklistItemPatchResponse",
  }),
  confirmVenue: defineRoute({
    routeId: "wardrobe.confirmVenue",
    method: "POST",
    path: "/v1/wardrobe/venue",
    requestTypeName: "WardrobeVenueConfirmRequest",
    responseTypeName: "WardrobeVenueConfirmResponse",
  }),
} as const;

export type WardrobeRouteRegistry = typeof wardrobeRouteRegistry;
