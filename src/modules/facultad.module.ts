import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultadesController } from 'src/controllers/faciltad.constroller';
import { FacultadesService } from 'src/services/facultades.service';
import { Facultades } from 'src/entitys/facultades.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Facultades])],
  providers: [FacultadesService],
  controllers: [FacultadesController],
})
export class FacultadesModule {}
