import { Controller, Get } from "@nestjs/common";

interface ApiHealthResponse {
  status: "ok";
  service: "api";
  timestamp: string;
  uptimeSeconds: number;
}

@Controller()
export class HealthController {
  @Get("health")
  getHealth(): ApiHealthResponse {
    return {
      status: "ok",
      service: "api",
      timestamp: new Date().toISOString(),
      uptimeSeconds: Math.floor(process.uptime()),
    };
  }
}
