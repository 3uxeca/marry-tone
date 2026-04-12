export const mlSidecarHealthStates = ["ok", "degraded", "down"] as const;

export type MlSidecarHealthState = (typeof mlSidecarHealthStates)[number];

export interface MlSidecarHealthCheckRequest {
  timeoutMs?: number;
}

export interface MlSidecarHealthCheckResponse {
  service: "ml-sidecar";
  status: MlSidecarHealthState;
  timestamp: string;
  version?: string;
  latencyMs?: number;
  error?: string;
  details?: Record<string, boolean | number | string | null>;
}

export interface InternalMlHealthResponse {
  status: "ok" | "degraded";
  checkedAt: string;
  sidecar: MlSidecarHealthCheckResponse;
}
