import {Body, Controller, Get, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardService} from "./board.service";
import {ResizeBoardDto} from "./dto/resize-board.dto";

@Controller('board')
export class BoardController {
  constructor(private readonly boardService: BoardService) {}

  @Get('')
  getBoard(): number[][] {
    return this.boardService.getBoard();
  }

  @Post('resize')
  @UsePipes(new ValidationPipe({ transform: true }))
  resizeBoard(@Body() data: ResizeBoardDto): string{
    this.boardService.resizeBoard(data.size, data.size);
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
