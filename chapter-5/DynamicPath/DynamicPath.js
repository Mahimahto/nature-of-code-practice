let path;
let vehicles = [];

function setup() {
  createCanvas(600, 400);
  path = new DynamicPath();

  // Create multiple vehicles
  for (let i = 0; i < 5; i++) {
    vehicles.push(new Vehicle(random(width), random(height)));
  }
}

function draw() {
  background(220);
  
  // Update and display the path
  path.update();
  path.display();

  // Update and display vehicles
  for (let vehicle of vehicles) {
    let target = path.getTarget(vehicle.pos);
    vehicle.seek(target);
    vehicle.update();
    vehicle.display();
  }
}

// Class for a dynamically changing path
class DynamicPath {
  constructor() {
    this.points = [];
    for (let i = 0; i < 10; i++) {
      this.points.push(createVector(i * 60, height / 2 + random(-50, 50)));
    }
  }

  update() {
    // Make the path points move over time
    for (let point of this.points) {
      point.y += noise(frameCount * 0.01, point.x * 0.01) * 2 - 1;
    }
  }

  display() {
    stroke(0);
    noFill();
    beginShape();
    for (let point of this.points) {
      vertex(point.x, point.y);
    }
    endShape();
  }

  getTarget(pos) {
    // Find the closest path point to the vehicle
    let closest = this.points[0];
    let minDist = p5.Vector.dist(pos, closest);
    for (let point of this.points) {
      let d = p5.Vector.dist(pos, point);
      if (d < minDist) {
        minDist = d;
        closest = point;
      }
    }
    return closest;
  }
}

// Vehicle class
class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
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
    this.pos.add(this.vel);
    this.acc.mult(0);
  }

  display() {
    fill(0);
    stroke(0);
    ellipse(this.pos.x, this.pos.y, 16, 16);
  }
}
