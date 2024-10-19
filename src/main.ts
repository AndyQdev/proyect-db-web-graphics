import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Habilitar CORS
  app.enableCors({
    origin: '*',// Puedes especificar tu origen aquí o usar '*' para todos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: false, // Si necesitas enviar cookies o autenticación
  });
  app.setGlobalPrefix('api');  // Añade un prefijo global para las rutas
  await app.listen(3000);
}
bootstrap();
