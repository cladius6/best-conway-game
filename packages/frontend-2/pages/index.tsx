// import { GameOfLife, IBoard } from '@game-of-life-new/gof-tsc';
import { useEffect, useState } from 'react';
import { getBoard, GofAPI, IBoard } from '../helpers/gofAPI';
import styles from './index.module.css';

export function Index() {
  // const numRows = 40;
  // const numCols = 40;

  const [count, setCount] = useState(0);
  const [test, setTest] = useState();
  // const [intervalId, setIntervalId] = useState<NodeJS.Timeout>(null);

  // const [grid, setGrid] = useState<IBoard>(() => {
  //   // return GameOfLife.generateBoard(numRows);
  // });

  // useEffect(() => {
  //   getBoard().then((board) => {
  //     setTest(board);
  //     console.log(board);
  //   });
  // }, []);

  useEffect(() => {
    const game = new GofAPI();
    game.getBoard().then((board) => {
      setTest(board);
      console.log(board);
    });
  }, []);

  // const playGameOfLife = () => {
  //   const newGame = new GameOfLife(grid);
  //   setGrid(newGame.tick().getBoard());
  //   setCount((prevCount) => prevCount + 1);
  // };

  // const autoPlayGameOfLife = () => {
  //   const newGame = new GameOfLife(grid);
  //   const newIntervalId = setInterval(() => {
  //     setGrid(newGame.tick().getBoard());
  //     setCount((prevCount) => prevCount + 1);
  //   }, 50);

  //   setIntervalId(newIntervalId);
  // };

  // const pauseGameOfLife = () => {
  //   if (intervalId) {
  //     clearInterval(intervalId);
  //     setIntervalId(null);
  //     return;
  //   }

  //   const newIntervalId = setInterval(() => {
  //     setCount((prevCount) => prevCount + 1);
  //   }, 1000);
  //   setIntervalId(newIntervalId);
  // };

  // const resetGameOfLife = () => {
  //   const newGame = new GameOfLife(GameOfLife.generateBoard(numRows));
  //   setGrid(newGame.getBoard());
  //   setCount(0);
  // };

  /*
   * Replace the elements below with your own.
   *
   * Note: The corresponding styles are in the ./index.css file.
   */
  return (
    <div className={styles.page}>
      <div className="wrapper">
        <div className="container">
          <div id="welcome">
            <h1>
              <span> Hello there, </span>
              Welcome gof-next 👋
              {}
            </h1>
          </div>

          {/* <div>Number of ticks {count && count}</div>
          <div
            style={{
              display: 'grid',
              gridTemplateColumns: `repeat(${numCols}, 20px)`,
              width: 'fit-content',
              margin: '0 auto',
            }}
          >
            {grid &&
              grid.map((rows, i) =>
                rows.map((_col, k) => (
                  <div
                    key={`${i}-${k}`}
                    style={{
                      width: 20,
                      height: 20,
                      backgroundColor: grid[i][k] ? '#00ffa3' : undefined,
                      border: '1px solid #595959',
                    }}
                  />
                ))
              )}
          </div> */}

          {/* <button onClick={playGameOfLife}>PLAY</button>
          <button onClick={autoPlayGameOfLife}>AUTO</button>
          <button onClick={pauseGameOfLife}>PAUSE</button>
          <button onClick={resetGameOfLife}>RESET</button> */}

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
