import type {
  CreateWardrobeComparisonSetRequest,
  CreateWardrobeComparisonSetResponse,
  ListWardrobeStyleCardsResponse,
  SaveWardrobeStyleCardRequest,
  SaveWardrobeStyleCardResponse,
  WardrobeCardSortOrder,
  WardrobeCardStatus,
  StyleCategory,
} from "@marrytone/contracts";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from "@nestjs/common";

import { isErrorEnvelope } from "../common/api-envelope";
import { WardrobeService } from "./wardrobe.service";

type ReplyLike = {
  status(code: number): unknown;
};

@Controller("v1/wardrobe")
export class WardrobeController {
  constructor(private readonly wardrobeService: WardrobeService) {}

  @Post("style-cards")
  @HttpCode(HttpStatus.OK)
  saveStyleCard(
    @Body() body: SaveWardrobeStyleCardRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): SaveWardrobeStyleCardResponse {
    const envelope = this.wardrobeService.saveStyleCard(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }

  @Get("style-cards")
  listStyleCards(
    @Query("profileId") profileId: string,
    @Query("status") status: WardrobeCardStatus | undefined,
    @Query("category") category: StyleCategory | undefined,
    @Query("sortOrder") sortOrder: WardrobeCardSortOrder | undefined,
    @Query("limit") limit: string | undefined,
    @Query("cursor") cursor: string | undefined,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): ListWardrobeStyleCardsResponse {
    const envelope = this.wardrobeService.listStyleCards({
      profileId,
      status,
      category,
      sortOrder,
      limit: limit ? Number(limit) : undefined,
      cursor,
    });

    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }

    return envelope;
  }

  @Post("comparison-sets")
  @HttpCode(HttpStatus.OK)
  createComparisonSet(
    @Body() body: CreateWardrobeComparisonSetRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): CreateWardrobeComparisonSetResponse {
    const envelope = this.wardrobeService.createComparisonSet(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }
}
