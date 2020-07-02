// Purple Rain
// rain colour - (138, 43, 226)
// background - (230, 230, 250)

let rain = [];
let puddle;

function setup() {
    createCanvas(screen.width/2, screen.height/2);
    for (let i = 0; i < 100; i++) {
      rain[i] = new Rain();
    }
    puddle = new Puddle();
}

function draw() {
    background('rgb(230,230,250)');

    puddle.show();

    for (let i = rain.length-1; i >= 0; i--) {
      rain[i].show();
      rain[i].move();

      if (rain[i].fallen() && !puddle.isFull()) {
        // puddle.grow(rain[i].width * rain[i].height);
        puddle.grow();
        rain[i] = new Rain();
      } else if (rain[i].fallen() && puddle.isFull()) {
        rain.splice(i,1);
      }
    }

    if (puddle.isFull() && rain.length === 0) {
      console.log('Puddle full!');
      noLoop();
    }
}
