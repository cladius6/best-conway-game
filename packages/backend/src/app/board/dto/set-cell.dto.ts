import {IsInt, IsPositive} from "class-validator";
import {ISetCell} from '@conway-game/interfaces';

export class SetCellDto implements ISetCell{
  @IsInt()
  @IsPositive()
  row: number;

  @IsInt()
  @IsPositive()
  col: number;
}
