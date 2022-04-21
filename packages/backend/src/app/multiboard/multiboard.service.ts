import {HttpException, Injectable} from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"
import {BoardService} from "../board/board.service";

@Injectable()
export class MultiBoardService {
  boards: Board[] = [];
  id: number = 0;
  constructor(private boardService: BoardService) {
    if(this.boards.length === 0) {
      this.boards.push(this.boardService.createBoard(3, 3));
    }
  }

  createBoard(row: number, col: number): number[][] {
    const board = this.boardService.createBoard(row, col);
    this.boards.push(board);
    return board.board;
  }

  getBoard(id: number): number[][] {
    if(id >= this.boards.length)
      throw new HttpException('Board not found', 404);
    return this.boards[id].board;
  }

  setCell(id: number, row: number, col: number) {
    if(this.boards[id] === undefined)
      throw new HttpException('Board does not exist', 404);
    try {
      this.boards[id].setCell(row, col);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }

  setCells(id: number, cells: number[][]) {
    if (this.boards[id] === undefined)
      throw new HttpException('Board does not exist', 404);
    try {
      this.boards[id].setCells(cells);
    } catch (e) {
      throw new HttpException(e.message, 400);
    }
  }
}
