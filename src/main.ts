import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:5174',
      'http://localhost:5173',
      'https://vercel.live/link/frontend-web-graphics.vercel.app?via=project-dashboard-alias-list&p=1'
    ], // Puedes especificar tu origen aquí o usar '*' para todos
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o autenticación
  });
  app.setGlobalPrefix('api');  // Añade un prefijo global para las rutas
  await app.listen(3000);
}
bootstrap();
