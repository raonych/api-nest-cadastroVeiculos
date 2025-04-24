import { Controller, Get, Post, Body, Param, Patch, Delete, Query} from '@nestjs/common';
import {VeiculoService} from './veiculo.service';
import { CreateVeiculoDto } from './dto/create-veiculo-dto';
import { UpdateVeiculoDto } from './dto/update-veiculo-dto';

@Controller('veiculo') //Rota
export class VeiculoController {
  constructor(private readonly veiculoService: VeiculoService){}
  
  @Get()
  findAll(){
    console.log('Rota GET /veiculo');
    return this.veiculoService.findAll();
  }

  @Post()
  async create(@Body() createVeiculoDto : CreateVeiculoDto) {
    console.log('Rota POST /veiculo cadastro com body:', createVeiculoDto);
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

  @Get('/exibir/:id')
  async findOne(@Param('id') id: string){
    console.log('Rota GET /veiculo/:id chamada com ID:', id);
    try{
      const data = await this.veiculoService.findOne(+id);

      return{
        success:true,
        data
      };
    }catch(error){
      return { 
        success: false,
        message: error.message
      };
    }
  }

     
  @Get('/buscar')
  async buscarGeral(@Query('termo') termo: string) {
    console.log('Rota GET /veiculo/buscar chamada com termo:', termo);
    try{  
    const busca = await this.veiculoService.searchVeiculos(termo);
    return {
      success: true,
      data: busca,
    };
    }catch(error){
      return { 
        success: false,
        message: error.message
      };
    }
  }

  @Get('/proprietario/:id')
  async findByProprietarioId(@Param('id')proprietarioId: string){
    console.log('Rota GET /veiculo/proprietario/:id chamada com ID:', proprietarioId);
    try{
      const data = await this.veiculoService.findByProprietarioId(+proprietarioId);
      return{
        success:true,
        message:"Veiculos do proprietario",
        data
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Patch(':id/vincular')
  async vincularProprietario(@Param('id') veiculoId: number, @Body('proprietarioId') proprietarioId: number) {
    return this.veiculoService.vincularProprietario(veiculoId, proprietarioId);
  }

  @Patch(':id')
  async update(@Param('id') id: string, @Body() updateVeiculoDto : UpdateVeiculoDto){
    console.log('Rota PATCH /veiculo/:id chamada com ID:', id);
    try{
      const data = await this.veiculoService.update(+id,updateVeiculoDto);
      
      return{
        success:true,
        message:"Veiculo atualizado com sucesso",
        data
      };
    }catch(error){
      return { 
        success: false,
        message: error.message
      };
    }
  }

  @Delete(':id')
  async delete(@Param('id') id: string){
    try{
      await this.veiculoService.delete(+id);

      return {
        success: true,
        message: 'Veiculo deletado com sucesso!',
      };
    }catch(error){
      return {
        success: false,
        message: error.message,
      };
    }
  }

}
