import {Body, Controller, Get, Param, Post, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {MultiBoardService} from "./multiboard.service";
import {SetCellDto} from "../board/dto/set-cell.dto";

@Controller('multiboard')
export class MultiBoardController {

  constructor(private multiBoardService: MultiBoardService) {}

  @Put('')
  async create(@Body('') data) {
    return this.multiBoardService.createBoard(data.row, data.col);
  }

  @Get(':id')
  async get(@Param('id') id) {
    return {
      id: id,
      board: this.multiBoardService.getBoard(Number(id))
    };
  }

  @Put('cell/:id')
  async setCell(@Param('id') id, @Body(ValidationPipe) data: SetCellDto) {
    return this.multiBoardService.setCell(Number(id), data.row, data.col);
  }

  @Put('cells/:id')
  async setCells(@Param('id') id, @Body(ValidationPipe) cells: number[][]) {
    return this.multiBoardService.setCells(Number(id), cells);
  }
}
