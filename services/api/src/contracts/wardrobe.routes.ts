import { defineRoute, type ContractTypeByName } from "./registry.types";

export type SaveWardrobeStyleCardRequest = ContractTypeByName<"SaveWardrobeStyleCardRequest">;
export type SaveWardrobeStyleCardResponse = ContractTypeByName<"SaveWardrobeStyleCardResponse">;
export type ListWardrobeStyleCardsRequest = ContractTypeByName<"ListWardrobeStyleCardsRequest">;
export type ListWardrobeStyleCardsResponse = ContractTypeByName<"ListWardrobeStyleCardsResponse">;
export type CreateWardrobeComparisonSetRequest = ContractTypeByName<"CreateWardrobeComparisonSetRequest">;
export type CreateWardrobeComparisonSetResponse = ContractTypeByName<"CreateWardrobeComparisonSetResponse">;

export const wardrobeRouteRegistry = {
  saveStyleCard: defineRoute({
    routeId: "wardrobe.saveStyleCard",
    method: "POST",
    path: "/v1/wardrobe/style-cards",
    requestTypeName: "SaveWardrobeStyleCardRequest",
    responseTypeName: "SaveWardrobeStyleCardResponse",
  }),
  listStyleCards: defineRoute({
    routeId: "wardrobe.listStyleCards",
    method: "GET",
    path: "/v1/wardrobe/style-cards",
    requestTypeName: "ListWardrobeStyleCardsRequest",
    responseTypeName: "ListWardrobeStyleCardsResponse",
  }),
  createComparisonSet: defineRoute({
    routeId: "wardrobe.createComparisonSet",
    method: "POST",
    path: "/v1/wardrobe/comparison-sets",
    requestTypeName: "CreateWardrobeComparisonSetRequest",
    responseTypeName: "CreateWardrobeComparisonSetResponse",
  }),
} as const;

export type WardrobeRouteRegistry = typeof wardrobeRouteRegistry;
