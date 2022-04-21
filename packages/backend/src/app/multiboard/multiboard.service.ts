import {Injectable} from '@nestjs/common';
import { Board } from "@conway-game/game-of-life"
import {BoardService} from "../board/board.service";

@Injectable()
export class MultiBoardService {
  boards: Board[] = [];
  id: number = 0;
  constructor(private boardService: BoardService) {
    if(this.boards.length === 0) {
      this.boards.push(this.boardService.createBoard(3, 3));
    }
  }

  createBoard(row: number, col: number): number[][] {
    const board = this.boardService.createBoard(row, col);
    this.boards.push(board);
    return board.board;
  }

  getBoard(id: number): number[][] {
    return this.boards[id].board;
  }
}
