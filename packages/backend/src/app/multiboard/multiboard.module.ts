import { Module } from '@nestjs/common';
import {MultiBoardService} from './multiboard.service';
import {MultiBoardController} from "./multiboard.controller";
import {BoardModule} from "../board/board.module";

@Module({
  controllers: [MultiBoardController],
  providers: [MultiBoardService],
  imports: [BoardModule]
})
export class MultiBoardModule {}
