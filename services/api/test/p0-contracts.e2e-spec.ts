import {
  CoupleConflictResolutionPolicy,
  CoupleDecisionActor,
  DiagnosisGateChoice,
  DiagnosisSourceType,
  RecommendationRequestType,
  StyleCategory,
} from "@marrytone/contracts";
import { Test, type TestingModule } from "@nestjs/testing";
import { FastifyAdapter, type NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "../src/app.module";

describe("Phase2 P0 Contract Endpoints", () => {
  let app: NestFastifyApplication;

  const profileId = "profile-e2e-001";
  const coupleId = "couple-e2e-001";

  let recommendationId = "";
  let mainOptionId = "";
  let alternateOptionId = "";

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    }).compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("POST /v1/profile/diagnosis-gate stores gate choice", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/profile/diagnosis-gate",
      payload: {
        profileId,
        choice: DiagnosisGateChoice.EXPERIENCED,
        selectedAt: "2026-04-15T00:00:00.000Z",
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.profileId).toBe(profileId);
    expect(body.data.choice).toBe(DiagnosisGateChoice.EXPERIENCED);
  });

  it("POST /v1/recommendations/generate returns max 3 options and 1 main option", async () => {
    const intakeResponse = await app.inject({
      method: "POST",
      url: "/v1/profile/diagnosis-intake",
      payload: {
        profileId,
        gateChoice: DiagnosisGateChoice.EXPERIENCED,
        diagnosisInput: {
          personalColor: {
            season: "SPRING",
            tone: "BRIGHT",
            undertone: "WARM",
            confidence: 0.93,
          },
          skeleton: {
            type: "STRAIGHT",
            confidence: 0.91,
          },
          sourceType: DiagnosisSourceType.SELF_REPORTED,
        },
      },
    });

    expect(intakeResponse.statusCode).toBe(200);

    const response = await app.inject({
      method: "POST",
      url: "/v1/recommendations/generate",
      payload: {
        profileId,
        coupleId,
        requestType: RecommendationRequestType.INITIAL,
        maxOptions: 3,
        requireMainOption: true,
        categories: [StyleCategory.DRESS, StyleCategory.TUXEDO, StyleCategory.HAIR],
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.options.length).toBeLessThanOrEqual(3);
    expect(body.data.options.length).toBe(3);

    const mainOptions = body.data.options.filter((option: { isMain: boolean }) => option.isMain);
    expect(mainOptions).toHaveLength(1);
    expect(body.data.mainOptionId).toBe(mainOptions[0].optionId);

    recommendationId = body.data.recommendationId;
    mainOptionId = body.data.mainOptionId;
    alternateOptionId =
      body.data.options.find((option: { optionId: string }) => option.optionId !== mainOptionId)
        ?.optionId ?? mainOptionId;
  });

  it("POST/GET /v1/wardrobe/style-cards saves and lists cards", async () => {
    const saveResponse = await app.inject({
      method: "POST",
      url: "/v1/wardrobe/style-cards",
      payload: {
        profileId,
        recommendationId,
        optionId: mainOptionId,
        category: StyleCategory.DRESS,
        title: "Main Dress Option",
        description: "A-line silhouette for spring warm",
        tags: ["main", "spring"],
        source: "RECOMMENDATION",
        isMainOption: true,
      },
    });

    const savedBody = saveResponse.json();

    expect(saveResponse.statusCode).toBe(200);
    expect(savedBody.success).toBe(true);
    expect(savedBody.data.profileId).toBe(profileId);

    const listResponse = await app.inject({
      method: "GET",
      url: `/v1/wardrobe/style-cards?profileId=${profileId}`,
    });

    const listBody = listResponse.json();

    expect(listResponse.statusCode).toBe(200);
    expect(listBody.success).toBe(true);
    expect(listBody.data.totalCount).toBeGreaterThanOrEqual(1);
    expect(listBody.data.cards[0].profileId).toBe(profileId);
  });

  it("POST /v1/couple/consensus/confirm confirms policy A decision", async () => {
    const response = await app.inject({
      method: "POST",
      url: "/v1/couple/consensus/confirm",
      payload: {
        coupleId,
        recommendationId,
        selectedOptionId: mainOptionId,
        policy: CoupleConflictResolutionPolicy.POLICY_A,
        votes: [
          {
            actor: CoupleDecisionActor.BRIDE,
            optionId: mainOptionId,
            preferenceRank: 1,
          },
          {
            actor: CoupleDecisionActor.GROOM,
            optionId: alternateOptionId,
            preferenceRank: 1,
          },
        ],
      },
    });

    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.success).toBe(true);
    expect(body.data.appliedPolicy).toBe(CoupleConflictResolutionPolicy.POLICY_A);
    expect(body.data.selectedOptionId).toBe(mainOptionId);
    expect(body.data.latestEvent.type).toBe("POLICY_A_APPLIED");
  });
});
