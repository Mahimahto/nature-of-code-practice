let position; // Ball's position
let target;   // Target's position
let velocity; // Ball's velocity
let speed = 2; // Speed of the ball

function setup() {
  createCanvas(640, 240);

  // Initial position of the ball
  position = createVector(100, 100);

  // Target position
  target = createVector(width - 100, height / 2);

  // Initial velocity is zero (calculated dynamically later)
  velocity = createVector(0, 0);
}

function draw() {
  background(255);

  // Draw the target
  fill(255, 0, 0);
  noStroke();
  circle(target.x, target.y, 24);

  // Calculate direction to the target
  let direction = p5.Vector.sub(target, position);
  direction.setMag(speed); // Set the magnitude of the velocity vector

  // Update velocity towards the target
  velocity = direction;

  // Update ball's position
  position.add(velocity);

  // Check if the ball has reached the target
  if (p5.Vector.dist(position, target) < 5) {
    noLoop(); // Stop the animation once the target is reached
  }

  // Draw the ball
  fill(127);
  stroke(0);
  circle(position.x, position.y, 48);
}
