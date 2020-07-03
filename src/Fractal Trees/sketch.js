let startLen = 200;
let angle = 0;
let slider;

function setup() {
    createCanvas(screen.width/2, windowHeight);
    slider = createSlider(0, TWO_PI, PI/4, 0.1);
}

function draw() {
    background('rgb(0,0,0)');
    angle = slider.value();
    stroke(255,255,255);
    translate(width/2, height);
    branch(startLen);
    // noLoop();
}

function branch(len) {
  line(0,0,0,-len);
  translate(0, -len);
  if (len > 4) {
    push();
    rotate(angle);
    branch(len * 0.67);
    pop();
    push();
    rotate(-angle);
    branch(len * 0.67);
    pop();
  }
}



// let slider;
// function setup() {
//   slider = createSlider(0, 255, 100);
//   slider.position(10, 10);
//   slider.style('width', '80px');
// }
//
// function draw() {
//   let val = slider.value();
//   background(val);
// }
