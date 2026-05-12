import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Cấu hình cho API
  app.enableCors({
    origin: ['http://localhost:5173', 'http://localhost:8081'], // Các cổng được mở cho BE
    methods: 'GET, HEAD, PUT, PATCH,  POST, DELETE',
    credential: true, // Bật cho cookie/session
  })

  // Thiết lập cổng: 
  app.setGlobalPrefix('api');
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
