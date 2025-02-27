let flock = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 50; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(0);
  stroke(255, 50);
  
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.display();
  }
}

class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.05;
  }

  flock(boids) {
    let steer = createVector(random(-1, 1), random(-1, 1));
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
    stroke(255);
    strokeWeight(2);
    point(this.pos.x, this.pos.y);
  }
}
