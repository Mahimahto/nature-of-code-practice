let flock = [];
let cohesionSlider, separationSlider, alignmentSlider;

function setup() {
  createCanvas(600, 400);
  cohesionSlider = createSlider(0, 2, 1, 0.1);
  separationSlider = createSlider(0, 2, 1, 0.1);
  alignmentSlider = createSlider(0, 2, 1, 0.1);

  for (let i = 0; i < 30; i++) {
    flock.push(new Boid(random(width), random(height)));
  }
}

function draw() {
  background(220);
  
  let cohesionWeight = cohesionSlider.value();
  let separationWeight = separationSlider.value();
  let alignmentWeight = alignmentSlider.value();

  for (let boid of flock) {
    boid.flock(flock, cohesionWeight, separationWeight, alignmentWeight);
    boid.update();
    boid.display();
  }
}

// Boid class
class Boid {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  flock(boids, cohesionWeight, separationWeight, alignmentWeight) {
    let cohesionForce = this.cohere(boids).mult(cohesionWeight);
    let separationForce = this.separate(boids).mult(separationWeight);
    let alignmentForce = this.align(boids).mult(alignmentWeight);

    this.applyForce(cohesionForce);
    this.applyForce(separationForce);
    this.applyForce(alignmentForce);
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

  separate(boids) {
    let perceptionRadius = 25;
    let steer = createVector(0, 0);
    let count = 0;
    for (let other of boids) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d > 0 && d < perceptionRadius) {
        let diff = p5.Vector.sub(this.pos, other.pos);
        diff.normalize();
        diff.div(d);
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
