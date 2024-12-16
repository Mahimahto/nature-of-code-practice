let position;
let velocity;

function setup() {
  createCanvas(640, 240);
  position = createVector(100, 100); // Ball ka initial position
  velocity = createVector(2.5, 2);   // Ball ki velocity
}

function draw() {
  background(255);

  // Position ko update karna velocity ke basis par
  position.add(velocity);

  // Ball ko boundaries se bounce karwana
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  // Ball draw karna
  fill(127);
  stroke(0);
  circle(position.x, position.y, 48);
}
