import { Board } from './board';

describe("Board", () => {
  it("should create a board correctly", () => {
    const board = new Board(3, 3);
    expect(board.board).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("should create a board correctly with alive cell", () => {
    const board = new Board(3, 3);
    board.setCell(1, 1);
    board.tick();
    expect(board.board).toEqual([
      [0, 0, 0],
      [0, 0, 0],
      [0, 0, 0],
    ]);
  });

  it("should create a board correctly with few cells", () => {
    const board = new Board(3, 3);
    board.setCell(0, 0);
    board.setCell(0, 1);
    board.setCell(1, 0);
    board.setCell(1, 1);
    board.tick();
    expect(board.board).toEqual([
      [1, 1, 0],
      [1, 1, 0],
      [0, 0, 0],
    ]);
  });

  it("should create a board with three alive cells in diagonal", () => {
    const board = new Board(3, 3);
    board.setCell(0, 0);
    board.setCell(1, 1);
    board.setCell(2, 2);
    board.tick();
    expect(board.board).toEqual([
      [0, 0, 0],
      [0, 1, 0],
      [0, 0, 0],
    ]);
  });
});
