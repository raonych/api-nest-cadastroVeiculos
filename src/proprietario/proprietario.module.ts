import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ProprietarioService } from './proprietario.service';
import { ProprietarioController } from './proprietario.controller';
import { Proprietario, ProprietarioSchema } from './proprietario.schema';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: Proprietario.name, schema: ProprietarioSchema },
    ]),
  ],
  providers: [ProprietarioService],
  controllers: [ProprietarioController],
  exports: [MongooseModule],
})
export class ProprietarioModule {}