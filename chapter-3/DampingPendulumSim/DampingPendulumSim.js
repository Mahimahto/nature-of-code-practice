let angle = Math.PI / 4;
let angleVel = 0;
let angleAcc = 0;
let length = 200;
let gravity = 0.01;
let damping = 0.995;
let origin, bob;

function setup() {
  createCanvas(400, 400);
  origin = createVector(width / 2, 50);
}

function draw() {
  background(220);

  angleAcc = (-1 * gravity / length) * sin(angle);
  angleVel += angleAcc;
  angleVel *= damping;
  angle += angleVel;

  let x = origin.x + length * sin(angle);
  let y = origin.y + length * cos(angle);

  stroke(0);
  line(origin.x, origin.y, x, y);
  fill(255, 0, 0);
  ellipse(x, y, 30, 30);
}
