import { configure as serverlessExpress } from '@vendia/serverless-express';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

let cachedServer;

export const handler = async (event, context) => {
	if (!cachedServer) {
		const nestApp = await NestFactory.create(AppModule);

		nestApp.enableCors({
			origin: 'https://fascinating-mandazi-5a3948.netlify.app',
			credentials: true,
		});
		await nestApp.init();
		cachedServer = serverlessExpress({
			app: nestApp.getHttpAdapter().getInstance(),
		});
	}

	return cachedServer(event, context);
};