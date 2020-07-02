function Flower(x, y) {
  this.posX = x;
  this.posY = y;
  this.dirX = 1;
  this.r = 30;

  this.move = function() {
    this.posX = this.posX + this.dirX;
  }

  this.shiftDown = function() {
    this.dirX *= -1;
    this.posY += this.r;
  }

  this.show = function() {
    noStroke();
    fill(0, 255, 0);
    ellipse(this.posX, this.posY, this.r*2, this.r*2);
  }
}
