import {ISetCell} from "../interfaces/cell.interface";
import {IsInt, IsPositive} from "class-validator";

export class SetCellDto implements ISetCell{
  @IsInt()
  @IsPositive()
  row: number;

  @IsInt()
  @IsPositive()
  col: number;
}
