import { Cell } from './cell';

describe("Cell", () => {
  it("should create cell correctly", () => {
    const cell = new Cell(true, 2);
    expect(cell.active).toBe(true);
  });

  it("should create cell with one neighbour and die after tick", () => {
    const cell = new Cell(true, 1);
    cell.tick();
    expect(cell.active).toBe(false);
  });

  it("should create cell with two neighbours and live after tick", () => {
    const cell = new Cell(true, 2);
    cell.tick();
    expect(cell.active).toBe(true);
  });

  it("should create dead cell with three neighbours and resurrect it after tick", () => {
    const cell = new Cell(false, 3);
    cell.tick();
    expect(cell.active).toBe(true);
  });

  it("should remain dead with less than two neighbours", () => {
    const cell = new Cell(false, 1);
    cell.tick();
    expect(cell.active).toBe(false);
  });
});
