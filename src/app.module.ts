import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TransportsModule } from './core/transports/transports.module';

@Module({
  imports: [TransportsModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
