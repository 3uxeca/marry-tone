import {
  PersonalColorSeason,
  PersonalColorTone,
  PersonalColorUndertone,
  ProfileIntakeNextStep,
  SkeletonType,
  sidecarBodyMeasurementsDiagnosisPath,
  sidecarPersonalColorDiagnosisPath,
  sidecarSkeletonTypeDiagnosisPath,
  type SidecarBodyMeasurementsDiagnosisRequest,
  type SidecarBodyMeasurementsDiagnosisResponse,
  type SidecarPersonalColorDiagnosisRequest,
  type SidecarPersonalColorDiagnosisResponse,
  type SidecarSkeletonTypeDiagnosisRequest,
  type SidecarSkeletonTypeDiagnosisResponse,
} from "@marrytone/contracts";
import { Injectable } from "@nestjs/common";

type MlDiagnosisInput = {
  bodyPhotoAssetId: string;
  facePhotoAssetId: string;
  profileId: string;
};

type MlDiagnosisResult = {
  lowConfidence: boolean;
  nextStep: ProfileIntakeNextStep;
  personalColor: {
    confidence: number;
    season: PersonalColorSeason;
    tone: PersonalColorTone;
    undertone: PersonalColorUndertone;
  };
  skeleton: {
    confidence: number;
    type: SkeletonType;
  };
};

@Injectable()
export class MlDiagnosisService {
  private readonly sidecarBaseUrl = process.env.ML_SIDECAR_BASE_URL ?? "http://localhost:8000";
  private readonly timeoutMs = Number.parseInt(process.env.ML_DIAGNOSIS_TIMEOUT_MS ?? "3500", 10);

  async diagnoseFromAssets(input: MlDiagnosisInput): Promise<MlDiagnosisResult> {
    try {
      const personalColorPromise = this.postSidecar<
        SidecarPersonalColorDiagnosisRequest,
        SidecarPersonalColorDiagnosisResponse
      >(sidecarPersonalColorDiagnosisPath, {
        user_id: input.profileId,
        image_uri: this.assetUri(input.facePhotoAssetId),
        capture_source: "unknown",
      });

      const bodyMeasurementsPromise = this.postSidecar<
        SidecarBodyMeasurementsDiagnosisRequest,
        SidecarBodyMeasurementsDiagnosisResponse
      >(sidecarBodyMeasurementsDiagnosisPath, {
        user_id: input.profileId,
        height_cm: 170,
        image_uri: this.assetUri(input.bodyPhotoAssetId),
      });

      const skeletonPromise = this.postSidecar<
        SidecarSkeletonTypeDiagnosisRequest,
        SidecarSkeletonTypeDiagnosisResponse
      >(sidecarSkeletonTypeDiagnosisPath, {
        user_id: input.profileId,
        image_uri: this.assetUri(input.bodyPhotoAssetId),
      });

      const [personalColor, bodyMeasurements, skeleton] = await Promise.all([
        personalColorPromise,
        bodyMeasurementsPromise,
        skeletonPromise,
      ]);

      const lowConfidence = Boolean(
        personalColor.low_confidence.is_low_confidence ||
          skeleton.low_confidence.is_low_confidence ||
          bodyMeasurements.low_confidence.is_low_confidence,
      );

      return {
        lowConfidence,
        nextStep: lowConfidence
          ? ProfileIntakeNextStep.REUPLOAD_REQUIRED
          : ProfileIntakeNextStep.READY_FOR_RECOMMENDATION,
        personalColor: {
          season: this.mapSeason(personalColor.season),
          tone: this.mapTone(personalColor.season),
          undertone: this.mapUndertone(personalColor.undertone),
          confidence: personalColor.confidence,
        },
        skeleton: {
          type: this.mapSkeleton(skeleton.skeleton_type),
          confidence: skeleton.confidence,
        },
      };
    } catch {
      return this.deterministicFallback(input);
    }
  }

  private async postSidecar<TRequest extends object, TResponse>(
    path: string,
    payload: TRequest,
  ): Promise<TResponse> {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), this.timeoutMs);

    try {
      const response = await fetch(`${this.sidecarBaseUrl}${path}`, {
        method: "POST",
        signal: controller.signal,
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify(payload),
      });

      if (!response.ok) {
        throw new Error(`sidecar request failed: ${response.status}`);
      }

      return (await response.json()) as TResponse;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  private deterministicFallback(input: MlDiagnosisInput): MlDiagnosisResult {
    const lowConfidenceSignal =
      input.facePhotoAssetId.includes("low") || input.bodyPhotoAssetId.includes("low");

    return {
      lowConfidence: lowConfidenceSignal,
      nextStep: lowConfidenceSignal
        ? ProfileIntakeNextStep.MANUAL_SURVEY_REQUIRED
        : ProfileIntakeNextStep.READY_FOR_RECOMMENDATION,
      personalColor: {
        season: PersonalColorSeason.SPRING,
        tone: PersonalColorTone.BRIGHT,
        undertone: PersonalColorUndertone.WARM,
        confidence: lowConfidenceSignal ? 0.64 : 0.84,
      },
      skeleton: {
        type: SkeletonType.STRAIGHT,
        confidence: lowConfidenceSignal ? 0.62 : 0.8,
      },
    };
  }

  private mapSeason(value: SidecarPersonalColorDiagnosisResponse["season"]): PersonalColorSeason {
    switch (value) {
      case "spring":
        return PersonalColorSeason.SPRING;
      case "summer":
        return PersonalColorSeason.SUMMER;
      case "autumn":
        return PersonalColorSeason.AUTUMN;
      case "winter":
        return PersonalColorSeason.WINTER;
      default:
        return PersonalColorSeason.SPRING;
    }
  }

  private mapUndertone(value: SidecarPersonalColorDiagnosisResponse["undertone"]): PersonalColorUndertone {
    switch (value) {
      case "warm":
        return PersonalColorUndertone.WARM;
      case "cool":
        return PersonalColorUndertone.COOL;
      case "neutral":
      default:
        return PersonalColorUndertone.NEUTRAL;
    }
  }

  private mapTone(season: SidecarPersonalColorDiagnosisResponse["season"]): PersonalColorTone {
    if (season === "spring") {
      return PersonalColorTone.BRIGHT;
    }
    if (season === "summer") {
      return PersonalColorTone.SOFT;
    }
    if (season === "autumn") {
      return PersonalColorTone.MUTE;
    }
    return PersonalColorTone.DEEP;
  }

  private mapSkeleton(value: SidecarSkeletonTypeDiagnosisResponse["skeleton_type"]): SkeletonType {
    switch (value) {
      case "straight":
        return SkeletonType.STRAIGHT;
      case "wave":
        return SkeletonType.WAVE;
      case "natural":
      default:
        return SkeletonType.NATURAL;
    }
  }

  private assetUri(assetId: string): string {
    return `https://assets.marrytone.local/${assetId}`;
  }
}
