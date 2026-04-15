import {
  ComparisonSetStatus,
  WardrobeCardSortOrder,
  WardrobeCardStatus,
  type CreateWardrobeComparisonSetRequest,
  type CreateWardrobeComparisonSetResponse,
  type ListWardrobeStyleCardsRequest,
  type ListWardrobeStyleCardsResponse,
  type SaveWardrobeStyleCardRequest,
  type SaveWardrobeStyleCardResponse,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

import { errorEnvelope, successEnvelope } from "../common/api-envelope";
import { P0MemoryStoreService } from "../p0/p0-memory-store.service";

@Injectable()
export class WardrobeService {
  constructor(private readonly store: P0MemoryStoreService) {}

  saveStyleCard(request: SaveWardrobeStyleCardRequest): SaveWardrobeStyleCardResponse {
    if (!request.profileId || !request.category || !request.title || !request.description) {
      return errorEnvelope("BAD_REQUEST", "profileId, category, title, description are required");
    }

    const now = new Date().toISOString();
    const card = {
      cardId: this.store.nextId("card"),
      profileId: request.profileId,
      recommendationId: request.recommendationId,
      optionId: request.optionId,
      category: request.category,
      title: request.title,
      description: request.description,
      tags: request.tags ?? [],
      imageAssetId: request.imageAssetId,
      status: WardrobeCardStatus.SAVED,
      source: request.source,
      isMainOption: request.isMainOption,
      createdAt: now,
      updatedAt: now,
    };

    this.store.saveStyleCard(card);
    return successEnvelope(card);
  }

  listStyleCards(request: ListWardrobeStyleCardsRequest): ListWardrobeStyleCardsResponse {
    if (!request.profileId) {
      return errorEnvelope("BAD_REQUEST", "profileId query is required");
    }

    const sortOrder = request.sortOrder ?? WardrobeCardSortOrder.CREATED_AT_DESC;
    const offset = Number(request.cursor ?? "0");
    const limit = this.normalizeLimit(request.limit);

    let cards = [...this.store.listStyleCards(request.profileId)];

    if (request.status) {
      cards = cards.filter((card) => card.status === request.status);
    }

    if (request.category) {
      cards = cards.filter((card) => card.category === request.category);
    }

    cards.sort((a, b) => {
      if (sortOrder === WardrobeCardSortOrder.UPDATED_AT_DESC) {
        return b.updatedAt.localeCompare(a.updatedAt);
      }
      return b.createdAt.localeCompare(a.createdAt);
    });

    const page = cards.slice(offset, offset + limit);
    const hasNext = offset + limit < cards.length;

    return successEnvelope({
      cards: page,
      nextCursor: hasNext ? String(offset + limit) : undefined,
      totalCount: cards.length,
    });
  }

  createComparisonSet(
    request: CreateWardrobeComparisonSetRequest,
  ): CreateWardrobeComparisonSetResponse {
    if (!request.profileId || !request.cardIds || request.cardIds.length < 2) {
      return errorEnvelope("BAD_REQUEST", "profileId and at least two cardIds are required");
    }

    const knownCardIds = new Set(this.store.listStyleCards(request.profileId).map((card) => card.cardId));
    const hasUnknownCard = request.cardIds.some((cardId) => !knownCardIds.has(cardId));
    if (hasUnknownCard) {
      return errorEnvelope("BAD_REQUEST", "comparison set includes unknown cardId");
    }

    const set = {
      comparisonSetId: this.store.nextId("comparison"),
      profileId: request.profileId,
      cardIds: request.cardIds,
      status: ComparisonSetStatus.DRAFT,
      createdAt: new Date().toISOString(),
    };

    this.store.saveComparisonSet(set);
    return successEnvelope(set);
  }

  private normalizeLimit(limit: number | undefined): number {
    if (limit === undefined || Number.isNaN(Number(limit))) {
      return 20;
    }

    return Math.min(100, Math.max(1, Number(limit)));
  }
}
