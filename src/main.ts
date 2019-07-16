import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const port = process.env.PORT || 3000
  const app = await NestFactory.create(AppModule);
  await app.listen(port);
  console.log(`Server listening on ${port}`);
  console.log('Press Ctrl+C to quit.');
}
bootstrap();
