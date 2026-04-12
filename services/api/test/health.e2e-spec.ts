import { Test, TestingModule } from "@nestjs/testing";
import { FastifyAdapter, NestFastifyApplication } from "@nestjs/platform-fastify";

import { AppModule } from "../src/app.module";
import { MlHealthService } from "../src/internal/ml-health.service";

describe("Phase0 Health Endpoints", () => {
  let app: NestFastifyApplication;

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(MlHealthService)
      .useValue({
        check: async () => ({
          status: "ok",
          checkedAt: new Date().toISOString(),
          sidecar: {
            service: "ml-sidecar",
            status: "ok",
            timestamp: new Date().toISOString(),
          },
        }),
      })
      .compile();

    app = moduleFixture.createNestApplication<NestFastifyApplication>(new FastifyAdapter());
    await app.init();
    await app.getHttpAdapter().getInstance().ready();
  });

  afterAll(async () => {
    await app.close();
  });

  it("GET /health returns api health", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/health",
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.service).toBe("api");
  });

  it("GET /internal/ml/health returns sidecar health envelope", async () => {
    const response = await app.inject({
      method: "GET",
      url: "/internal/ml/health",
    });
    const body = response.json();

    expect(response.statusCode).toBe(200);
    expect(body.status).toBe("ok");
    expect(body.sidecar.service).toBe("ml-sidecar");
  });
});
