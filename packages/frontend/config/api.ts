import { ISetCell } from '@conway-game/interfaces';

async function getBoard() {
  const res = await fetch('/api/board');
  return await res.json();
}

async function resizeBoard(size: number) {
  return await fetch('/api/board/resize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ size }),
  });
}

async function setCells(cells: number[][]) {
  return await fetch('/api/board/cells', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      cells,
    }),
  });
}

async function setCell(cell: ISetCell) {
  return await fetch('/api/board/cell', {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      row: cell.row,
      col: cell.col,
    }),
  });
}

async function tick() {
  const res = await fetch('/api/board/tick');
  return await res.json();
}

export const api = {
  getBoard,
  resizeBoard,
  setCells,
  setCell,
  tick,
};
