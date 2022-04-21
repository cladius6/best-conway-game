import { Test, TestingModule } from '@nestjs/testing';
import { MultiBoardService } from './multiboard.service';
import {BoardModule} from "../board/board.module";

describe('MultiBoardService', () => {
  let service: MultiBoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MultiBoardService],
      imports: [BoardModule]
    }).compile();

    service = module.get<MultiBoardService>(MultiBoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
