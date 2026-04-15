import type {
  GetProfileChecklistSummaryResponse,
  SubmitDiagnosisGateChoiceRequest,
  SubmitDiagnosisGateChoiceResponse,
  SubmitProfileIntakeRequest,
  SubmitProfileIntakeResponse,
} from "@marrytone/contracts";
import { Body, Controller, Get, HttpCode, HttpStatus, Post, Query, Res } from "@nestjs/common";

import { isErrorEnvelope } from "../common/api-envelope";
import { ProfileService } from "./profile.service";

type ReplyLike = {
  status(code: number): unknown;
};

@Controller("v1/profile")
export class ProfileController {
  constructor(private readonly profileService: ProfileService) {}

  @Post("diagnosis-gate")
  @HttpCode(HttpStatus.OK)
  submitDiagnosisGate(
    @Body() body: SubmitDiagnosisGateChoiceRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): SubmitDiagnosisGateChoiceResponse {
    const envelope = this.profileService.submitDiagnosisGate(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }

  @Post("diagnosis-intake")
  @HttpCode(HttpStatus.OK)
  submitDiagnosisIntake(
    @Body() body: SubmitProfileIntakeRequest,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): SubmitProfileIntakeResponse {
    const envelope = this.profileService.submitProfileIntake(body);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }

  @Get("checklist")
  getChecklist(
    @Query("profileId") profileId: string,
    @Res({ passthrough: true }) reply: ReplyLike,
  ): GetProfileChecklistSummaryResponse {
    const envelope = this.profileService.getChecklistSummary(profileId);
    if (isErrorEnvelope(envelope)) {
      reply.status(HttpStatus.BAD_REQUEST);
    }
    return envelope;
  }
}
