import { Test, TestingModule } from '@nestjs/testing';
import { ProprietarioService } from './proprietario.service';

describe('ProprietarioService', () => {
  let service: ProprietarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ProprietarioService],
    }).compile();

    service = module.get<ProprietarioService>(ProprietarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
