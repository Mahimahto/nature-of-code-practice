let springConstant = 0.5;
let restPosition = 200;
let position = 300;
let velocity = 0;

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  let displacement = position - restPosition;
  let force = -springConstant * displacement;
  velocity += force;
  position += velocity;

  ellipse(200, position, 20, 20);
}
