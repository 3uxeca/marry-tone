import { Injectable } from "@nestjs/common";
import type {
  InternalMlHealthResponse,
  MlSidecarHealthCheckRequest,
  MlSidecarHealthCheckResponse,
  MlSidecarHealthState,
} from "@marrytone/contracts";

@Injectable()
export class MlHealthService {
  private readonly defaultTimeoutMs = Number.parseInt(process.env.ML_HEALTH_TIMEOUT_MS ?? "1500", 10);
  private readonly sidecarHealthUrl = process.env.ML_SIDECAR_HEALTH_URL ?? "http://localhost:8000/health";

  async check(request: MlSidecarHealthCheckRequest = {}): Promise<InternalMlHealthResponse> {
    const checkedAt = new Date().toISOString();
    const timeoutMs = this.resolveTimeoutMs(request.timeoutMs);
    const startedAt = Date.now();

    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), timeoutMs);

    try {
      const response = await fetch(this.sidecarHealthUrl, {
        method: "GET",
        signal: controller.signal,
        headers: {
          accept: "application/json",
        },
      });

      const latencyMs = Date.now() - startedAt;
      if (!response.ok) {
        return {
          status: "degraded",
          checkedAt,
          sidecar: {
            service: "ml-sidecar",
            status: "down",
            timestamp: checkedAt,
            latencyMs,
            error: `ML sidecar returned ${response.status}`,
          },
        };
      }

      const body = await this.readJson(response);
      const sidecarStatus = this.pickSidecarStatus(body);
      const sidecarResponse: MlSidecarHealthCheckResponse = {
        service: "ml-sidecar",
        status: sidecarStatus,
        timestamp: this.pickString(body, "timestamp") ?? checkedAt,
        version: this.pickString(body, "version"),
        latencyMs,
        details: this.pickDetails(body),
      };

      return {
        status: sidecarStatus === "ok" ? "ok" : "degraded",
        checkedAt,
        sidecar: sidecarResponse,
      };
    } catch (error) {
      return {
        status: "degraded",
        checkedAt,
        sidecar: {
          service: "ml-sidecar",
          status: "down",
          timestamp: checkedAt,
          latencyMs: Date.now() - startedAt,
          error: this.formatError(error),
        },
      };
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private resolveTimeoutMs(timeoutMs?: number): number {
    if (typeof timeoutMs === "number" && Number.isFinite(timeoutMs) && timeoutMs > 0) {
      return Math.min(timeoutMs, 10_000);
    }

    if (Number.isFinite(this.defaultTimeoutMs) && this.defaultTimeoutMs > 0) {
      return Math.min(this.defaultTimeoutMs, 10_000);
    }

    return 1_500;
  }

  private async readJson(response: Response): Promise<unknown> {
    try {
      return (await response.json()) as unknown;
    } catch {
      return null;
    }
  }

  private pickSidecarStatus(payload: unknown): MlSidecarHealthState {
    if (this.pickString(payload, "status") === "ok") {
      return "ok";
    }

    if (this.pickString(payload, "status") === "degraded") {
      return "degraded";
    }

    if (this.pickString(payload, "status") === "down") {
      return "down";
    }

    return "ok";
  }

  private pickDetails(payload: unknown): Record<string, boolean | number | string | null> | undefined {
    if (!this.isRecord(payload)) {
      return undefined;
    }

    const rawDetails = payload.details;
    if (!this.isRecord(rawDetails)) {
      return undefined;
    }

    const detailsEntries = Object.entries(rawDetails).filter((entry) => this.isSerializableDetail(entry[1]));
    if (detailsEntries.length === 0) {
      return undefined;
    }

    return Object.fromEntries(detailsEntries) as Record<string, boolean | number | string | null>;
  }

  private pickString(payload: unknown, key: string): string | undefined {
    if (!this.isRecord(payload)) {
      return undefined;
    }

    const value = payload[key];
    return typeof value === "string" ? value : undefined;
  }

  private formatError(error: unknown): string {
    if (error instanceof Error) {
      return error.message;
    }

    return "Unknown ML sidecar health check failure";
  }

  private isSerializableDetail(value: unknown): value is boolean | number | string | null {
    return (
      value === null ||
      typeof value === "boolean" ||
      typeof value === "number" ||
      typeof value === "string"
    );
  }

  private isRecord(value: unknown): value is Record<string, unknown> {
    return typeof value === "object" && value !== null;
  }
}
