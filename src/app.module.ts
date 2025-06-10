import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { VeiculoModule } from './veiculo/veiculo.module';
import { ProprietarioModule } from './proprietario/proprietario.module';

@Module({
  imports: [
    MongooseModule.forRoot(
      process.env.MONGODB_URI || 'mongodb://mongodb:27017/bdveiculos'
    ),
    VeiculoModule,
    ProprietarioModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}