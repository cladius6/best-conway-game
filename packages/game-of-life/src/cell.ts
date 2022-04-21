export class Cell {
  private _active: boolean;
  private readonly _neighbors: number;

  constructor(active: boolean, neighbors: number) {
    this._active = active;
    this._neighbors = neighbors;
  }

  get active(): boolean {
    return this._active;
  }

  tick() {
    if (this.active) {
      if (this._neighbors < 2 || this._neighbors > 3) {
        this._active = false;
      }
    }else{
      if (this._neighbors === 3) {
        this._active = true;
      }
    }
    return this;
  }
}
