import { defineRoute, type ContractTypeByName } from "./registry.types";

export type SubmitDiagnosisGateChoiceRequest = ContractTypeByName<"SubmitDiagnosisGateChoiceRequest">;
export type SubmitDiagnosisGateChoiceResponse = ContractTypeByName<"SubmitDiagnosisGateChoiceResponse">;
export type SubmitProfileIntakeRequest = ContractTypeByName<"SubmitProfileIntakeRequest">;
export type SubmitProfileIntakeResponse = ContractTypeByName<"SubmitProfileIntakeResponse">;
export type GetProfileChecklistSummaryRequest = ContractTypeByName<"GetProfileChecklistSummaryRequest">;
export type GetProfileChecklistSummaryResponse = ContractTypeByName<"GetProfileChecklistSummaryResponse">;

export const profileRouteRegistry = {
  submitDiagnosisGateChoice: defineRoute({
    routeId: "profile.submitDiagnosisGateChoice",
    method: "POST",
    path: "/v1/profile/diagnosis-gate",
    requestTypeName: "SubmitDiagnosisGateChoiceRequest",
    responseTypeName: "SubmitDiagnosisGateChoiceResponse",
  }),
  submitProfileIntake: defineRoute({
    routeId: "profile.submitProfileIntake",
    method: "POST",
    path: "/v1/profile/diagnosis-intake",
    requestTypeName: "SubmitProfileIntakeRequest",
    responseTypeName: "SubmitProfileIntakeResponse",
  }),
  getChecklistSummary: defineRoute({
    routeId: "profile.getChecklistSummary",
    method: "GET",
    path: "/v1/profile/checklist",
    requestTypeName: "GetProfileChecklistSummaryRequest",
    responseTypeName: "GetProfileChecklistSummaryResponse",
  }),
} as const;

export type ProfileRouteRegistry = typeof profileRouteRegistry;
