import { Module } from '@nestjs/common';
import { ProprietarioService } from './proprietario.service';
import { ProprietarioController } from './proprietario.controller';

@Module({
  providers: [ProprietarioService],
  controllers: [ProprietarioController]
})
export class ProprietarioModule {}
