function Pipe(birdRaduis, dist) {
    this.width = 60;
    this.posX = parseInt(dist, 10);
    this.speed = 2;
    this.birdHeight = birdRaduis*2;
    this.minHeight = this.birdHeight + 20;
    this.gap = random(this.minHeight, height/2);
    this.rect1Height = random(this.minHeight, height - this.gap - this.minHeight);
    this.rect2Height = height - this.gap - this.rect1Height;
    
    this.show = function() {
        fill('rgb(5,166,5)')
        noStroke()
        rect(this.posX, 0, this.width, this.rect1Height)
        rect(this.posX, (this.rect1Height + this.gap), this.width, this.rect2Height)
    }

    this.move = function() {
        this.posX -= this.speed;
    }
}