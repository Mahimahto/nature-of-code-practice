let cols, rows;
let resolution = 20;
let flowField = [];
let particles = [];

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
  
  calculateFlowField();
}

function draw() {
  background(220);

  for (let particle of particles) {
    particle.follow(flowField);
    particle.update();
    particle.edges();
    particle.display();
  }

  drawFlowField();
}

function calculateFlowField() {
  let center = createVector(width / 2, height / 2);

  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let pos = createVector(x * resolution, y * resolution);
      let dir = p5.Vector.sub(pos, center).rotate(HALF_PI);
      dir.setMag(1);
      flowField[index] = dir;
    }
  }
}

function drawFlowField() {
  for (let y = 0; y < rows; y++) {
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols;
      let pos = createVector(x * resolution, y * resolution);
      let v = flowField[index];

      stroke(0, 100);
      push();
      translate(pos.x, pos.y);
      rotate(v.heading());
      line(0, 0, resolution / 2, 0);
      pop();
    }
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
