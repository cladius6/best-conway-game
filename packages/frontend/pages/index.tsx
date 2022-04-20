import { useEffect, useState } from 'react';
import { api } from '../config/api';

export function Index() {
  const [board, setBoard] = useState([]);
  const [isBoardLoaded, setIsBoardLoaded] = useState(false);

  useEffect(() => {
    fetchResizeBoard();
    fetchSetCells();
    fetchBoard();

    async function fetchResizeBoard() {
      await api.resizeBoard(10);
    }

    async function fetchSetCells() {
      const cellsToSet = [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];

      await api.setBoardCells(cellsToSet);
    }

    async function fetchBoard() {
      const board = await api.getBoard();
      setBoard(board);
      setIsBoardLoaded(true);
    }
  }, []);

  if (!isBoardLoaded) {
    return (
      <div className="container mx-auto px-4">
        <p className="dark:text-white text-center text-2xl m-8">Loading...</p>
      </div>
    );
  }

  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl dark:text-white font-bold underline">
          Best conway game
        </h1>

        <table className="board border-collapse border border-slate-500 w-64 mt-10">
          <tbody>
            {board.map((row, rowIndex) => {
              return (
                <tr key={rowIndex} className="row">
                  {row.map((cell, cellIndex) => {
                    return (
                      <td
                        key={cellIndex}
                        className={`cell border border-slate-700 text-center w-10 h-5 ${
                          cell
                            ? 'bg-slate-700 text-white border-slate-300'
                            : 'bg-white'
                        }`}
                      />
                    );
                  })}
                </tr>
              );
            })}
          </tbody>
        </table>

        <div className="py-6">
          <button
            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded w-32"
            onClick={() => {
              fetch('/api/board/tick')
                .then((res) => res.json())
                .then((data) => {
                  setBoard(data);
                });
            }}
          >
            tick
          </button>
        </div>

        <div>
          <pre className="dark:text-white">
            {board.map((row, rowIndex) => {
              return (
                <div key={rowIndex}>
                  [
                  {row.map((cell, cellIndex) => {
                    return (
                      <span key={cellIndex} className="mr-2 last:mr-0">
                        {cell ? '1' : '0'}
                      </span>
                    );
                  })}
                  ]
                </div>
              );
            })}
          </pre>
        </div>
      </div>
    </>
  );
}

export default Index;
