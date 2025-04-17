import { Controller, Get, Post, Body} from '@nestjs/common';
import {VeiculoService} from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';

@Controller('veiculo') //Rota
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService){}
  
  @Get()
  findAll(){
    return this.veiculoService.findAll();
  }

  @Post()
  async create(@Body() createVeiculoDto : CreateVeiculoDto,) {
    try {
        await this.veiculoService.create(
            createVeiculoDto,
        );
        
        return {
            success: true,
            message: 'Veiculo cadastrado com sucesso',
        };
    }catch(error) {
        return{
            success: false,
            message: error.message,
        };
    }
  }
}
