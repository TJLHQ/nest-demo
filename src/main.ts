import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from './middle/logger.middleware';
import { XmlMiddle } from './middleware/xml.middle';
import { HttpExpitionFilter } from './filters/httpExpition';
import { DataInterceptor } from './interceptor/dataInterceptor';
import { AuthGuard } from './guard/guard';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('/api')
  app.use(Logger)
  app.use(new XmlMiddle().use)
  app.useGlobalFilters(new HttpExpitionFilter())
  // app.useGlobalGuards(new AuthGuard())
  await app.listen(3000);
}
bootstrap();
