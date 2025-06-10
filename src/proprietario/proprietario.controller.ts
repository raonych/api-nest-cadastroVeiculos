import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Delete,
  Query,
} from '@nestjs/common';
import { ProprietarioService } from './proprietario.service';
import { CreateProprietarioDto } from './dto/create-proprietario-dto';

@Controller('proprietario')
export class ProprietarioController {
  constructor(private readonly proprietarioService: ProprietarioService) {}

  @Get()
  findAll() {
    console.log('Rota GET index /proprietario');
    return this.proprietarioService.findAll();
  }

  @Post()
  async create(@Body() CreateProprietarioDto: CreateProprietarioDto) {
    console.log(
      'Rota POST /proprietario cadastro com body:',
      CreateProprietarioDto,
    );
    try {
      await this.proprietarioService.create(CreateProprietarioDto);
      return {
        success: true,
        message: 'Proprietario cadastrado com sucesso',
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    console.log('Rota GET /proprietario/:id chamado com ID:', id);
    try {
      const data = await this.proprietarioService.findOne(id);
      return {
        success: true,
        data,
      };
    } catch (error) {
      return {
        success: false,
        message: error.message,
      };
    }
  }
}