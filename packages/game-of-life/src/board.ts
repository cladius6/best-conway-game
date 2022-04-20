import { Cell } from "./cell";

export class Board {
  private readonly w: number;
  private readonly h: number;
  private _board: number[][] = [];

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.initBoard();
  }

  get board(): number[][] {
    return this._board;
  }
  setCell(x: number, y: number): void {
    this.board[x][y] === 1 ? (this._board[x][y] = 0) : (this._board[x][y] = 1);
  }

  private initBoard(): void {
    this._board = Array.from(Array(this.w), () => Array(this.h).fill(0));
  }

  private getNeighbors(x: number, y: number): number {
    let countNeighbors = 0;
    for (let i = x - 1; i <= x + 1; i++) {
      for (let j = y - 1; j <= y + 1; j++) {
        if (
          i >= 0 &&
          i < this.w &&
          j >= 0 &&
          j < this.h &&
          !(i === x && j === y)
        ) {
          countNeighbors += this._board[i][j];
        }
      }
    }
    return countNeighbors;
  }

  private createCell(value: number, neighbors: number): Cell {
    return value === 1 ? new Cell(true, neighbors) : new Cell(false, neighbors);
  }

  tick(): void {
    this._board = this.board.map((row, i) => {
      return row.map((state, j) => {
        const neighbors = this.getNeighbors(i, j);
        const cell = this.createCell(state, neighbors).tick();
        if (cell.active) {
          return 1;
        } else return 0;
      });
    });
  }
}
