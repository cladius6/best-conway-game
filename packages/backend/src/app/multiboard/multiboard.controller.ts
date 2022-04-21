import {Body, Controller, Get, Param, Put, UsePipes, ValidationPipe} from '@nestjs/common';
import {MultiBoardService} from "./multiboard.service";
import {SetCellDto} from "../board/dto/set-cell.dto";
import {SetCellsDto} from "../board/dto/set-cells.dto";

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
  @UsePipes(new ValidationPipe({transform: true}))
  async setCell(@Param('id') id, @Body() data: SetCellDto) {
    return this.multiBoardService.setCell(Number(id), data.row, data.col);
  }

  @Put('cells/:id')
  @UsePipes(new ValidationPipe({transform: true}))
  async setCells(@Param('id') id, @Body() data: SetCellsDto) {
    console.log(id, data)
    return this.multiBoardService.setCells(Number(id), data.cells);
  }
}
