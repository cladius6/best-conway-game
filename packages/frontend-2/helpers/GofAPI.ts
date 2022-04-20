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
  private localUrl = 'http://localhost:3333/api/board';

  private postJson(url: string, method: string, data: any) {
    return fetch(url, {
      body: JSON.stringify(data),
      method: method,
      headers: {
        'Content-Type': 'application/json',
      },
    });
  }

  public async getBoard() {
    const response = await fetch(this.localUrl);
    return response.json();
  }

  public async resizeBoard(body: { size: number }) {
    const response = await this.postJson(
      `${this.localUrl}/resize`,
      'POST',
      body
    );
    return response.json();
  }

  public async setAliveCell(body: { row: number; col: number }) {
    const response = await this.postJson(
      `${this.localUrl}/resize`,
      'PUT',
      body
    );
    return response.json();
  }

  public async tick() {
    const response = await fetch(`${this.localUrl}/tick`);
    return response.json();
  }

  public async setBoard(body: { cells: IBoard }) {
    const response = await this.postJson(`${this.localUrl}/cells`, 'PUT', body);
    return response.json();
  }
}

export const getBoard = async () => {
  const localUrl = 'localhost:3333/api/board';
  const response = await fetch(localUrl);
  return response.json();
};
