import { Controller, Get, Post, Body } from '@nestjs/common';
import { FacultadesService } from 'src/services/facultades.service'; 
import { Facultades } from 'src/entitys/facultades.entity';  

@Controller('facultades')
export class FacultadesController {
  constructor(private facultadesService: FacultadesService) {}

  @Get()
  findAll(): Promise<Facultades[]> {
    return this.facultadesService.findAll();
  }

  @Post()
  create(@Body() facultad: Facultades): Promise<Facultades> {
    return this.facultadesService.create(facultad);
  }
}
