import type {
  SubmitConsensusDecisionRequest,
  SubmitConsensusDecisionResponse,
} from "./couple.contract";
import type {
  GetProfileChecklistSummaryRequest,
  GetProfileChecklistSummaryResponse,
  SubmitDiagnosisGateChoiceRequest,
  SubmitDiagnosisGateChoiceResponse,
  SubmitProfileIntakeRequest,
  SubmitProfileIntakeResponse,
} from "./profile.contract";
import type {
  GenerateRecommendationRequest,
  GenerateRecommendationResponse,
} from "./recommendation.contract";
import type {
  CreateWardrobeComparisonSetRequest,
  CreateWardrobeComparisonSetResponse,
  ListWardrobeStyleCardsRequest,
  ListWardrobeStyleCardsResponse,
  SaveWardrobeStyleCardRequest,
  SaveWardrobeStyleCardResponse,
} from "./wardrobe.contract";

export interface ContractTypeRegistry {
  SubmitDiagnosisGateChoiceRequest: SubmitDiagnosisGateChoiceRequest;
  SubmitDiagnosisGateChoiceResponse: SubmitDiagnosisGateChoiceResponse;
  SubmitProfileIntakeRequest: SubmitProfileIntakeRequest;
  SubmitProfileIntakeResponse: SubmitProfileIntakeResponse;
  GetProfileChecklistSummaryRequest: GetProfileChecklistSummaryRequest;
  GetProfileChecklistSummaryResponse: GetProfileChecklistSummaryResponse;
  GenerateRecommendationRequest: GenerateRecommendationRequest;
  GenerateRecommendationResponse: GenerateRecommendationResponse;
  SaveWardrobeStyleCardRequest: SaveWardrobeStyleCardRequest;
  SaveWardrobeStyleCardResponse: SaveWardrobeStyleCardResponse;
  ListWardrobeStyleCardsRequest: ListWardrobeStyleCardsRequest;
  ListWardrobeStyleCardsResponse: ListWardrobeStyleCardsResponse;
  CreateWardrobeComparisonSetRequest: CreateWardrobeComparisonSetRequest;
  CreateWardrobeComparisonSetResponse: CreateWardrobeComparisonSetResponse;
  SubmitConsensusDecisionRequest: SubmitConsensusDecisionRequest;
  SubmitConsensusDecisionResponse: SubmitConsensusDecisionResponse;
}

export type ContractTypeName = keyof ContractTypeRegistry;
