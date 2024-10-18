import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CarrerasController } from 'src/controllers/carrera.controller'; 
import { CarrerasService } from 'src/services/carrera.service'; 
import { Carreras } from 'src/entitys/carreras.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Carreras])],
  providers: [CarrerasService],
  controllers: [CarrerasController],
})
export class CarrerasModule {}
