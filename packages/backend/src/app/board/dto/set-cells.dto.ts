import {ISetCells} from "@conway-game/interfaces";
import {IsArray, IsNumber} from "class-validator";

export class SetCellsDto implements ISetCells {
  @IsArray( {each: true})
  cells: number[][];
}
