import type { ApiEnvelope, ApiErrorEnvelope, ApiFieldValue, ApiSuccessEnvelope } from "@marrytone/contracts";

let requestSequence = 0;

function nextRequestId(): string {
  requestSequence += 1;
  return `req-${String(requestSequence).padStart(6, "0")}`;
}

function baseMeta() {
  return {
    requestId: nextRequestId(),
    timestamp: new Date().toISOString(),
    version: "p0-inmemory",
  };
}

export function successEnvelope<T>(data: T): ApiSuccessEnvelope<T> {
  return {
    success: true,
    data,
    error: null,
    meta: baseMeta(),
  };
}

export function errorEnvelope(
  code: string,
  message: string,
  details?: Record<string, ApiFieldValue>,
  retriable = false,
): ApiErrorEnvelope {
  return {
    success: false,
    data: null,
    error: {
      code,
      message,
      retriable,
      ...(details ? { details } : {}),
    },
    meta: baseMeta(),
  };
}

export function isErrorEnvelope<T>(envelope: ApiEnvelope<T>): envelope is ApiErrorEnvelope {
  return envelope.success === false;
}
