import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { EstadisticasAcademicasService } from 'src/services/estadisticas_academicas.service';
import { EstadisticasAcademicas } from 'src/entitys/estadisticas_academicas.entity';

@Controller('estadisticas-academicas')
export class EstadisticasAcademicasController {
  constructor(private readonly estadisticasAcademicasService: EstadisticasAcademicasService) {}

  // Obtener todas las estadísticas académicas
  @Get()
  findAll(): Promise<EstadisticasAcademicas[]> {
    return this.estadisticasAcademicasService.findAll();
  }

  // Obtener una estadística académica por ID
  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<EstadisticasAcademicas> {
  //   return this.estadisticasAcademicasService.findOne(id);
  // }

  // Crear una nueva estadística académica
  @Post()
  create(@Body() estadistica: EstadisticasAcademicas): Promise<EstadisticasAcademicas> {
    return this.estadisticasAcademicasService.create(estadistica);
  }

  // Actualizar una estadística académica
  @Put(':id')
  update(@Param('id') id: string, @Body() estadistica: EstadisticasAcademicas): Promise<EstadisticasAcademicas> {
    return this.estadisticasAcademicasService.update(id, estadistica);
  }

  // Eliminar una estadística académica
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.estadisticasAcademicasService.delete(id);
  }
  // Filtrar por periodo, localidad y facultad
  @Get('filter')
  filter(
    @Query('periodo') periodo: string,
    @Query('localidad') localidad: string,
    @Query('facultad') facultad: string,
    @Query('modalidad') modalidad: string,
  ): Promise<EstadisticasAcademicas[]> {
    return this.estadisticasAcademicasService.filterEstadisticas(periodo, localidad, facultad, modalidad);
  }
}
