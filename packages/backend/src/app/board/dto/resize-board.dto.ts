import {IsInt, IsPositive} from "class-validator";

export class ResizeBoardDto {
  @IsInt()
  @IsPositive()
  size: number;
}
