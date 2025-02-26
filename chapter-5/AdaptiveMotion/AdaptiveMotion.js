let vehicle;

function setup() {
  createCanvas(600, 400);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(220);

  let target = createVector(mouseX, mouseY);

  let distance = p5.Vector.dist(vehicle.pos, target);
  vehicle.maxSpeed = map(distance, 0, width, 2, 6);
  vehicle.maxForce = map(distance, 0, width, 0.05, 0.2);

  vehicle.seek(target);
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

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
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
