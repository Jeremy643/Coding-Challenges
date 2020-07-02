let snake;
let fruit;

function setup() {
  // put setup code here
  createCanvas(600, 400);
  snake = new Snake();
  fruit = new Fruit();
  // frameRate(10);
}

function draw() {
  // put drawing code here
  background(51);

  snake.move();
  snake.show();

  fruit.show();

  if (snake.eat(fruit)) {
    console.log('Eaten!');
    fruit.eaten();
    //snake.grow();
  }
}

function keyPressed() {
  /*
  # Idea #
  If spacebar pressed then shorten snake by 1 but leave behind a triangle
  that stays for a set amount of time and if hit kills the snake
  */
  // if (key === ' ') {
  //   var drop = new Drop(ship.posX, height-ship.height);
  //   drops.push(drop);
  // }

  if (keyCode === RIGHT_ARROW) {
    if (snake.dirX === 0 || snake.dirX === 1) {
      snake.setDir(1,0);
    }
  } else if (keyCode === LEFT_ARROW) {
    if (snake.dirX === 0 || snake.dirX === -1) {
      snake.setDir(-1,0);
    }
  } else if (keyCode === UP_ARROW) {
    if (snake.dirY === 0 || snake.dirY === -1) {
      snake.setDir(0,-1);
    }
  } else if (keyCode === DOWN_ARROW) {
    if (snake.dirY === 0 || snake.dirY === 1) {
      snake.setDir(0,1);
    }
  }
}
