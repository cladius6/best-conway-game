async function resizeBoard(size: number) {
  return await fetch('/api/board/resize', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ size }),
  });
}

async function getBoard() {
  const res = await fetch('/api/board');
  return await res.json();
}

async function setBoardCells(cells: number[][]) {
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

async function tick() {
  const res = await fetch('/api/board/tick');
  return await res.json();
}

export const api = {
  resizeBoard,
  getBoard,
  setBoardCells,
  tick,
};
