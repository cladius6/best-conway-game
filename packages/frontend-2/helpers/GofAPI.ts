// abstract class GofAPIAbstract {
//   static postJson: (
//     url: string,
//     method: string,
//     data: any
//   ) => Promise<>;
//   static getBoard: () => Promise<[]>;
//   static create: (workout: ) => Promise<>;
//   static update: (workout: ) => Promise<>;
//   static delete: (workoutId: number) => Promise<void>;
// }
export type ICellState = 1 | 0;

export type INumberOfNeighbors = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

export type IBoard = ICellState[][];

export class GofAPI {
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

  static async resizeBoard(body: { size: number }) {
    const response = await this.postJson(
      `${this.localUrl}/resize`,
      'POST',
      body
    );
    return response.json();
  }

  static async setAliveCell(body: { row: number; col: number }) {
    const response = await this.postJson(
      `${this.localUrl}/resize`,
      'PUT',
      body
    );
    return response.json();
  }

  static async setBoard(body: { cells: IBoard }) {
    const response = await this.postJson(`${this.localUrl}/cells`, 'PUT', body);
    return response.json();
  }
}
