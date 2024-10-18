import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from 'typeorm';
import { Carreras } from './carreras.entity';

@Entity()
export class Facultades {
  @PrimaryGeneratedColumn('uuid')
  id_facultad: string;

  @Column({ type: 'nvarchar', length: 255 })
  nombre_facultad: string;
  
  // Relación inversa: una facultad tiene muchas carreras
  @OneToMany(() => Carreras, (carreras) => carreras.id_facultad)
  carreras: Carreras[];
}