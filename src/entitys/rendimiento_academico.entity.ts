import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carreras } from './carreras.entity';

@Entity()
export class RendimientoAcademico {
  @PrimaryGeneratedColumn('uuid')
  id_rendimiento: string;

  @Column('float')
  ppa: number;

  @Column('float')
  pps: number;

  @Column('float')
  ppa1: number;

  @Column('float')
  ppac: number;

  @ManyToOne(() => Carreras)
  @JoinColumn({ name: 'id_carrera' })
  id_carrera: Carreras;
}
