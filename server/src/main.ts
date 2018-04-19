import { NestFactory } from '@nestjs/core';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import { ApplicationModule } from './app.module';
import { LoggingInterceptor } from './interceptors/logging.interceptor';
import { ValidationPipe } from '@nestjs/common';
import { TransformInterceptor } from './interceptors/transform.interceptor';
import { AppModule } from './app/app.module';
import { RolesGuard } from './gard/roles.guard';

async function bootstrap() {
    const app = await NestFactory.create(ApplicationModule);

    const authGuard = app
        .select(AppModule)
        .get(RolesGuard);

    app.useGlobalInterceptors(new LoggingInterceptor(), new TransformInterceptor());

    app.useGlobalPipes(new ValidationPipe());

    app.useGlobalGuards(authGuard);

    const options = new DocumentBuilder()
        .setTitle('Coell docs')
        .setDescription('The Coell API description')
        .setVersion('1.0')
        .addTag('User management')
        .addTag('Auth')
        .addBearerAuth()
        .build();
    const document = SwaggerModule.createDocument(app, options);
    SwaggerModule.setup('/docs', app, document);

    await app.listen(3000);
}
bootstrap();
