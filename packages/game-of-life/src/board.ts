import { Cell } from './cell';

export class Board {
  private readonly w: number;
  private readonly h: number;
  private _board: number[][] = [];

  constructor(w: number, h: number) {
    this.w = w;
    this.h = h;
    this.initBoard(w, h);
  }

  get board(): number[][] {
    return this._board;
  }

  set board(board: number[][]) {
    this._board = board;
  }

  setCell(x: number, y: number): void {
    this._board[x][y] = this.board[x][y] === 1 ? 0 : 1;
  }

  resize(w: number, h: number): void {
    this.initBoard(w, h);
  }

  private initBoard(w: number, h: number): void {
    this.board = Array.from(Array(w), () => Array(h).fill(0));
  }

  setCells(cells: number[][]): void {
    cells.forEach((cell) => {
      this.setCell(cell[0], cell[1]);
    });
  }
  getNeighbors(row: number, col: number): number {
    let count = 0;
    for (let i = row - 1; i <= row + 1; i++) {
      for (let j = col - 1; j <= col + 1; j++) {
        if (
          (i === row && j === col) ||
          i < 0 ||
          j < 0 ||
          i >= this.w ||
          j >= this.h
        ) {
          continue;
        }

        if (this.board[i][j] === 1) {
          count++;
        }
      }
    }
    return count;
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
