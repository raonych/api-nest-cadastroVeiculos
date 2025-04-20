import { Test, TestingModule } from '@nestjs/testing';
import { ProprietarioController } from './proprietario.controller';

describe('ProprietarioController', () => {
  let controller: ProprietarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ProprietarioController],
    }).compile();

    controller = module.get<ProprietarioController>(ProprietarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
