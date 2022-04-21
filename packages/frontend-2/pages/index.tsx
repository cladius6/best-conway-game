import { useEffect, useState } from 'react';
import styles from './index.module.css';
import { GofAPI, IBoard } from '../helpers/GofAPI';
import { useForm } from 'react-hook-form';
import useInterval from 'use-interval';

export function Index() {
  const [numberOfCols, setNumberOfCols] = useState(null);
  const [count, setCount] = useState(0);
  const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null);
  const [board, setBoard] = useState<IBoard | null>(null);
  const { register, handleSubmit } = useForm();
  const [delay, setDelay] = useState<number>(200);
  const [isRunning, setIsRunning] = useState(false);

  useInterval(
    () => {
      tickGameOfLife();
    },
    isRunning ? delay : null
  );

  const onSizeSubmit = (data) => {
    GofAPI.resizeBoard({ size: +data.Size });
    setTimeout(() => {
      GofAPI.getBoard().then((newBoard) => setBoard(newBoard));
      setNumberOfCols(data.Size);
    }, 50);
  };

  const onSpeedSubmit = (data) => {
    setDelay(+data.Speed);
  };

  useEffect(() => {
    setTimeout(() => {
      setNumberOfCols(3);
      GofAPI.getBoard().then((newBoard) => setBoard(newBoard));
    }, 50);
  }, []);

  const tickGameOfLife = () => {
    GofAPI.tick().then((newBoard) => setBoard(newBoard));
    setCount((prevCount) => prevCount + 1);
  };

  const autoTickGameOfLife = () => {
    setIsRunning((value) => !value);
  };

  const pauseGameOfLife = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }
    setIsRunning((value) => !value);
  };

  const resetGameOfLife = () => {
    if (intervalId) {
      clearInterval(intervalId);
      setIntervalId(null);
      return;
    }
    setCount(0);
  };

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */

  return (
    <div className={styles.page} onClick={() => console.log(board)}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome gof-next 👋
            </h1>
          </div>

          <form onSubmit={handleSubmit(onSizeSubmit)}>
            <input type="number" placeholder="Size" {...register('Size', {})} />

            <input type="submit" />
          </form>

          <form onSubmit={handleSubmit(onSpeedSubmit)}>
            <input
              type="number"
              placeholder="Speed"
              {...register('Speed', {})}
            />

            <input type="submit" />
          </form>

          <div>Number of ticks {count}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numberOfCols}, 20px)`,
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
                      GofAPI.toggleCell({ row: i, col: k });
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
