import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Carreras } from './carreras.entity'; 

@Entity()
export class EstadisticasAcademicas {
  @PrimaryGeneratedColumn('uuid')
  id_estadistica: string;

  @Column({ type: 'nvarchar', length: 255 })
  periodo: string;

  @Column({ type: 'nvarchar', length: 255 })
  localidad: string;

  @Column({ type: 'nvarchar', length: 255 })
  modalidad: string;

  @Column('float')
  t_ins: number;

  @Column('float')
  t_nue: number;

  @Column('float')
  t_ant: number;

  @Column('float')
  mat_ins: number;

  @Column('float')
  sin_not: number;

  @Column('float')
  moras: number;

  @Column('float')
  porcentaje_mora: number;

  @Column('float')
  retirados: number;

  @Column('float')
  egresados: number;

  @Column('float')
  titulados: number;

  @ManyToOne(() => Carreras)
  @JoinColumn({ name: 'id_carrera' })
  id_carrera: Carreras;
}
