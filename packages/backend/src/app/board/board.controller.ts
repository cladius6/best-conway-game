import {Body, Controller, Get, Post, Put} from '@nestjs/common';
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

  @Put('cell')
  setCell(@Body('x') x: number, @Body('y') y: number): string{
    this.boardService.setCell(x, y);
    return 'Cell set';
  }

  @Get('tick')
  tick(): number[][]{
    this.boardService.tick();
    return this.boardService.getBoard();
  }
}
