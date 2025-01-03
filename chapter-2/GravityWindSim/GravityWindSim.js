let mover;

function setup() {
  createCanvas(600, 400);
  mover = new Mover();
}

function draw() {
  background(220);
  
  let gravity = createVector(0, 0.1); // Downward force
  let wind = createVector(0.05, 0); // Rightward force
  
  mover.applyForce(gravity);
  mover.applyForce(wind);
  mover.update();
  mover.show();
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
    ellipse(this.position.x, this.position.y, 20);
  }
}
