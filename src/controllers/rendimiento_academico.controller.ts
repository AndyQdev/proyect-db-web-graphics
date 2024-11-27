import { Controller, Get, Post, Put, Delete, Param, Body, Query } from '@nestjs/common';
import { RendimientoAcademicoService } from 'src/services/rendimiento_academico.service';
import { RendimientoAcademico } from 'src/entitys/rendimiento_academico.entity';

@Controller('rendimiento-academico')
export class RendimientoAcademicoController {
  constructor(private readonly rendimientoAcademicoService: RendimientoAcademicoService) {}

  // Obtener todos los rendimientos académicos
  @Get()
  findAll(): Promise<RendimientoAcademico[]> {
    return this.rendimientoAcademicoService.findAll();
  }

  // // Obtener un rendimiento académico por ID
  // @Get(':id')
  // findOne(@Param('id') id: string): Promise<RendimientoAcademico> {
  //   return this.rendimientoAcademicoService.findOne(id);
  // }

  // Crear un nuevo rendimiento académico
  @Post()
  create(@Body() rendimiento: RendimientoAcademico): Promise<RendimientoAcademico> {
    return this.rendimientoAcademicoService.create(rendimiento);
  }

  // Actualizar un rendimiento académico
  @Put(':id')
  update(@Param('id') id: string, @Body() rendimiento: RendimientoAcademico): Promise<RendimientoAcademico> {
    return this.rendimientoAcademicoService.update(id, rendimiento);
  }

  // Eliminar un rendimiento académico
  @Delete(':id')
  delete(@Param('id') id: string): Promise<void> {
    return this.rendimientoAcademicoService.delete(id);
  }
  @Get('filter')
  filterRendimientoAcademico(
    @Query('localidad') localidad: string,
    @Query('facultad') facultad: string,
    @Query('periodo') periodo: string,
    @Query('modalidad') modalidad: string,
  ): Promise<RendimientoAcademico[]> {
    console.log('Hola desde el controlador', periodo, localidad)
    return this.rendimientoAcademicoService.filterRendimientoAcademico(localidad, facultad, periodo, modalidad);
  }
}
