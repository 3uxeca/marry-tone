export type ApiFieldValue =
  | string
  | number
  | boolean
  | null
  | ApiFieldValue[]
  | { [key: string]: ApiFieldValue };

export interface ApiResponseMeta {
  requestId: string;
  timestamp: string;
  version?: string;
}

export interface ApiErrorPayload {
  code: string;
  message: string;
  retriable: boolean;
  details?: Record<string, ApiFieldValue>;
}

export interface ApiSuccessEnvelope<T> {
  success: true;
  data: T;
  error: null;
  meta: ApiResponseMeta;
}

export interface ApiErrorEnvelope {
  success: false;
  data: null;
  error: ApiErrorPayload;
  meta: ApiResponseMeta;
}

export type ApiEnvelope<T> = ApiSuccessEnvelope<T> | ApiErrorEnvelope;
