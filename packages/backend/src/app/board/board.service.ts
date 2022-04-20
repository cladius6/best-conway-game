import { Injectable } from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"

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

  tick(): void {
    this.board.tick();
  }

  resizeBoard(width: number, height: number): void {
    this.board.resize(width, height);
  }
}
