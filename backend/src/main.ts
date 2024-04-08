import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function App() {
  const app = await NestFactory.create(AppModule, { cors: true });
  await app.listen(5556);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

App();
