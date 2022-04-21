import { Module } from '@nestjs/common';
import {MultiBoardService} from './multiboard.service';
import {MultiBoardController} from "./multiboard.controller";
import {BoardModule} from "../board/board.module";
import {BoardService} from "../board/board.service";

@Module({
  controllers: [MultiBoardController],
  providers: [MultiBoardService],
  imports: [BoardModule, BoardService]
})
export class MultiBoardModule {}
