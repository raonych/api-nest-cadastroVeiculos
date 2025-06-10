import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { VeiculoService } from './veiculo.service';
import { VeiculoController } from './veiculo.controller';
import { Veiculo, VeiculoSchema } from './veiculo.schema';
import { ProprietarioModule } from '../proprietario/proprietario.module';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Veiculo.name, schema: VeiculoSchema }]),
    ProprietarioModule,
  ],
  providers: [VeiculoService],
  controllers: [VeiculoController],
})
export class VeiculoModule {}