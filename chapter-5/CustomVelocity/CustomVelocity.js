let vehicle;

function setup() {
  createCanvas(600, 400);
  vehicle = new Vehicle(width / 2, height / 2);
}

function draw() {
  background(220);

  vehicle.customVelocity();
  vehicle.update();
  vehicle.display();
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
    this.noiseOffset = random(1000);
  }

  customVelocity() {
    let angle = noise(this.noiseOffset) * TWO_PI * 2;
    this.noiseOffset += 0.01;

    let desired = p5.Vector.fromAngle(angle);
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
