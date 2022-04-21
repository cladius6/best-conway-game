import {IsInt, IsPositive} from "class-validator";
import {IBoardResize} from "@conway-game/interfaces";

//: t
export class ResizeBoardDto implements IBoardResize{
  @IsInt()
  @IsPositive()
  size: number;
}
