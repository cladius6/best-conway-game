import { createContext } from 'react';
import Board from '../components/Board';
import { api } from '../config/api';
import { ISetCell } from '@conway-game/interfaces';

export const HomePageContext = createContext<{
  getBoard: () => Promise<number[][]>;
  resizeBoard: (size: number) => void;
  setCells: (cells: number[][]) => void;
  setCell: (cell: ISetCell) => void;
  tick: () => Promise<number[][]>;
}>({
  getBoard: async () => await api.getBoard(),
  resizeBoard: async (size: number) => await api.resizeBoard(size),
  setCells: async (cells: number[][]) => await api.setCells(cells),
  setCell: async (cell: ISetCell) => await api.setCell(cell),
  tick: async () => await api.tick(),
});

export function Index() {
  return (
    <>
      <div className="container mx-auto px-4">
        <h1 className="text-3xl dark:text-white font-bold underline">
          Best conway game
        </h1>

        <Board size={15} />
      </div>
    </>
  );
}

export default Index;
