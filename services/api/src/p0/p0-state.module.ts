import { Global, Module } from "@nestjs/common";

import { P0MemoryStoreService } from "./p0-memory-store.service";

@Global()
@Module({
  providers: [P0MemoryStoreService],
  exports: [P0MemoryStoreService],
})
export class P0StateModule {}
