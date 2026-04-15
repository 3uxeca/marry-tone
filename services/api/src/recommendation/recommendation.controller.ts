import type {
  GenerateRecommendationRequest,
  GenerateRecommendationResponse,
} from "@marrytone/contracts";
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";

import { isErrorEnvelope } from "../common/api-envelope";
import { RecommendationService } from "./recommendation.service";

type ReplyLike = {
  status(code: number): unknown;
};

@Controller("v1/recommendations")
export class RecommendationController {
  constructor(private readonly recommendationService: RecommendationService) {}

  @Post("generate")
  @HttpCode(HttpStatus.OK)
  generate(
    @Body() body: GenerateRecommendationRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): GenerateRecommendationResponse {
    const envelope = this.recommendationService.generate(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }
}
