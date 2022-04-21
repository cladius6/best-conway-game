import {ISetCells} from "@conway-game/interfaces";
import {IsArray2d} from "./IsArray2d";

export class SetCellsDto implements ISetCells {
  @IsArray2d('cells', {
    message: 'Cells must be a 2d array',
  })
  cells: number[][];
}
