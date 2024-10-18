import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { Facultades } from './entitys/facultades.entity'; 
import { Carreras } from './entitys/carreras.entity';
import { EstadisticasAcademicas } from './entitys/estadisticas_academicas.entity'; 
import { RendimientoAcademico } from './entitys/rendimiento_academico.entity';
import { FacultadesModule } from './modules/facultad.module';
import { CarrerasModule } from './modules/carrera.module';
import { EstadisticasAcademicasModule } from './modules/estadisticas_academicas.module';
import { RendimientoAcademicoModule } from './modules/rendimiento_academico.module';

@Module({
  imports: [
    ConfigModule.forRoot(), // Para variables de entorno
    TypeOrmModule.forRoot({
      type: 'mssql',
      host: process.env.DB_HOST,
      port: 1433,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      entities: [Facultades, Carreras, EstadisticasAcademicas, RendimientoAcademico], // Facultades se moverá al FacultadesModule
      synchronize: false,
      options: {
        encrypt: true,
        trustServerCertificate: true,
      },
    }),
    FacultadesModule,  // Registrar el módulo de Facultades
    CarrerasModule,
    EstadisticasAcademicasModule,
    RendimientoAcademicoModule
  ],
})
export class AppModule {}