var ship;
var flowers = [];
var drops = [];

function setup() {
  // put setup code here
  createCanvas(600, 400);
  ship = new Ship();
  for (var i = 0; i < 6; i++) {
    flowers[i] = new Flower(i*80+80, 60);
  }
}

function draw() {
  // put drawing code here
  background(51);
  ship.show();
  ship.move();

  var edge = false;
  for (var i = 0; i < flowers.length; i++) {
    flowers[i].show();
    flowers[i].move();
    if (flowers[i].posX > width || flowers[i].posX < 0) {
      edge = true;
    }
  }
  if (edge) {
    for (var i = 0; i < flowers.length; i++) {
      flowers[i].shiftDown();
    }
  }

  for (var i = 0; i < drops.length; i++) {
    drops[i].show();
    if (drops[i].posY < 0) {
      // remove drop if it has left canvas
      drops[i].explode();
    }
    drops[i].move();

    for (var j = 0; j < flowers.length; j++) {
      if (drops[i].hits(flowers[j])) {
        const index = j;
        flowers.splice(index, 1);
        drops[i].explode();
      }
    }
  }

  for (var i = drops.length-1; i >= 0; i--) {
    if (drops[i].toDelete) {
      drops.splice(i, 1);
    }
  }
}

function keyReleased() {
  if (key != ' ') {
    ship.setDir(0);
  }
}

function keyPressed() {
  if (key === ' ') {
    var drop = new Drop(ship.posX, height-ship.height);
    drops.push(drop);
  }

  if (keyCode === RIGHT_ARROW) {
    ship.setDir(1);
  } else if (keyCode === LEFT_ARROW) {
    ship.setDir(-1);
  }
}
