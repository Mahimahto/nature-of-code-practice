// ViewAvoidanceFlock - Boids move laterally to avoid blocking the view

let flock = [];

function setup() {
  createCanvas(600, 400);
  for (let i = 0; i < 30; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);
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
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  flock(boids) {
    let avoidance = this.avoidBlock(boids);
    this.applyForce(avoidance);
  }

  avoidBlock(boids) {
    let perceptionRadius = 50;
    let steer = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      if (other !== this) {
        let d = p5.Vector.dist(this.pos, other.pos);
        if (d < perceptionRadius) {
          let dir = p5.Vector.sub(other.pos, this.pos);
          let angle = this.vel.angleBetween(dir);
          if (abs(angle) < QUARTER_PI) {
            steer.add(dir.rotate(HALF_PI)); // Move laterally
            count++;
          }
        }
      }
    }

    if (count > 0) {
      steer.div(count);
      steer.setMag(this.maxSpeed);
      steer.sub(this.vel);
      steer.limit(this.maxForce);
    }
    return steer;
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
