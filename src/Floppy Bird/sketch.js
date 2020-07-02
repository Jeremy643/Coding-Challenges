let bird;
let pipe = [];

function setup() {
    createCanvas(900, 400);
    bird = new Bird();
    pipe[0] = new Pipe(bird.r, width);
    for (let i = 1; i < 10; i++) {
        pipe[i] = new Pipe(bird.r, pipe[i-1].posX+random(150,250));
    }
}

function draw() {
    background('rgb(52,125,235)');

    bird.show();
    bird.move();

    console.log('draw');

    for (let i = 0; i < pipe.length; i++) {
        pipe[i].show();
        pipe[i].move();
    }

    if (bird.posY === height || birdTouchesPipe()) {
        gameOver();
    }

    if ((pipe[0].posX + pipe[0].width) <= 0) {
        pipe.splice(0,1);
        pipe.push(new Pipe(bird.r, pipe[pipe.length-1].posX+random(100,250)));
    }
}

function keyPressed() {
    if (keyCode === 32) { // 32 = spacebar
        bird.flap();
    }
}

function birdTouchesPipe() {
    for (let i = 0; i < pipe.length; i++) {
        if ((bird.posX + bird.r) >= pipe[i].posX && (bird.posX - bird.r) <= (pipe[i].posX + pipe[i].width)) {
            let yConstrain = constrain(bird.posY, pipe[i].rect1Height, pipe[i].rect1Height + pipe[i].gap);
            if (yConstrain <= pipe[i].rect1Height || yConstrain >= (pipe[i].rect1Height + pipe[i].gap)) {
                return true;
            } else {
                return false;
            }
        }
    }
}

function gameOver() {
    console.log('Game Over!')
    noLoop()
}
