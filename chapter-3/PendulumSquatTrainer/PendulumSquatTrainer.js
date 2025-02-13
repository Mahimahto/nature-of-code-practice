let angle = Math.PI / 4;
let angleVel = 0;
let angleAcc = 0;
let gravity = 0.4;
let damping = 0.99; // To slow down the motion
let pivotX, pivotY;
let len = 150;
let mass = 20;

function setup() {
  createCanvas(400, 400);
  pivotX = width / 2;
  pivotY = 100;
}

function draw() {
  background(220);

  // Calculate acceleration based on gravity and angle
  angleAcc = (-1 * gravity / len) * sin(angle);
  angleVel += angleAcc;
  angleVel *= damping;
  angle += angleVel;

  // Squat movement simulation (press UP key to stabilize)
  if (keyIsDown(UP_ARROW)) {
    angleVel *= 0.95; // Adds stability
  }

  let x = pivotX + len * sin(angle);
  let y = pivotY + len * cos(angle);

  // Draw pivot
  fill(0);
  ellipse(pivotX, pivotY, 10, 10);

  // Draw rod
  stroke(0);
  line(pivotX, pivotY, x, y);

  // Draw weight (representing a person squatting)
  fill(150, 0, 255);
  ellipse(x, y, mass * 2, mass * 2);
}
