import { coupleRouteRegistry } from "./couple.routes";
import { profileRouteRegistry } from "./profile.routes";
import { recommendationRouteRegistry } from "./recommendation.routes";
import type { AnyContractRoute } from "./registry.types";
import { wardrobeRouteRegistry } from "./wardrobe.routes";

export * from "./couple.routes";
export * from "./profile.routes";
export * from "./recommendation.routes";
export * from "./registry.types";
export * from "./wardrobe.routes";

export const apiContractRegistry = {
  profile: profileRouteRegistry,
  recommendation: recommendationRouteRegistry,
  couple: coupleRouteRegistry,
  wardrobe: wardrobeRouteRegistry,
} as const;

export type ApiContractRegistry = typeof apiContractRegistry;
export type ApiContractModule = keyof ApiContractRegistry;

export type ContractRouteByModule<ModuleName extends ApiContractModule> =
  ApiContractRegistry[ModuleName][keyof ApiContractRegistry[ModuleName]];

export type AnyApiContractRoute = ContractRouteByModule<ApiContractModule> & AnyContractRoute;
