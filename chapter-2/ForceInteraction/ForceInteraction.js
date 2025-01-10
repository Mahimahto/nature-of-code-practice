let object;

function setup() {
  createCanvas(600, 400);
  object = new Mover();
}

function draw() {
  background(220);

  // Define multiple forces
  let gravity = createVector(0, 0.1); 
  let wind = createVector(0.1, 0); 
  let friction = object.velocity.copy();
  friction.mult(-0.05); // Opposing force
  
  // Apply forces to the object
  object.applyForce(gravity);
  object.applyForce(wind);
  object.applyForce(friction);

  object.update();
  object.show();
}

class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector();
    this.acceleration = createVector();
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
  }

  show() {
    fill(0);
    ellipse(this.position.x, this.position.y, 30);
  }
}
