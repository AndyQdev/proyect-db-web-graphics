import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Facultades } from 'src/entitys/facultades.entity';

@Injectable()
export class FacultadesService {
  constructor(
    @InjectRepository(Facultades)
    private facultadesRepository: Repository<Facultades>,
  ) {}

  findAll(): Promise<Facultades[]> {
    return this.facultadesRepository.find({ relations: ['carreras'] }); // Incluir carreras
  }

  create(facultad: Partial<Facultades>): Promise<Facultades> {
    return this.facultadesRepository.save(facultad);
  }

}
