import {Injectable} from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"
import {BoardService} from "../board/board.service";

@Injectable()
export class MultiBoardService {
  boards: Board[] = [];
  id: number = 0;
  constructor(private boardService: BoardService) {}

  createBoard(row: number, col: number): number[][] {
    const board = this.boardService.createBoard(row, col);
    this.boards.push(board);
    return board.board;
  }

  getBoard(id: number): Board {
    return this.boards[id];
  }
}
