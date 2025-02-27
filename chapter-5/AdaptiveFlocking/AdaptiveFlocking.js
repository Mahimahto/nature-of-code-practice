let flock = [];

function setup() {
  createCanvas(600, 400);
  
  for (let i = 0; i < 30; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);

  let t = frameCount * 0.01; // Time variable for Perlin noise changes
  
  for (let boid of flock) {
    boid.adaptiveFlock(flock, t);
    boid.update();
    boid.display();
  }
}

// Boid class with dynamic flocking behavior
class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.05;
  }

  adaptiveFlock(boids, t) {
    let sepWeight = noise(t) * 2;  // Separation weight varies with Perlin noise
    let cohWeight = noise(t + 100) * 2;  // Cohesion weight
    let alignWeight = noise(t + 200) * 2; // Alignment weight

    let sep = this.separate(boids).mult(sepWeight);
    let coh = this.cohere(boids).mult(cohWeight);
    let align = this.align(boids).mult(alignWeight);

    this.applyForce(sep);
    this.applyForce(coh);
    this.applyForce(align);
  }

  separate(boids) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d > 0 && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize().div(d);
        steer.add(diff);
        count++;
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

  cohere(boids) {
    let perceptionRadius = 50;
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
      return this.seek(sum);
    }
    return createVector(0, 0);
  }

  align(boids) {
    let perceptionRadius = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of boids) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d > 0 && d < perceptionRadius) {
        sum.add(other.vel);
        count++;
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

  seek(target) {
    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);

    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
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
