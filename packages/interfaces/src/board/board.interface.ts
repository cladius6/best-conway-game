import {Board} from "@conway-game/game-of-life";

export interface IBoardResize {
  size: number;
}

export interface IBoards {
  id: number;
  board: Board;
}
