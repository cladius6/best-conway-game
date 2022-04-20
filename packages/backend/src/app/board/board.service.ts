import { Injectable } from '@nestjs/common';
import {Board} from "../../../../game-of-life/src/board";

@Injectable()
export class BoardService {
  board: Board;
  constructor() {
    this.board = new Board(3, 3);
  }

  getBoard(): number[][] {
    return this.board.board;
  }

  setCell(x: number, y:number): void {
    this.board.setCell(x, y);
  }

}
