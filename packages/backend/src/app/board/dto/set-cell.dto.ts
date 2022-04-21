import { IsInt, Min } from 'class-validator';
import { ISetCell } from '@conway-game/interfaces';

// TODO"
export class SetCellDto implements ISetCell {
  @IsInt()
  @Min(0)
  row: number;

  @IsInt()
  @Min(0)
  col: number;
}
