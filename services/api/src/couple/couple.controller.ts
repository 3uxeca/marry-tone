import type {
  SubmitConsensusDecisionRequest,
  SubmitConsensusDecisionResponse,
} from "@marrytone/contracts";
import { Body, Controller, HttpCode, HttpStatus, Post, Res } from "@nestjs/common";

import { isErrorEnvelope } from "../common/api-envelope";
import { CoupleService } from "./couple.service";

type ReplyLike = {
  status(code: number): unknown;
};

@Controller("v1/couple")
export class CoupleController {
  constructor(private readonly coupleService: CoupleService) {}

  @Post("consensus/confirm")
  @HttpCode(HttpStatus.OK)
  confirmConsensus(
    @Body() body: SubmitConsensusDecisionRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): SubmitConsensusDecisionResponse {
    const envelope = this.coupleService.confirmConsensus(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(envelope.error.code === "NOT_FOUND" ? HttpStatus.NOT_FOUND : HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }
}
