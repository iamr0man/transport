import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportsModule } from './core/transports/transports.module';
import { RoutesModule } from './core/routes/routes.module';

@Module({
  imports: [TransportsModule, RoutesModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
