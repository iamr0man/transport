import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { HelpersModule } from "@/helpers";
import { TransportsModule } from "@/core/transports/transports.module";

@Module({
  imports: [TransportsModule, HelpersModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
