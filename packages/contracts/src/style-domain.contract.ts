export enum StyleCategory {
  DRESS = "DRESS",
  TUXEDO = "TUXEDO",
  HAIR = "HAIR",
  MAKEUP = "MAKEUP",
  SHOOT_CONCEPT = "SHOOT_CONCEPT",
  VENUE = "VENUE",
}

export enum PersonalColorSeason {
  SPRING = "SPRING",
  SUMMER = "SUMMER",
  AUTUMN = "AUTUMN",
  WINTER = "WINTER",
}

export enum PersonalColorTone {
  LIGHT = "LIGHT",
  BRIGHT = "BRIGHT",
  SOFT = "SOFT",
  MUTE = "MUTE",
  DEEP = "DEEP",
  CLEAR = "CLEAR",
}

export enum PersonalColorUndertone {
  WARM = "WARM",
  COOL = "COOL",
  NEUTRAL = "NEUTRAL",
}

export interface PersonalColorProfile {
  season: PersonalColorSeason;
  tone: PersonalColorTone;
  undertone: PersonalColorUndertone;
  confidence: number;
}

export enum SkeletonType {
  STRAIGHT = "STRAIGHT",
  WAVE = "WAVE",
  NATURAL = "NATURAL",
  MIXED = "MIXED",
}

export interface BodyMeasurementSnapshot {
  shoulderWidthCm: number;
  bustCm: number;
  waistCm: number;
  hipCm: number;
  torsoLengthCm?: number;
  legLengthCm?: number;
}

export interface SkeletonProfile {
  type: SkeletonType;
  confidence: number;
  measurements?: BodyMeasurementSnapshot;
}
