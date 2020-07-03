class Cell {
  w = 40;
  walls = [true, true, true, true]; // [top, right, bottom, left]

  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  show() {
    let x = this.i * this.w;
    let y = this.j * this.w;
    // noFill();
    // rect(x, y, this.w, this.w);
    if (this.walls[0]) {
      line(x    , y    , x + w, y    );
    }
    if (this.walls[1]) {
      line(x + w, y    , x + w, y + w);
    }
    if (this.walls[2]) {
      line(x + w, y + w, x    , y + w);
    }
    if (this.walls[3]) {
      line(x    , y + w, x    , y    );
    }
  }
}
