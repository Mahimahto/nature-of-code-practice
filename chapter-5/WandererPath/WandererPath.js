let vehicle;

function setup() {
  createCanvas(600, 400);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(220);

  vehicle.wander();
  vehicle.update();
  vehicle.display();
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.2;
    this.wanderTheta = 0;
  }

  wander() {
    let wanderRadius = 50;
    let wanderDistance = 80;
    let changeTheta = 0.3;

    let wanderCenter = this.vel.copy();
    wanderCenter.setMag(wanderDistance);
    wanderCenter.add(this.pos);

    this.wanderTheta += random(-changeTheta, changeTheta);

    let offset = createVector(
      wanderRadius * cos(this.wanderTheta),
      wanderRadius * sin(this.wanderTheta)
    );

    let target = p5.Vector.add(wanderCenter, offset);
    this.seek(target);
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
