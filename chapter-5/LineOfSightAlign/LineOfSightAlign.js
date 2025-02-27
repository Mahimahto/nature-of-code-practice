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

// Boid class with line-of-sight alignment
class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
    this.fovAngle = radians(60); // Field of view angle (60 degrees on each side)
  }

  flock(boids) {
    let alignForce = this.align(boids);
    this.applyForce(alignForce);
  }

  align(boids) {
    let perceptionRadius = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      if (other === this) continue;

      let d = p5.Vector.dist(this.pos, other.pos);
      if (d < perceptionRadius) {
        let toOther = p5.Vector.sub(other.pos, this.pos).normalize();
        let angleBetween = this.vel.angleBetween(toOther);

        // Only align if the other boid is within the field of view
        if (abs(angleBetween) < this.fovAngle) {
          sum.add(other.vel);
          count++;
        }
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.vel);
      steer.limit(this.maxForce);
      return steer;
    }
    return createVector(0, 0);
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
    
    // Draw vision cone
    push();
    translate(this.pos.x, this.pos.y);
    rotate(this.vel.heading());
    noFill();
    stroke(100);
    arc(0, 0, 100, 100, -this.fovAngle, this.fovAngle);
    pop();
  }
}
