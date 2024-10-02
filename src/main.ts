import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
    const app = await NestFactory.create(AppModule);

    // Swagger configuration
    const config = new DocumentBuilder()
        .setTitle('Todo API')
        .setDescription('The Todo API description')
        .setVersion('1.0')
        .addBearerAuth({ type: 'http', scheme: 'bearer', bearerFormat: 'JWT' }, 'access-token') // Ensure this matches the token used in requests
        .build();


    const document = SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('api', app, document); // Setup Swagger UI at `/api`

    await app.listen(3000);
}

bootstrap();
