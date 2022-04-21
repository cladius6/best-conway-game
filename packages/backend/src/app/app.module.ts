import { Module } from '@nestjs/common';

import { AppController } from './app.controller';
import { AppService } from './app.service';
import { BoardModule } from './board/board.module';
import {MultiBoardModule} from "./multiboard/multiboard.module";

@Module({
  imports: [BoardModule, MultiBoardModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
