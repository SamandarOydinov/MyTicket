import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function start() {
  try {
    let PORT = process.env.PORT ?? 3000;
    const app = await NestFactory.create(AppModule);

    app.useGlobalPipes(new ValidationPipe())

    const config = new DocumentBuilder()
      .setTitle('Api example')
      .setDescription('The API description')
      .setVersion('1.0')
      .build();
    const documentFactory = () => SwaggerModule.createDocument(app, config);
    SwaggerModule.setup('swagger', app, documentFactory, {
      swaggerOptions: { defaultModelsExpandDepth: -1 },
    });

    await app.listen(PORT, () => {
      console.log(`server http://localhost:${PORT}/swagger da yurmoqda`);
    });
  } catch (error) {
    console.log(error.message);
  }
}

start();
