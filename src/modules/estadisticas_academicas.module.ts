import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadisticasAcademicasController } from 'src/controllers/estadisticas_academicas.controller';
import { EstadisticasAcademicasService } from 'src/services/estadisticas_academicas.service'; 
import { EstadisticasAcademicas } from 'src/entitys/estadisticas_academicas.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadisticasAcademicas])],
  providers: [EstadisticasAcademicasService],
  controllers: [EstadisticasAcademicasController],
})
export class EstadisticasAcademicasModule {}
