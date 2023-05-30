import { Module } from '@nestjs/common';
import { RoutesService } from './routes.service';
import { RoutesController } from './routes.controller';
import { HelpersModule } from "@/helpers";

@Module({
  imports: [HelpersModule],
  controllers: [RoutesController],
  providers: [RoutesService]
})
export class RoutesModule {}
