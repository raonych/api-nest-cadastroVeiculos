import { Test, TestingModule } from '@nestjs/testing';
import { Injectable } from '@nestjs/common'; 
import {VeiculoService} from './veiculo.service';

describe('VeiculoService', () => {
  let service: VeiculoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [VeiculoService],
    }).compile();

    service = module.get<VeiculoService>(VeiculoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

