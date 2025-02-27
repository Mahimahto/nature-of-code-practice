let flock = [];

function setup() {
  createCanvas(600, 400);
  
  // Create multiple boids
  for (let i = 0; i < 20; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);

  for (let boid of flock) {
    boid.cohere(flock);
    boid.update();
    boid.display();
  }
}

// Boid class implementing cohesion behavior
class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
  }

  cohere(boids) {
    let perceptionRadius = 50; // Distance threshold for cohesion
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d > 0 && d < perceptionRadius) {
        sum.add(other.pos);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      this.seek(sum);
    }
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
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}
