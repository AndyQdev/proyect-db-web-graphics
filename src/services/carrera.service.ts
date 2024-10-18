import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Carreras } from 'src/entitys/carreras.entity';

@Injectable()
export class CarrerasService {
  constructor(
    @InjectRepository(Carreras)
    private carrerasRepository: Repository<Carreras>,
  ) {}

  // Obtener todas las carreras
  findAll(): Promise<Carreras[]> {
    return this.carrerasRepository.find({ relations: ['id_facultad'] }); // Relacionar con facultades
  }

  // Obtener una carrera por ID
  findOne(id: string): Promise<Carreras> {
    return this.carrerasRepository.findOne({ where: { id_carrera: id }, relations: ['id_facultad'] });
  }

  // Crear una nueva carrera
  create(carrera: Carreras): Promise<Carreras> {
    return this.carrerasRepository.save(carrera);
  }

  // Actualizar una carrera
  async update(id: string, carrera: Carreras): Promise<Carreras> {
    await this.carrerasRepository.update(id, carrera);
    return this.findOne(id);
  }

  // Eliminar una carrera
  async delete(id: string): Promise<void> {
    await this.carrerasRepository.delete(id);
  }
}
