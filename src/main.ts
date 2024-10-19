import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
    // Habilitar CORS
  app.enableCors({
    origin: [
      'http://localhost:5173',
      'https://frontend-web-graphics.vercel.app',
      'https://vercel.live/link/frontend-web-graphics.vercel.app?via=project-dashboard-alias-list&p=1'
    ],
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Si necesitas enviar cookies o autenticación
  });
  app.setGlobalPrefix('api');  // Añade un prefijo global para las rutas
  await app.listen(3000);
}
bootstrap();
