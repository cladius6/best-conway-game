import { getAliveCellsCoordinates } from '../helpers/getAliveCellsCoordinates';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import useInterval from 'use-interval';
import styles from './index.module.css';
import { GofAPI, IBoard } from '../helpers/GofAPI';

export function Index() {
  const { register, handleSubmit } = useForm();
  const [board, setBoard] = useState<IBoard | null>(null);
  const [boardSize, setBoardSize] = useState(null);
  const [count, setCount] = useState(0);
  const [delay, setDelay] = useState<number>(200);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      tickGameOfLife();
    },
    isRunning ? delay : null
  );

  const onSizeChange = (data) => {
    GofAPI.resizeBoard({
      size: +data.Size,
    });
    setTimeout(() => {
      GofAPI.getBoard().then((newBoard) => setBoard(newBoard));
      setBoardSize(data.Size);
    }, 50);
  };

  const onSpeedSubmit = (data) => {
    setDelay(+data.Speed);
  };

  useEffect(() => {
    GofAPI.getBoard().then((newBoard) => {
      setBoardSize(newBoard[0].length);
      setBoard(newBoard);
    });
  }, [board]);

  const tickGameOfLife = () => {
    GofAPI.tick().then((newBoard) => setBoard(newBoard));
    setCount((prevCount) => prevCount + 1);
  };

  const autoTickGameOfLife = () => {
    setIsRunning((value) => !value);
  };

  const pauseGameOfLife = () => {
    setIsRunning((value) => !value);
  };

  const resetGameOfLife = () => {
    setCount(0);
    const aliveCells = getAliveCellsCoordinates(board);
    GofAPI.sendCells(aliveCells);
  };

  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome gof-next 👋
            </h1>
          </div>

          <form onChange={handleSubmit(onSizeChange)}>
            <input
              type="number"
              placeholder="Size"
              value={boardSize || ''}
              {...register('Size', {})}
            />
          </form>

          <form onChange={handleSubmit(onSpeedSubmit)}>
            <input
              type="number"
              placeholder="Speed"
              value={delay || ''}
              {...register('Speed', {})}
            />
          </form>

          <div>Number of ticks {count}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${boardSize}, 20px)`,
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            {board &&
              board.map((rows, i) =>
                rows.map((_col, k) => (
                  <div
                    key={`${i}-${k}`}
                    onClick={() => {
                      GofAPI.toggleCell({
                        row: i,
                        col: k,
                      });
                      const newGrid = JSON.parse(JSON.stringify(board));
                      newGrid[i][k] = board[i][k] ? 0 : 1;
                      setBoard(newGrid);
                    }}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: board[i][k] ? '#00ffa3' : undefined,
                      border: '1px solid #595959',
                    }}
                  />
                ))
              )}
          </div>
          <button onClick={tickGameOfLife}>PLAY</button>
          <button onClick={autoTickGameOfLife}>AUTO</button>
          <button onClick={pauseGameOfLife}>PAUSE</button>
          <button onClick={resetGameOfLife}>RESET</button>

          <p id="love">
            Carefully crafted with
            <svg
              fill="currentColor"
              stroke="none"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
              />
            </svg>
          </p>
        </div>
      </div>
    </div>
  );
}
export default Index;
