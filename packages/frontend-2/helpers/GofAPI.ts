import { ISetCell, ISetCells, IBoardResize } from '@conway-game/interfaces';

abstract class GofAPIAbstract {
  static localUrl: string;
  static postJson: (
    url: string,
    method: string,
    data: any
  ) => Promise<Response>;
  static getBoard: () => Promise<IBoard>;
  static tick: () => Promise<void>;
  static resizeBoard: (data: IBoardResize) => Promise<void>;
  static toggleCell: (data: ISetCell) => Promise<void>;
  static sendCells: (data: ISetCells) => Promise<void>;
}

export type ICellState = 1 | 0;

export type INumberOfNeighbors = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type IBoard = ICellState[][];

export class GofAPI extends GofAPIAbstract {
  static localUrl = 'http://localhost:3333/api/board';

  static postJson(url: string, method: string, data: any) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async getBoard() {
    const response = await fetch(this.localUrl);
    const data = await response.json();
    return data;
  }

  static async tick() {
    const response = await fetch(`${this.localUrl}/tick`);
    const data = await response.json();
    return data;
  }

  static async resizeBoard(data: { size: number }) {
    await this.postJson(`${this.localUrl}/resize`, 'POST', data);
  }

  static async toggleCell(data: ISetCell) {
    await this.postJson(`${this.localUrl}/cell`, 'PUT', data);
  }

  static async sendCells(data: ISetCells) {
    const response = await this.postJson(`${this.localUrl}/cells`, 'PUT', data);
    return response.json();
  }
}
