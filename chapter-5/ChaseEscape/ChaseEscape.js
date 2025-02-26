let chaser, target;

function setup() {
  createCanvas(600, 400);
  chaser = new Vehicle(width / 4, height / 2);
  target = new Vehicle(width * 3 / 4, height / 2);
}

function draw() {
  background(220);

  let targetFuture = p5.Vector.add(target.pos, p5.Vector.mult(target.vel, 20));
  chaser.pursue(targetFuture);
  target.evade(chaser.pos);

  chaser.update();
  target.update();

  chaser.display(color(0, 255, 0));
  target.display(color(255, 0, 0));

  fill(0, 0, 255);
  ellipse(targetFuture.x, targetFuture.y, 8, 8);
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
    this.maxSpeed = 4;
    this.maxForce = 0.1;
  }

  pursue(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);

    this.applyForce(steer);
  }

  evade(chaser) {
    let fleeVector = p5.Vector.sub(this.pos, chaser);
    fleeVector.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(fleeVector, this.vel);
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

  display(col) {
    fill(col);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, 32, 32);
  }
}
