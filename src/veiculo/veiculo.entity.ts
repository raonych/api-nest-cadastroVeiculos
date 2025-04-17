import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column({length: 30}) 
  categoria: string; 

  @Column({ type: 'timestamp' }) 
  data_cadastro: Date; 
} 