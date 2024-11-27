import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EstadisticasAcademicas } from 'src/entitys/estadisticas_academicas.entity';

@Injectable()
export class EstadisticasAcademicasService {
  constructor(
    @InjectRepository(EstadisticasAcademicas)
    private estadisticasAcademicasRepository: Repository<EstadisticasAcademicas>,
  ) {}

  // Obtener todas las estadísticas académicas
  findAll(): Promise<EstadisticasAcademicas[]> {
    return this.estadisticasAcademicasRepository.find({ relations: ['id_carrera', 'id_carrera.id_facultad'] });
  }

  // Obtener una estadística por ID
  findOne(id: string): Promise<EstadisticasAcademicas> {
    return this.estadisticasAcademicasRepository.findOne({ where: { id_estadistica: id }, relations: ['id_carrera'] });
  }

  // Crear una nueva estadística
  create(estadistica: EstadisticasAcademicas): Promise<EstadisticasAcademicas> {
    return this.estadisticasAcademicasRepository.save(estadistica);
  }

  // Actualizar una estadística académica
  async update(id: string, estadistica: EstadisticasAcademicas): Promise<EstadisticasAcademicas> {
    await this.estadisticasAcademicasRepository.update(id, estadistica);
    return this.findOne(id);
  }

  // Eliminar una estadística académica
  async delete(id: string): Promise<void> {
    await this.estadisticasAcademicasRepository.delete(id);
  }

  async filterEstadisticas(
    periodo: string,
    localidad: string,
    facultad: string,
    modalidad: string
  ): Promise<EstadisticasAcademicas[]> {
    const query = this.estadisticasAcademicasRepository.createQueryBuilder(
      'estadisticas'
    )
      .innerJoinAndSelect('estadisticas.id_carrera', 'carreras')
      .innerJoinAndSelect('carreras.id_facultad', 'facultades');
  
    // Aplicar los filtros solo si el campo no es "Todas"
    if (periodo !== 'Todas') {
      query.andWhere('estadisticas.periodo = :periodo', { periodo });
    }
  
    if (localidad !== 'Todas') {
      query.andWhere('estadisticas.localidad = :localidad', { localidad });
    }
  
    if (facultad !== 'Todas') {
      query.andWhere('facultades.nombre_facultad = :facultad', { facultad });
    }
  
    if (modalidad !== 'Todas') {
      query.andWhere('estadisticas.modalidad = :modalidad', { modalidad });
    }
  
    // Definir las columnas que queremos seleccionar
    query
      .select([
        'carreras.nombre_carrera AS nombre_carrera',
        'facultades.nombre_facultad AS nombre_facultad',
        'estadisticas.localidad AS localidad',
        'estadisticas.modalidad AS modalidad',
      ])
      .addSelect('SUM(estadisticas.t_ins)', 't_ins')
      .addSelect('SUM(estadisticas.t_nue)', 't_nue')
      .addSelect('SUM(estadisticas.t_ant)', 't_ant')
      .addSelect('SUM(estadisticas.mat_ins)', 'mat_ins')
      .addSelect('SUM(estadisticas.moras)', 'moras')
      .addSelect('SUM(estadisticas.porcentaje_mora)', 'porcentaje_mora')
      .addSelect('SUM(estadisticas.retirados)', 'retirados')
      .addSelect('SUM(estadisticas.egresados)', 'egresados')
      .addSelect('SUM(estadisticas.titulados)', 'titulados');
  
    // Agrupar según los campos que no sean "Todas"
    query.groupBy('carreras.nombre_carrera, facultades.nombre_facultad, estadisticas.localidad, estadisticas.modalidad');
    console.log('HOLA MUNDOSSSSSSSSS')
    // Si el periodo no es "Todas", lo incluimos en el agrupamiento
    if (periodo !== 'Todas') {
      query.addSelect('estadisticas.periodo AS periodo').addGroupBy('estadisticas.periodo');
    } else {
      query.addSelect('estadisticas.periodo AS periodo');
    }
  
    // Si localidad es "Todas", incluir todas las localidades en el agrupamiento
    if (localidad === 'Todas') {
      query.addSelect('estadisticas.localidad AS localidad').addGroupBy('estadisticas.localidad');
    }
  
    // Si modalidad es "Todas", incluir todas las modalidades en el agrupamiento
    if (modalidad === 'Todas') {
      query.addSelect('estadisticas.modalidad AS modalidad').addGroupBy('estadisticas.modalidad');
    }
  
    // Obtener los resultados
    const resultados = await query.getRawMany();
  
    // Realizar agrupación manual si "Todas" está en alguno de los parámetros
    if (facultad === 'Todas' || periodo === 'Todas' || localidad === 'Todas' || modalidad === 'Todas') {
      const agrupados = resultados.reduce((acc, curr) => {
        const key = `${curr.nombre_facultad}-${curr.localidad}-${curr.modalidad}-${curr.periodo}`;

        if (!acc[key]) {
          acc[key] = { ...curr };
        } else {
          acc[key].t_ins += Number(curr.t_ins);
          acc[key].t_nue += Number(curr.t_nue);
          acc[key].t_ant += Number(curr.t_ant);
          acc[key].mat_ins += Number(curr.mat_ins);
          acc[key].moras += Number(curr.moras);
          acc[key].porcentaje_mora += Number(curr.porcentaje_mora);
          acc[key].retirados += Number(curr.retirados);
          acc[key].egresados += Number(curr.egresados);
          acc[key].titulados += Number(curr.titulados);
        }

        return acc;
      }, {});

      return Object.values(agrupados);
    }
  
    // Si no se especifica "Todas", devolvemos los resultados sin agrupar manualmente
    return resultados;
  }
  
  // async filterEstadisticas(periodo: string, localidad: string, facultad: string): Promise<EstadisticasAcademicas[]> {
  //   console.log(periodo, localidad, facultad);
    
  //   return this.estadisticasAcademicasRepository
  //     .createQueryBuilder('estadisticas')
  //     .innerJoinAndSelect('estadisticas.id_carrera', 'carrera')  // Relacionamos con la entidad Carreras
  //     .innerJoinAndSelect('carrera.id_facultad', 'facultad')     // Relacionamos con la entidad Facultades
  //     .where('estadisticas.periodo = :periodo', { periodo })     // Filtramos por el periodo
  //     .andWhere('estadisticas.localidad = :localidad', { localidad })  // Filtramos por localidad
  //     .andWhere('facultad.nombre_facultad = :facultad', { facultad })  // Filtramos por el nombre de la facultad
  //     .getMany();  // Devuelve todas las coincidencias encontradas
  // }
}  
