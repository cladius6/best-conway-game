import { IBoardResize, ISetCell, ISetCells } from '@conway-game/interfaces';
import { IData, IBoard } from '../helpers/GofAPI';

export interface IGofAPIStatic {
  backendUrl: string;
  postJson: (url: string, method: string, data: IData) => Promise<Response>;
  getBoard: () => Promise<IBoard>;
  tick: () => Promise<void>;
  resizeBoard: (data: IBoardResize) => Promise<void>;
  toggleCell: (data: ISetCell) => Promise<void>;
  sendCells: (data: ISetCells) => Promise<void>;
}
