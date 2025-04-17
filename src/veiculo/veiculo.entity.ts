import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('veiculo')
export class Veiculo { 
  @PrimaryGeneratedColumn() 
  id: number; 
@Column({ length: 7}) 
placa: string; 
@Column({ length: 7}) 
email: string;
@Column() 
marca: string; 
@Column() 
modelo: string; 
@Column() 
cor: string; 
@Column() 
ano_fabricacao: number; 
@Column() 
ano_modelo: number; 
@Column() 
tipo_combustivel: number; 
@Column() 
categoria: number; 
@Column() 
data_cadastro: number; 
} 