import type { ApiEnvelope } from "./common-api.contract";
import type { StyleCategory } from "./style-domain.contract";

export enum WardrobeCardSource {
  RECOMMENDATION = "RECOMMENDATION",
  MANUAL = "MANUAL",
}

export enum WardrobeCardStatus {
  SAVED = "SAVED",
  ARCHIVED = "ARCHIVED",
}

export enum WardrobeCardSortOrder {
  CREATED_AT_DESC = "CREATED_AT_DESC",
  UPDATED_AT_DESC = "UPDATED_AT_DESC",
}

export enum ComparisonSetStatus {
  DRAFT = "DRAFT",
  FINALIZED = "FINALIZED",
}

export interface WardrobeStyleCard {
  cardId: string;
  profileId: string;
  recommendationId?: string;
  optionId?: string;
  category: StyleCategory;
  title: string;
  description: string;
  tags: string[];
  imageAssetId?: string;
  status: WardrobeCardStatus;
  source: WardrobeCardSource;
  isMainOption: boolean;
  createdAt: string;
  updatedAt: string;
}

export interface SaveWardrobeStyleCardRequest {
  profileId: string;
  recommendationId?: string;
  optionId?: string;
  category: StyleCategory;
  title: string;
  description: string;
  tags?: string[];
  imageAssetId?: string;
  source: WardrobeCardSource;
  isMainOption: boolean;
}

export type SaveWardrobeStyleCardResponse = ApiEnvelope<WardrobeStyleCard>;

export interface ListWardrobeStyleCardsRequest {
  profileId: string;
  status?: WardrobeCardStatus;
  category?: StyleCategory;
  sortOrder?: WardrobeCardSortOrder;
  limit?: number;
  cursor?: string;
}

export interface ListWardrobeStyleCardsPayload {
  cards: WardrobeStyleCard[];
  nextCursor?: string;
  totalCount: number;
}

export type ListWardrobeStyleCardsResponse = ApiEnvelope<ListWardrobeStyleCardsPayload>;

export interface UpdateWardrobeStyleCardRequest {
  cardId: string;
  title?: string;
  description?: string;
  tags?: string[];
  status?: WardrobeCardStatus;
  isMainOption?: boolean;
}

export type UpdateWardrobeStyleCardResponse = ApiEnvelope<WardrobeStyleCard>;

export type ComparisonSetCardIds = [string, string] | [string, string, string];

export interface WardrobeComparisonSet {
  comparisonSetId: string;
  profileId: string;
  cardIds: ComparisonSetCardIds;
  status: ComparisonSetStatus;
  createdAt: string;
}

export interface CreateWardrobeComparisonSetRequest {
  profileId: string;
  cardIds: ComparisonSetCardIds;
}

export type CreateWardrobeComparisonSetResponse = ApiEnvelope<WardrobeComparisonSet>;
