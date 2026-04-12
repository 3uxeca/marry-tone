import { Controller, Get, Query } from "@nestjs/common";
import type { InternalMlHealthResponse, MlSidecarHealthCheckRequest } from "@marrytone/contracts";

import { MlHealthService } from "./ml-health.service";

@Controller("internal/ml")
export class MlHealthController {
  constructor(private readonly mlHealthService: MlHealthService) {}

  @Get("health")
  async getHealth(@Query("timeoutMs") timeoutMsRaw?: string): Promise<InternalMlHealthResponse> {
    const timeoutMs = this.parseTimeoutMs(timeoutMsRaw);
    const request: MlSidecarHealthCheckRequest = typeof timeoutMs === "number" ? { timeoutMs } : {};

    return this.mlHealthService.check(request);
  }

  private parseTimeoutMs(timeoutMsRaw?: string): number | undefined {
    if (typeof timeoutMsRaw !== "string") {
      return undefined;
    }

    const parsed = Number.parseInt(timeoutMsRaw, 10);
    if (!Number.isFinite(parsed) || parsed <= 0) {
      return undefined;
    }

    return parsed;
  }
}
