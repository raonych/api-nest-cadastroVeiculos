import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { RateLimitMiddleware } from './common/middleware/rate-limit.middleware';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const rateLimitMiddleware = new RateLimitMiddleware;
  app.use(rateLimitMiddleware.use.bind(rateLimitMiddleware));
  
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
