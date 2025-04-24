import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ProprietarioService } from './proprietario.service';
import { ProprietarioController } from './proprietario.controller';
import { Proprietario } from './proprietario.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Proprietario])], 
  providers: [ProprietarioService],
  controllers: [ProprietarioController],
  exports: [TypeOrmModule],
})
export class ProprietarioModule {}
