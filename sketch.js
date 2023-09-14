let branches = [];
let fractalAngle1 = 45;
let fractalAngle2 = 45;
let fractalLength = 100
let pv1;let pv2;let pv3;

function setup() {
  canvas = createCanvas(windowWidth/1.2, windowHeight/1.2);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
  strokeWeight(3);
  tree(createVector(width/2, height), fractalLength, 180, 10);
  s1 = createSlider(0, 180, 30, 0);
  s2 = createSlider(0, 180, 30, 0);
  s3 = createSlider(0, height, 100, 0);
  s1.size(width/3);
  s2.size(width/3);
  s3.size(width/3);
  pv1 = s1.value();
  pv2 = s2.value();
  pv3 = s3.value();
}

function windowResized() {
  branches = [];
  tree(createVector(width/2, height), fractalLength, 180, 10);
  resizeCanvas(windowWidth/1.2, windowHeight/1.2);
  canvas.position((windowWidth-width)/2, (windowHeight-height)/2);
}

function draw() {
  
  background(220);
  for (let b of branches) {
    let x1 = b[0]; let y1 = b[1];
    let x2 = b[2]; let y2 = b[3];
    strokeWeight(b[4]);
    line(x1, y1, x2, y2);
  }
  if (s1.value()!=pv1 || s2.value()!=pv2 || s3.value()!=pv3) {
    branches = [];
    fractalAngle1 = s1.value();
    fractalAngle2 = s2.value();
    fractalLength = s3.value();
    tree(createVector(width/2, height), fractalLength, 180, 10);
  }
  pv1 = s1.value();
  pv2 = s2.value();
  pv3 = s3.value();
}

function tree(start, len, angle, depth=10, stroke=3) {
  let rads = radians(angle);
  let x = sin(rads) * len;
  let y = cos(rads) * len;
  branches.push([start.x, start.y, x+start.x, y+start.y, stroke])
  if (depth > 0) {
    let end = createVector(x+start.x, y+start.y);
    tree(end, len/1.5, angle+fractalAngle1, depth-1, stroke-0.13);
    tree(end, len/1.5, angle-fractalAngle2, depth-1, stroke-0.13);
  }
}