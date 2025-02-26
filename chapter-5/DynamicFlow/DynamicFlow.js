let cols, rows;
let resolution = 20;
let flowField = [];
let particles = [];
let zOffset = 0; // Perlin noise third dimension

function setup() {
  createCanvas(600, 400);
  cols = floor(width / resolution);
  rows = floor(height / resolution);

  for (let i = 0; i < cols * rows; i++) {
    flowField[i] = createVector();
  }

  for (let i = 0; i < 100; i++) {
    particles.push(new Particle());
  }
}

function draw() {
  background(220);
  calculateFlowField();
  
  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.edges();
    particle.display();
  }

  zOffset += 0.01; // Time-varying Perlin noise
}

function calculateFlowField() {
  let xOffset = 0;
  for (let y = 0; y < rows; y++) {
    let yOffset = 0;
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let angle = noise(xOffset, yOffset, zOffset) * TWO_PI * 4;
      let v = p5.Vector.fromAngle(angle);
      v.setMag(1);
      flowField[index] = v;
      yOffset += 0.1;
    }
    xOffset += 0.1;
  }
}

class Particle {
  constructor() {
    this.pos = createVector(random(width), random(height));
    this.vel = createVector(0, 0);
    this.acc = createVector(0, 0);
    this.maxSpeed = 2;
  }

  follow(flowField) {
    let col = floor(this.pos.x / resolution);
    let row = floor(this.pos.y / resolution);
    let index = col + row * cols;

    if (index >= 0 && index < flowField.length) {
      let force = flowField[index];
      this.applyForce(force);
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

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    fill(0);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}
