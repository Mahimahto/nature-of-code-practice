let angle = Math.PI / 4;
let angleVel = 0;
let angleAcc = 0;
let length = 200;
let gravity = 0.01;
let origin, bob;

function setup() {
  createCanvas(400, 400);
  origin = createVector(width / 2, 50);
  bob = createVector();
}

function draw() {
  background(220);
  
  angleAcc = (-1 * gravity / length) * sin(angle);
  angleVel += angleAcc;
  angle += angleVel;
  
  bob.set(origin.x + length * sin(angle), origin.y + length * cos(angle));
  
  stroke(0);
  line(origin.x, origin.y, bob.x, bob.y);
  fill(255, 0, 0);
  ellipse(bob.x, bob.y, 30, 30);
}
