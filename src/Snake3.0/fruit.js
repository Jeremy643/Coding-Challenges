function Fruit() {
  this.r = 10;
  this.posX = Math.random()*(width - this.r);
  this.posY = Math.random()*(height - this.r);
  // this.posX;
  // this.posY;

  // this.pickPosX = function() {
  //   let row = floor(width/(this.r*2));
  //   this.posX = (floor(random(row)) * (this.r*2));
  //   return (floor(random(row)) * (this.r*2));
  // }
  //
  // this.pickPosY = function() {
  //   let column = floor(height/(this.r*2));
  //   this.posY = (floor(random(column)) * (this.r*2));
  //   return (floor(random(column)) * (this.r*2));
  // }

  this.show = function() {
    noStroke();
    fill(255,255,0);
    ellipse(this.posX, this.posY, this.r*2, this.r*2);
    // ellipse(this.pickPosX(), this.pickPosY(), this.r*2, this.r*2);
  }

  this.eaten = function() {
    this.posX = Math.random()*(width - this.r);
    this.posY = Math.random()*(height - this.r);
  }
}
