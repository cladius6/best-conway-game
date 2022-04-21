import {ISetCells} from "@conway-game/interfaces";
import {IsArray} from "class-validator";

export class SetCellsDto implements ISetCells {
  @IsArray( {each: true})
  cells: number[][];
}
