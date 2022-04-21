import { FC, useEffect, useState } from 'react';
import { api } from '../config/api';

interface BoardProps {
  size: number;
}

const Board: FC<BoardProps> = ({ size }) => {
  const [board, setBoard] = useState([]);
  const [isBoardLoaded, setIsBoardLoaded] = useState(false);

  useEffect(() => {
    fetchResizeBoard();
    fetchSetCells();
    fetchBoard();

    async function fetchResizeBoard() {
      await api.resizeBoard(size);
    }

    async function fetchSetCells() {
      const cellsToSet = [
        [0, 1],
        [1, 2],
        [2, 0],
        [2, 1],
        [2, 2],
      ];

      await api.setCells(cellsToSet);
    }

    async function fetchBoard() {
      const board = await api.getBoard();
      setBoard(board);
      setIsBoardLoaded(true);
    }
  }, []);

  if (!isBoardLoaded) {
    return (
      <>
        <p className="dark:text-white text-center text-2xl m-8">Loading...</p>
      </>
    );
  }

  return (
    <>
      <table className="board border-collapse border border-slate-500 mt-10">
        <tbody>
          {board.map((row, rowIndex) => {
            return (
              <tr key={rowIndex} className="row">
                {row.map((cell, cellIndex) => {
                  return (
                    <td
                      key={cellIndex}
                      onClick={async () => {
                        await api.setCell(rowIndex, cellIndex);
                        const board = await api.getBoard();
                        setBoard(board);
                      }}
                      className={`cell border border-slate-700 text-center w-5 h-5 ${
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
          onClick={async () => {
            const board = await api.tick();
            setBoard(board);
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
    </>
  );
};

export default Board;
