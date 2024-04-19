import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DifficultyService } from './service/difficulty.service';
import { StatsService } from './service/stats.service';

async function App() {
  const app = await NestFactory.create(AppModule, { cors: true });
  const difficultyService = app.get(DifficultyService);
  const statsService = app.get(StatsService);
  await difficultyService.seed();
  await statsService.seed();
  await app.listen(5556);
  console.log(`Application is running on: ${await app.getUrl()}`);
}

App();
