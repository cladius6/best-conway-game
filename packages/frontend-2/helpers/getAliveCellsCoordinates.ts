import { ISetCells } from '@conway-game/interfaces';
import { IBoard } from './GofAPI';

export const getAliveCellsCoordinates = (board: IBoard) => {
  const aliveCellsCoordinates: ISetCells = { cells: [] };
  board.forEach((row, rowIndex) => {
    row.forEach((cell, cellIndex) => {
      if (cell === 1) {
        aliveCellsCoordinates.cells.push([rowIndex, cellIndex]);
      }
    });
  });
  return aliveCellsCoordinates;
};
