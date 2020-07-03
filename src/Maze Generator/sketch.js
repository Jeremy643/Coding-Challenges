let w = 40;
let cols, rows;
let grid = [];

function setup() {
    createCanvas(800, 800);
    cols = floor(width/w);
    rows = floor(height/w);

    for (let j = 0; j < rows; j++) {
      for (let i = 0; i < cols; i++) {
        let cell = new Cell(i, j);
        grid.push(cell);
      }
    }
}

function draw() {
    background('rgb(96,96,96)');

    for (let i = 0; i < grid.length; i++) {
      grid[i].show();
    }
}
