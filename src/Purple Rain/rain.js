function Rain() {
  this.width = 5;
  this.height = random(10,50);
  this.posX = random(0,width);
  this.posY = 0;
  this.speed = random(1,10);
  this.rainColour = color(138, 43, 226);
  this.alpha = random(150,255);

  this.show = function() {
    this.rainColour.setAlpha(this.alpha);
    fill(this.rainColour);
    noStroke();
    rect(this.posX, this.posY, this.width, this.height);
  }

  this.move = function() {
    this.posY += this.speed;
  }

  this.fallen = function() {
    this.posY = constrain(this.posY, -1, height);
    if (this.posY === height) {
      return true;
    } else {
      return false;
    }
  }
}
