import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RendimientoAcademicoController } from 'src/controllers/rendimiento_academico.controller';
import { RendimientoAcademicoService } from 'src/services/rendimiento_academico.service'; 
import { RendimientoAcademico } from 'src/entitys/rendimiento_academico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([RendimientoAcademico])],
  providers: [RendimientoAcademicoService],
  controllers: [RendimientoAcademicoController],
})
export class RendimientoAcademicoModule {}
