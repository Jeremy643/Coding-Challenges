class Cell {
  w = 40;
  walls = [true, true, true, true]; // [top, right, bottom, left]
  visited = false;
  head = false;

  constructor(i, j) {
    this.i = i;
    this.j = j;
  }

  show() {
    let x = this.i * this.w;
    let y = this.j * this.w;
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

    if (this.head) {
      fill(102, 0, 204, 100);
      // noStroke();
      // stroke(102, 0, 204);
      rect(x, y, this.w, this.w);
    }
  }

  // highlight() {
  //   console.log(`Highlight!`);
  //   let x = this.i * this.w;
  //   let y = this.j * this.w;
  //   console.log(`(${x}, ${y}), i = ${this.i}, j = ${this.j}`);
  //   fill('rgb(102, 0, 204)');
  //   // fill(102, 0, 204, 100);
  //   noStroke();
  //   rect(x, y, this.w-1, this.w-1);
  // }
}
