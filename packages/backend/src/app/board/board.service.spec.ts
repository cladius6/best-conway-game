import { Test, TestingModule } from '@nestjs/testing';
import { BoardService } from './board.service';

describe('BoardService', () => {
  let service: BoardService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [BoardService],
    }).compile();

    service = module.get<BoardService>(BoardService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });

  it('should return board correctly', async () => {
    const board = await service.getBoard();
    expect(board).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('should set cell in the board correctly', async () => {
    await service.setCell(0, 0);
    const board = await service.getBoard()
    expect(board).toEqual([
      [1, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it('should tick the board correctly', async () => {
    let board = await service.getBoard();
    await service.setCell(0, 0);
    await service.setCell(1, 1);
    await service.setCell(2, 2);
    expect(board).toEqual([
      [1, 0, 0],
      [0, 1, 0],
      [0, 0, 1],
    ]);
    await service.tick();
    board = await service.getBoard()
    expect(board).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
  });
});
