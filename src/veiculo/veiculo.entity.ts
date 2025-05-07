import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  JoinColumn,
} from 'typeorm';

import {CategoriaVeiculo} from '../enums/categoria-veiculos.enum';
import { Proprietario } from '../proprietario/proprietario.entity';

@Entity('veiculos')
export class Veiculo { 
  @PrimaryGeneratedColumn() 
  id: number; 

  @Column({ length: 7, nullable: false, unique: true}) 
  placa: string; 

  @Column({ length: 11, nullable: false, unique: true}) 
  renavam: string;

  @Column({ length: 50, nullable: false}) 
  marca: string; 

  @Column({ length: 50, nullable: false}) 
  modelo: string; 

  @Column({ length: 30}) 
  cor: string; 

  @Column({nullable: false, type: 'smallint' }) 
  ano_fabricacao: number; 

  @Column({nullable: false, type: 'smallint'}) 
  ano_modelo: number; 

  @Column({length: 20}) 
  tipo_combustivel: string; 

  @Column({type: 'enum', enum: CategoriaVeiculo, default: CategoriaVeiculo.AUTOMOVEL}) 
  categoria: string; 

  @Column({ type: 'timestamp', default: () => 'CURRENT_TIMESTAMP' }) 
  data_cadastro: Date; 

  @ManyToOne(() => Proprietario, (proprietario) => proprietario.veiculos, { eager: true, nullable: true })
  @JoinColumn({ name: 'proprietario_id' })
  proprietario: Proprietario | null;;
} 