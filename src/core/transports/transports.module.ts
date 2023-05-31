import { Module } from '@nestjs/common';
import { HelpersModule } from "@/helpers";
import { TransportsController } from "@/core/transports/transports.controller";
import { TransportsService } from "@/core/transports/transports.service";

@Module({
  imports: [HelpersModule],
  controllers: [TransportsController],
  providers: [TransportsService],
  exports: [TransportsService]
})
export class TransportsModule {}
