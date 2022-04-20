import { Injectable } from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"
import {IBoards} from "@conway-game/interfaces";

@Injectable()
export class BoardService {
  board: Board = undefined;
  boards: IBoards[];
  id: number = 0;
  constructor() {
    if (this.boards === undefined) {
      this.board = new Board(3, 3);
    }
  }

  createAdditionalBoard(row: number, col: number): void {
    this.boards.push({id: this.id+1, board: new Board(row, col)});
  }

  getBoard(): number[][] {
    return this.board.board;
  }

  setCell(row: number, col:number): void {
    this.board.setCell(row, col);
  }

  tick(): void {
    this.board.tick();
  }

  setCells(cells: number[][]): void {
    this.board.setCells(cells);
  }

  resizeBoard(width: number, height: number): void {
    this.board = new Board(width, height);
  }
}
