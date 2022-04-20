import {Body, Controller, Get, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {BoardService} from "./board.service";
import {ResizeBoardDto} from "./dto/resize-board.dto";
import {SetCellDto} from "./dto/set-cell.dto";

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
  @UsePipes(new ValidationPipe({ transform: true }))
  setCell(@Body() data: SetCellDto): string {
    this.boardService.setCell(data.row, data.col);
    return 'Cell set';
  }

  @Put('cells')
  setCells(@Body() data): string {
    this.boardService.setCells(data.cells);
    return 'Cells set';
  }

  @Get('tick')
  tick(): number[][]{
    this.boardService.tick();
    return this.boardService.getBoard();
  }

}
