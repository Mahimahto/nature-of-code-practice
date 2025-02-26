let vehicle;
let target;

function setup() {
  createCanvas(600, 400);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(220);

  target = createVector(mouseX, mouseY);
  vehicle.flee(target);
  vehicle.update();
  vehicle.display();

  fill(255, 0, 0);
  noStroke();
  ellipse(target.x, target.y, 16, 16);
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
  }

  flee(target) {
    let desired = p5.Vector.sub(this.pos, target); // Reverse direction from seek
    desired.setMag(this.maxSpeed);
    
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    fill(0);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, 32, 32);
  }
}
