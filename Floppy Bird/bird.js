function Bird() {
    /*
    The bird will remain in the same x position, the pipes will come to it
    posX = stay the same
    posY = will change
    */

    this.posX = width/8;
    this.posY = height/3;
    this.r = 15;
    this.flapSpeed = 40;
    this.fallInitSpeed = 1;
    this.fallFinSpeed = 5;
    this.accel = 2;

    this.show = function() {
        fill('rgb(233,252,18)');
        ellipseMode(CENTER);
        ellipse(this.posX, this.posY, this.r*2, this.r*2);
    }

    this.move = function() {
        this.posY += this.fallSpeed;
        this.posY = constrain(this.posY, 0, height);
    }

    this.flap = function() {
        this.posY -= this.flapSpeed;
    }
}
