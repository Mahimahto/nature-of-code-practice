let angle = 0;
let angleVel = 0;
let angleAcc = 0;
let gravity = 0.005; // Gravity effect
let damping = 0.99; // Energy loss per frame
let controlForce = 0.002; // User control strength

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);

  translate(width / 2, 150);

  // Apply gravity and damping
  angleAcc = -gravity * sin(angle);
  angleVel += angleAcc;
  angleVel *= damping;
  angle += angleVel;

  // Control balance using arrow keys
  if (keyIsDown(LEFT_ARROW)) {
    angleVel -= controlForce; // Tilt left
  }
  if (keyIsDown(RIGHT_ARROW)) {
    angleVel += controlForce; // Tilt right
  }

  // Check balance limit
  if (abs(angle) > PI / 3) {
    fill(255, 0, 0);
    textSize(16);
    textAlign(CENTER);
    text("⚠️ Unbalanced! ⚠️", 0, 120);
  }

  // Draw pendulum (balance indicator)
  stroke(0);
  strokeWeight(4);
  line(0, 0, 100 * sin(angle), 100 * cos(angle));
  fill(0);
  ellipse(100 * sin(angle), 100 * cos(angle), 20, 20);
}
