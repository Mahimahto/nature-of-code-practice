let path;
let vehicles = [];

function setup() {
  createCanvas(600, 400);
  path = new Path();

  for (let i = 0; i < 10; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(220);
  path.display();

  for (let v of vehicles) {
    v.follow(path);
    v.separate(vehicles);
    v.update();
    v.display();
  }
}

// Path class
class Path {
  constructor() {
    this.points = [];
    for (let i = 0; i < width; i += 20) {
      this.points.push(createVector(i, height / 2 + sin(i * 0.05) * 50));
    }
  }

  display() {
    stroke(0);
    noFill();
    beginShape();
    for (let p of this.points) {
      vertex(p.x, p.y);
    }
    endShape();
  }
}

// Vehicle class with path following and separation
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D();
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  follow(path) {
    let target = path.points[0];
    for (let p of path.points) {
      if (p5.Vector.dist(this.pos, p) < p5.Vector.dist(this.pos, target)) {
        target = p;
      }
    }

    let desired = p5.Vector.sub(target, this.pos);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.vel);
    steer.limit(this.maxForce);
    this.applyForce(steer);
  }

  separate(vehicles) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0);
    let count = 0;

    for (let other of vehicles) {
      let d = p5.Vector.dist(this.pos, other.pos);
      if (d > 0 && d < desiredSeparation) {
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
      this.applyForce(steer);
    }
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
