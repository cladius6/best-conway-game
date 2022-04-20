import {IsInt, IsPositive} from "class-validator";
import {IBoardResize} from "../interfaces/board.interface";

export class ResizeBoardDto implements IBoardResize{
  @IsInt()
  @IsPositive()
  size: number;
}
