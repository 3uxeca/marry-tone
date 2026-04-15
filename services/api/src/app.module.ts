import { Module } from "@nestjs/common";

import { CoupleModule } from "./couple/couple.module";
import { HealthController } from "./health/health.controller";
import { MlHealthController } from "./internal/ml-health.controller";
import { MlHealthService } from "./internal/ml-health.service";
import { P0StateModule } from "./p0/p0-state.module";
import { ProfileModule } from "./profile/profile.module";
import { RecommendationModule } from "./recommendation/recommendation.module";
import { WardrobeModule } from "./wardrobe/wardrobe.module";

@Module({
  imports: [
    P0StateModule,
    ProfileModule,
    RecommendationModule,
    WardrobeModule,
    CoupleModule,
  ],
  controllers: [HealthController, MlHealthController],
  providers: [MlHealthService],
})
export class AppModule {}
