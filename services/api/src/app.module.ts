import { Module } from "@nestjs/common";

import { HealthController } from "./health/health.controller";
import { MlHealthController } from "./internal/ml-health.controller";
import { MlHealthService } from "./internal/ml-health.service";

@Module({
  controllers: [HealthController, MlHealthController],
  providers: [MlHealthService],
})
export class AppModule {}
