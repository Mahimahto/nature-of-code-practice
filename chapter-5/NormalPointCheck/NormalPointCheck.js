let a, b, vehicle;

function setup() {
  createCanvas(600, 400);
  a = createVector(100, 200);
  b = createVector(500, 300);
  vehicle = new Vehicle(300, 100);
}

function draw() {
  background(220);

  // Draw the line segment
  stroke(0);
  line(a.x, a.y, b.x, b.y);

  // Move the vehicle
  vehicle.update();
  vehicle.display();

  // Get the normal point
  let normalPoint = getNormalPoint(vehicle.pos, a, b);

  // Check if the normal point is on the segment
  let onSegment = checkIfOnSegment(normalPoint, a, b);

  // Draw the normal point
  fill(onSegment ? 'green' : 'red');
  noStroke();
  ellipse(normalPoint.x, normalPoint.y, 8, 8);
}

// Function to get the normal point projection
function getNormalPoint(p, a, b) {
  let ap = p5.Vector.sub(p, a);
  let ab = p5.Vector.sub(b, a);
  ab.normalize();
  ab.mult(ap.dot(ab)); // Projection
  return p5.Vector.add(a, ab);
}

// Function to check if the normal point is on the segment
function checkIfOnSegment(normalPoint, a, b) {
  let d1 = p5.Vector.dist(a, normalPoint);
  let d2 = p5.Vector.dist(b, normalPoint);
  let segmentLength = p5.Vector.dist(a, b);
  return d1 + d2 <= segmentLength + 0.1; // Small tolerance for float precision
}

class Vehicle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
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
