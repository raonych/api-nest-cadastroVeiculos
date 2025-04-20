import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { Veiculo } from '../veiculo/veiculo.entity';

@Entity('proprietarios')
export class Proprietario {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  nome: string;

  @Column({ length: 11, unique: true })
  cpf: string;

  @Column({ length: 15 })
  numero: string;

  @OneToMany(() => Veiculo, (veiculo) => veiculo.proprietario)
  veiculos: Veiculo[];
}
