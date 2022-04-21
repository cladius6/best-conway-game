import { Injectable } from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"

@Injectable()
export class BoardService {
  board: Board = undefined;
  constructor() {
    if (this.board === undefined) {
      this.board = new Board(3, 3);
    }
  }

  createBoard(row: number, col: number): Board {
    return new Board(row, col);
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
