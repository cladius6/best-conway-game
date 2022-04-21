import { IGofAPIStatic } from './../interfaces/IGofAPIStatic';
import { staticImplements } from './staticImplements';
import { IBoardResize, ISetCell, ISetCells } from '@conway-game/interfaces';

export type ICellState = 1 | 0;

export type IBoard = ICellState[][];

export type IData = IBoardResize | ISetCell | ISetCells;

@staticImplements<IGofAPIStatic>()
export class GofAPI {
  static backendUrl = `${process.env.NEXT_PUBLIC_BACKEND}api/board`;
  static postJson(url: string, method: string, data: IData) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  static async getBoard() {
    const response = await fetch(this.backendUrl);
    return response.json();
  }

  static async tick() {
    const response = await fetch(`${this.backendUrl}/tick`);
    return response.json();
  }

  static async resizeBoard(data: IBoardResize) {
    await this.postJson(`${this.backendUrl}/resize`, 'POST', data);
  }

  static async toggleCell(data: ISetCell) {
    await this.postJson(`${this.backendUrl}/cell`, 'PUT', data);
  }

  static async sendCells(data: ISetCells) {
    const response = await this.postJson(
      `${this.backendUrl}/cells`,
      'PUT',
      data
    );
    return response.json();
  }
}
