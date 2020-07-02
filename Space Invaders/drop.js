function Drop(x, y) {
  this.posX = x;
  this.posY = y;
  this.r = 10;
  this.toDelete = false;

  this.show = function() {
    noStroke();
    fill(255, 0, 0);
    ellipse(this.posX, this.posY, this.r*2, this.r*2);
  }

  this.hits = function(flower) {
    var d = dist(this.posX, this.posY, flower.posX, flower.posY);
    if (d < this.r + flower.r) {
      return true;
    } else {
      return false;
    }
  }

  this.explode = function() {
    this.toDelete = true;
  }

  this.move = function() {
    this.posY = this.posY - 3;
  }
}
