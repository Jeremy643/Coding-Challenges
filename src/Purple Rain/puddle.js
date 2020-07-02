function Puddle() {
  // this.totalVolume = width * height; // 2D
  this.currentVolume = 0;
  this.growBy = 0;
  this.posX = 0;
  this.posY = height;
  this.puddleColour = color(138, 43, 226);
  this.alpha = 175;

  this.show = function() {
    this.puddleColour.setAlpha(this.alpha);
    fill(this.puddleColour);
    noStroke();
    // rect(this.posX, this.posY, width, this.posY-this.growBy);
    // console.log(this.currentVolume);
    // rect(this.posX, this.posY, width, this.posY-this.currentVolume);
    rect(this.posX, this.posY, width, height);
  }

  // this.grow = function(vol) {
  //   this.currentVolume = this.currentVolume + ((this.currentVolume + vol) % width);
  //   this.growBy += Math.floor((this.currentVolume + vol) / width);
  // }

  this.grow = function() {
    this.currentVolume += 0.1;
    this.posY -= 0.1;
  }

  this.isFull = function() {
    if (this.currentVolume >= height) {
      return true;
    } else {
      return false;
    }
  }
}
