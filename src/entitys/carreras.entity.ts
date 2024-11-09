import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Facultades } from './facultades.entity';
import { RendimientoAcademico } from './rendimiento_academico.entity';

@Entity()
export class Carreras {
  @PrimaryGeneratedColumn('uuid')
  id_carrera: string;

  @Column({ type: 'nvarchar', length: 255 })
  nombre_carrera: string;

  @ManyToOne(() => Facultades)
  @JoinColumn({ name: 'id_facultad' })
  id_facultad: Facultades;

  @OneToMany(() => RendimientoAcademico, (rendimiento) => rendimiento.id_carrera)
  rendimientoAcademico: RendimientoAcademico[];
}
