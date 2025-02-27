let flock = [];

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid(random(-200, 200), random(-200, 200), random(-200, 200)));
  }
}

function draw() {
  background(30);
  orbitControl();  // Mouse se view ghumane ke liye
  for (let boid of flock) {
    boid.flock(flock);
    boid.update();
    boid.edges();
    boid.show();
  }
}

class Boid {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.velocity = p5.Vector.random3D();
    this.acceleration = createVector(0, 0, 0);
    this.maxForce = 0.05;
    this.maxSpeed = 2;
  }

  flock(boids) {
    let separation = this.separate(boids);
    let alignment = this.align(boids);
    let cohesion = this.cohere(boids);

    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  separate(boids) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0, 0);
    let count = 0;

    for (let other of boids) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) steer.div(count);
    if (steer.mag() > 0) {
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(boids) {
    let neighborDist = 50;
    let sum = createVector(0, 0, 0);
    let count = 0;

    for (let other of boids) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0, 0);
    }
  }

  cohere(boids) {
    let neighborDist = 50;
    let sum = createVector(0, 0, 0);
    let count = 0;

    for (let other of boids) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0, 0);
    }
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  edges() {
    let boundary = 300;
    if (this.position.x > boundary) this.position.x = -boundary;
    if (this.position.x < -boundary) this.position.x = boundary;
    if (this.position.y > boundary) this.position.y = -boundary;
    if (this.position.y < -boundary) this.position.y = boundary;
    if (this.position.z > boundary) this.position.z = -boundary;
    if (this.position.z < -boundary) this.position.z = boundary;
  }

  show() {
    push();
    translate(this.position.x, this.position.y, this.position.z);
    fill(255);
    noStroke();
    sphere(3); // Bird ko ek small sphere ke roop me dikhana
    pop();
  }
}
