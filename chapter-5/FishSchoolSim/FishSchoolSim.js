let school = [];

function setup() {
  createCanvas(800, 600, WEBGL);
  for (let i = 0; i < 100; i++) {
    school.push(new Fish(random(-200, 200), random(-200, 200), random(-200, 200)));
  }
}

function draw() {
  background(20, 60, 100); // Deep water blue
  orbitControl(); // Mouse se view control karne ke liye

  for (let fish of school) {
    fish.flock(school);
    fish.update();
    fish.edges();
    fish.show();
  }
}

class Fish {
  constructor(x, y, z) {
    this.position = createVector(x, y, z);
    this.velocity = p5.Vector.random3D();
    this.acceleration = createVector(0, 0, 0);
    this.maxSpeed = 2;
    this.maxForce = 0.05;
    this.buoyancy = createVector(0, 0.02, 0); // Paani me halka sa float hone ka effect
  }

  flock(fishSchool) {
    let separation = this.separate(fishSchool);
    let alignment = this.align(fishSchool);
    let cohesion = this.cohere(fishSchool);

    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(this.buoyancy); // Paani ka asar
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.velocity.mult(0.98); // Paani me friction
  }

  separate(fishSchool) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0, 0);
    let count = 0;

    for (let other of fishSchool) {
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

  align(fishSchool) {
    let neighborDist = 50;
    let sum = createVector(0, 0, 0);
    let count = 0;

    for (let other of fishSchool) {
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

  cohere(fishSchool) {
    let neighborDist = 50;
    let sum = createVector(0, 0, 0);
    let count = 0;

    for (let other of fishSchool) {
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
    fill(255, 200, 50); // Yellowish fish
    noStroke();
    sphere(4); // Machhli ek chhoti sphere dikhayi degi
    pop();
  }
}
