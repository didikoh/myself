import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config();

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // Enable CORS
  app.enableCors({
    origin: '*', // Configure this for your specific domain in production
    methods: ['GET', 'POST'],
    allowedHeaders: ['Content-Type'],
  });

  // Set global prefix for all routes
  app.setGlobalPrefix('api');

  const config = new DocumentBuilder()
    .setTitle('Chatbot API')
    .setDescription('The API documentation for your chatbot backend')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);

  const port = process.env.PORT || 3000;
  await app.listen(port);

  console.log(`Server is running on port ${port}`);
  console.log(`API endpoints available at http://localhost:${port}/api`);
}
bootstrap();
