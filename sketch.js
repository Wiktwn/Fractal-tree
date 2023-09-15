let branches = [];
let fractalAngle1 = 90;
let fractalAngle2 = 90;
let fractalLength = 100;
let fractalLengthFraction1 = 1.5;
let fractalLengthFraction2 = 1.5;
let depth = 10;

function setup() {
  canvas = createCanvas(windowWidth/1.2, windowHeight/1.2);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  strokeWeight(3);
  tree(createVector(width/2, height), fractalLength, 180, depth);
  s1 = createSlider(0, 180, fractalAngle1, 0);
  s2 = createSlider(0, 180, fractalAngle2, 0);
  s3 = createSlider(0, height/2, fractalLength, 0);
  s4 = createSlider(1, 2, fractalLengthFraction1, 0);
  s5 = createSlider(1, 2, fractalLengthFraction2, 0);
  s1.size(100);s2.size(100);s3.size(100);s4.size(100);s5.size(100);
  s1.position(windowWidth/2+50, windowHeight-40);
  s2.position(windowWidth/2-150, windowHeight-40);
  s3.position(windowWidth/2-50, windowHeight-40);
  s4.position(windowWidth/2-150, windowHeight-20);
  s5.position(windowWidth/2+50, windowHeight-20);
  
  inp = createInput("10");
  inp.size(50);
  inp.position(windowWidth/2-25, 10);
  inp.input(inputDepth);
  s1.input(sliderChange);s2.input(sliderChange);s3.input(sliderChange);
  s4.input(sliderChange);s5.input(sliderChange);
  
  noLoop();
}

function windowResized() {
  branches = [];
  tree(createVector(width/2, height), fractalLength, 180, depth);
  resizeCanvas(windowWidth/1.2, windowHeight/1.2);
  s1.position(windowWidth/2+50, windowHeight-40);
  s2.position(windowWidth/2-150, windowHeight-40);
  s3.position(windowWidth/2-50, windowHeight-40);
  s4.position(windowWidth/2-150, windowHeight-20);
  s5.position(windowWidth/2+50, windowHeight-20);
}

function draw() {
  background(220);
  for (let b of branches) {
    let x1 = b[0]; let y1 = b[1];
    let x2 = b[2]; let y2 = b[3];
    strokeWeight(b[4]);
    line(x1, y1, x2, y2);
  }
}

function tree(start, len, angle, depth=10, stroke=3) {
  let rads = radians(angle);
  let x = sin(rads) * len;
  let y = cos(rads) * len;
  branches.push([start.x, start.y, x+start.x, y+start.y, stroke])
  if (depth > 0) {
    let end = createVector(x+start.x, y+start.y);
    tree(end, len/fractalLengthFraction1, angle+fractalAngle1, depth-1, stroke-0.1);
    tree(end, len/fractalLengthFraction2, angle-fractalAngle2, depth-1, stroke-0.1);
  }
}

function inputDepth() {
  depth = int(this.value());
  branches = [];
  tree(createVector(width/2, height), fractalLength, 180, depth);
  redraw();
}

function sliderChange() {
  fractalAngle1 = s1.value();
  fractalAngle2 = s2.value();
  fractalLength = s3.value();
  fractalLengthFraction1 = s4.value();
  fractalLengthFraction2 = s5.value();
  branches = [];
  tree(createVector(width/2, height), fractalLength, 180, depth);
  redraw();
}
