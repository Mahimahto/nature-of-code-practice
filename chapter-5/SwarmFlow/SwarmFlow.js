let particles = [];
let numParticles = 200;
let noiseScale = 0.01;

function setup() {
  createCanvas(800, 600);
  for (let i = 0; i < numParticles; i++) {
    particles.push(new Particle(random(width), random(height)));
  }
}

function draw() {
  background(20, 20, 40);
  for (let p of particles) {
    p.update();
    p.display();
  }
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = p5.Vector.random2D().mult(2);
    this.acc = createVector(0, 0);
    this.maxSpeed = 3;
  }

  update() {
    let angle = noise(this.pos.x * noiseScale, this.pos.y * noiseScale) * TWO_PI * 4;
    let flow = p5.Vector.fromAngle(angle);
    this.applyForce(flow);

    this.vel.add(this.acc);
    this.vel.limit(this.maxSpeed);
    this.pos.add(this.vel);
    this.acc.mult(0);
    
    this.edges();
  }

  applyForce(force) {
    this.acc.add(force);
  }

  edges() {
    if (this.pos.x > width) this.pos.x = 0;
    if (this.pos.x < 0) this.pos.x = width;
    if (this.pos.y > height) this.pos.y = 0;
    if (this.pos.y < 0) this.pos.y = height;
  }

  display() {
    fill(255, 100);
    noStroke();
    ellipse(this.pos.x, this.pos.y, 4, 4);
  }
}
