function Ship() {
  this.posX = width/2;
  this.posY = height-20;
  this.width = 20;
  this.height = 60;
  this.dirX = 0;
  this.frozen = false;

  this.show = function() {
    fill(0,0,255);
    rectMode(CENTER);
    rect(this.posX, this.posY, this.width, this.height);
  }

  this.setDir = function(dir) {
    this.dirX = dir;
  }

  this.move = function() {
    this.posX += this.dirX*5;
    if (this.posX-(this.width/2) < 0) {
      this.posX = this.width/2;
    } else if (this.posX+(this.width/2) > width) {
      this.posX = width-(this.width/2);
    }
  }
}
