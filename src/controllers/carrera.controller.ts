import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CarrerasService } from 'src/services/carrera.service';
import { Carreras } from 'src/entitys/carreras.entity';

@Controller('carreras')
export class CarrerasController {
  constructor(private readonly carrerasService: CarrerasService) {}

  // Obtener todas las carreras
  @Get()
  findAll(): Promise<Carreras[]> {
    return this.carrerasService.findAll();
  }

  // Obtener una carrera por ID
  @Get(':id')
  findOne(@Param('id') id: string): Promise<Carreras> {
    return this.carrerasService.findOne(id);
  }

  // Crear una nueva carrera
  @Post()
  create(@Body() carrera: Carreras): Promise<Carreras> {
    return this.carrerasService.create(carrera);
  }

  // Actualizar una carrera
  @Put(':id')
  update(@Param('id') id: string, @Body() carrera: Carreras): Promise<Carreras> {
    return this.carrerasService.update(id, carrera);
  }

  // Eliminar una carrera
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.carrerasService.delete(id);
  }
}
