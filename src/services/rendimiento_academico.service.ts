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
  
  async filterRendimientoAcademico(
    localidad: string,
    facultad: string,
    periodo: string,
    modalidad: string
  ): Promise<any[]> {
    const query = this.rendimientoAcademicoRepository
      .createQueryBuilder('rendimiento')
      .innerJoinAndSelect('rendimiento.id_carrera', 'carrera') // Usa 'id_carrera' en lugar de 'carrera'
      .innerJoinAndSelect('carrera.id_facultad', 'facultad')   // Usa 'id_facultad' en lugar de 'facultad'
      .select([
        'carrera.nombre_carrera AS nombre_carrera',
        'rendimiento.localidad AS localidad',
        'rendimiento.periodo AS periodo',
        'facultad.nombre_facultad AS nombre_facultad',
        'rendimiento.ppa AS ppa',
        'rendimiento.ppac AS ppac',
        'rendimiento.ppa1 AS ppa1',
        'rendimiento.pps AS pps',
        'rendimiento.modalidad AS modalidad'
      ]);
  
    // Aplicar filtros solo si el valor no es "Todas"
    if (localidad !== 'Todas') {
      query.andWhere('rendimiento.localidad = :localidad', { localidad });
    }
  
    if (facultad !== 'Todas') {
      query.andWhere('facultad.nombre_facultad = :facultad', { facultad });
    }
  
    if (periodo !== 'Todas') {
      query.andWhere('rendimiento.periodo = :periodo', { periodo });
    }
  
    if (modalidad !== 'Todas') {
      query.andWhere('rendimiento.modalidad = :modalidad', { modalidad });
    }
  
    // Ejecutar la consulta y obtener los resultados
    return query.getRawMany();
  }
  
  
}
