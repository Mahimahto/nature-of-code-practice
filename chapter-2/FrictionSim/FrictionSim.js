let velocity = 5;
let friction = 0.1; // Friction coefficient
let position = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  velocity -= friction;
  position += velocity;

  ellipse(position, height / 2, 20, 20);
}
