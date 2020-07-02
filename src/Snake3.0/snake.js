function Snake() {

  this.snakeKilled = false;
  this.speed = 1;
  this.snakeLen = 0;
  // this.snakeBodySpace = 20;
  this.posX = width/4;
  this.posY = height/2;
  this.snake = [createVector(this.posX, this.posY)];
  this.snakeSeglen = 20;
  /*
  dir can take three values;
    1 - right/down
    0 - stationary
    -1 - left/up
  */
  this.dirX = 1;
  this.dirY = 0;

  this.show = function() {
    fill(255);
    stroke('rgb(0,0,0)');
    strokeWeight(2);
    rectMode(CENTER);
    for (let i = 0; i < this.snake.length; i++) {
      rect(this.snake[i].x, this.snake[i].y, this.snakeSeglen, this.snakeSeglen);
    }

    // rectMode(CENTER);
    // rect(this.posX, this.posY, this.snakeSeglen, this.snakeSeglen);
  }

  this.setDir = function(x,y) {
    if (!this.snakeKilled) {
      this.dirX = x;
      this.dirY = y;
    }
  }

  this.move = function() {
    if (!this.snakeKilled) {
      // let prevX = this.snake[0].x;
      // let prevY = this.snake[0].y;
      let prevXLocs = [];
      let prevYLocs = [];
      for (let i = 0; i < this.snake.length-1; i++) {
        prevXLocs.push(this.snake[i].x);
        prevYLocs.push(this.snake[i].y);
      }

      this.posX += this.dirX * this.speed;
      this.posY += this.dirY * this.speed;
      this.snake[0].x = this.posX;
      this.snake[0].y = this.posY;

      for (let i = 1; i < this.snake.length; i++) {
        // prevX = this.snake[i].x;
        // prevY = this.snake[i].y;

        let prevX = prevXLocs.shift();
        let prevY = prevYLocs.shift();

        // this.snake[i].x = prevX;
        // this.snake[i].y = prevY;

        if (prevX === this.snake[i].x && (prevY - this.snake[i-1].y) > 0) {
          this.snake[i].y = this.snake[i-1].y + this.snakeSeglen;
        } else if (prevX === this.snake[i].x && (prevY - this.snake[i-1].y) < 0) {
          this.snake[i].y = this.snake[i-1].y - this.snakeSeglen;
        } else if (prevY === this.snake[i].y && (prevX - this.snake[i-1].x) > 0) {
          this.snake[i].x = this.snake[i-1].x + this.snakeSeglen;
        } else if (prevY === this.snake[i].y && (prevX - this.snake[i-1].x) < 0) {
          this.snake[i].x = this.snake[i-1].x - this.snakeSeglen;
        } else if (prevX === this.snake[i].x && (prevY - this.snake[i-1].y) === 0) {
          this.snake[i].y = prevY;
          this.snake[i].x = this.snake[i-1].x - (this.dirX * this.snakeSeglen);
        } else if (prevY === this.snake[i].y && (prevX - this.snake[i-1].x) === 0) {
          this.snake[i].x = prevX;
          this.snake[i].y = this.snake[i-1].y - (this.dirY * this.snakeSeglen);
        }

        // this.snake[i].x = this.snake[i-1].x - this.snakeSeglen;
        // this.snake[i].y = prevY;

        // let xDiff = this.snake[i-1].x - prevX;
        // if (xDiff === 0) {
        //   this.snake[i].x = prevX;
        // } else if (xDiff < 0) {
        //   this.snake[i].x = prevX + (xDiff + this.snakeSeglen);
        // } else if (xDiff > 0) {
        //   this.snake[i].x = prevX + (xDiff - this.snakeSeglen);
        // }

        // let yDiff = this.snake[i-1].y - prevY;
        // if (yDiff === 0) {
        //   this.snake[i].y = prevY;
        // } else if (yDiff < 0) {
        //   this.snake[i].y = prevY + (yDiff + this.snakeSeglen);
        // } else if (yDiff > 0) {
        //   this.snake[i].y = prevY + (yDiff - this.snakeSeglen);
        // }

        // let diffX = this.snake[i-1].x - this.snake[i].x;
        // let diffY = this.snake[i-1].y - this.snake[i].y;
        // let diffX = prevX - this.snake[i].x;
        // let diffY = prevY - this.snake[i].y;
        // if (diffX !== 0) {
        //   prevX = this.snake[i].x;
        //   this.snake[i].x += (diffX / Math.abs(diffX)) * this.speed;
        // } else if (diffY !== 0) {
        //   prevY = this.snake[i].y;
        //   this.snake[i].y += (diffY / Math.abs(diffY)) * this.speed;
        // }
      }

      // this.posX += this.dirX * this.speed;
      // this.posY += this.dirY * this.speed;
      // this.snake[0].x = this.posX;
      // this.snake[0].y = this.posY;

      // make sure that the snake remains in bounds
      this.posX = constrain(this.posX, this.snakeSeglen/2, width-(this.snakeSeglen/2));
      this.posY = constrain(this.posY, this.snakeSeglen/2, height-(this.snakeSeglen/2));

      if ((this.posX === this.snakeSeglen/2 || this.posX === width-(this.snakeSeglen/2)) ||
      (this.posY === this.snakeSeglen/2 || this.posY === height-(this.snakeSeglen/2))) {
        this.kill();
      }
    }
  }

  this.kill = function() {
    this.snakeKilled = true;
  }

  this.eat = function(fruit) {
    /*
    # Formula #
    d = sqrt((x2 - x1)^2 + (y2 - y1)^2)
    */
    let c1 = (fruit.posX - this.posX) * (fruit.posX - this.posX);
    let c2 = (fruit.posY - this.posY) * (fruit.posY - this.posY);
    // distance between the fruit and the snake
    let d = Math.sqrt(c1 + c2);

    let minDist = fruit.r + this.snakeSeglen/2;
    // if snake touches fruit - eat then grow
    if (d < minDist) {
      this.snakeLen++;
      // this.snake.push(createVector(this.snake[this.snakeLen-1].x + this.snakeBodySpace, this.snake[this.snakeLen-1].y + this.snakeBodySpace));
      if (this.dirY === 0 && this.dirX === -1) {
        this.snake[this.snakeLen] = createVector(this.snake[this.snakeLen-1].x + this.snakeSeglen, this.snake[this.snakeLen-1].y);
      } else if (this.dirY === 0 && this.dirX === 1) {
        this.snake[this.snakeLen] = createVector(this.snake[this.snakeLen-1].x - this.snakeSeglen, this.snake[this.snakeLen-1].y);
      } else if (this.dirY === -1 && this.dirX === 0) {
        this.snake[this.snakeLen] = createVector(this.snake[this.snakeLen-1].x, this.snake[this.snakeLen-1].y + this.snakeSeglen);
      } else if (this.dirY === 1 && this.dirX === 0) {
        this.snake[this.snakeLen] = createVector(this.snake[this.snakeLen-1].x, this.snake[this.snakeLen-1].y - this.snakeSeglen);
      }
      return true;
    } else {
      return false;
    }
  }

  this.grow = function() {
    this.snakeLen++;
  }
}
