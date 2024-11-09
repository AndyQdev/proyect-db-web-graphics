import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { RendimientoAcademico } from 'src/entitys/rendimiento_academico.entity';

@Injectable()
export class RendimientoAcademicoService {
  constructor(
    @InjectRepository(RendimientoAcademico)
    private rendimientoAcademicoRepository: Repository<RendimientoAcademico>,
  ) {}

  // Obtener todos los rendimientos académicos
  findAll(): Promise<RendimientoAcademico[]> {
    return this.rendimientoAcademicoRepository.find({ relations: ['id_carrera'] }); // Relacionar con carreras
  }

  // Obtener un rendimiento académico por ID
  findOne(id: string): Promise<RendimientoAcademico> {
    return this.rendimientoAcademicoRepository.findOne({ where: { id_rendimiento: id }, relations: ['id_carrera'] });
  }

  // Crear un nuevo rendimiento académico
  create(rendimiento: RendimientoAcademico): Promise<RendimientoAcademico> {
    return this.rendimientoAcademicoRepository.save(rendimiento);
  }

  // Actualizar un rendimiento académico
  async update(id: string, rendimiento: RendimientoAcademico): Promise<RendimientoAcademico> {
    await this.rendimientoAcademicoRepository.update(id, rendimiento);
    return this.findOne(id);
  }

  // Eliminar un rendimiento académico
  async delete(id: string): Promise<void> {
    await this.rendimientoAcademicoRepository.delete(id);
  }
  
}
