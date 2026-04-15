import { Module } from "@nestjs/common";

import { MlDiagnosisService } from "../internal/ml-diagnosis.service";
import { ProfileController } from "./profile.controller";
import { ProfileService } from "./profile.service";

@Module({
  controllers: [ProfileController],
  providers: [ProfileService, MlDiagnosisService],
  exports: [ProfileService],
})
export class ProfileModule {}
