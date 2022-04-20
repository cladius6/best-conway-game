import {Body, Controller, Get, Post} from '@nestjs/common';
import {BoardService} from "./board.service";

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('')
  getBoard(): number[][] {
    return this.boardService.getBoard();
  }

  @Post('resize')
  resizeBoard(@Body('size') size: number): string{
    this.boardService.resizeBoard(size, size);
    return 'Board resized';
  }
}
