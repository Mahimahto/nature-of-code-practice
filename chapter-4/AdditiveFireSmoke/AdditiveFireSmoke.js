let emitter;
let smokeImg;

function preload() {
  smokeImg = loadImage("smoke.png"); // Load your smoke texture
}

function setup() {
  createCanvas(640, 240, WEBGL);
  emitter = new Emitter(0, 75);
}

function draw() {
  background(0);
  blendMode(ADD); // Additive blending for glow effect

  // Wind force based on mouse position
  let wind = createVector(map(mouseX, 0, width, -0.2, 0.2), 0);
  emitter.applyForce(wind);
  emitter.run();
  
  // Add multiple particles for a smooth effect
  emitter.addParticles(3);

  // Visualize wind direction
  drawVector(wind, createVector(0, -50, 0), 500);
}

class Particle {
  constructor(x, y) {
    this.pos = createVector(x, y);
    this.vel = createVector(random(-0.3, 0.3), random(-1, -2));
    this.acc = createVector(0, 0);
    this.lifespan = 255;
    this.size = random(20, 50);
  }

  applyForce(force) {
    this.acc.add(force);
  }

  update() {
    this.vel.add(this.acc);
    this.pos.add(this.vel);
    this.acc.mult(0);
    this.lifespan -= 3; // Slow fade
  }

  show() {
    imageMode(CENTER);
    tint(255, this.lifespan);
    image(smokeImg, this.pos.x, this.pos.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

class Emitter {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  applyForce(force) {
    for (let p of this.particles) {
      p.applyForce(force);
    }
  }

  addParticles(n = 1) {
    for (let i = 0; i < n; i++) {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.show();
      if (p.isDead()) {
        this.particles.splice(i, 1);
      }
    }
  }
}

// Simple function to visualize wind
function drawVector(v, pos, scale) {
  push();
  translate(pos.x, pos.y);
  stroke(255);
  let len = v.mag() * scale;
  line(0, 0, len, 0);
  line(len, 0, len - 4, +2);
  line(len, 0, len - 4, -2);
  pop();
}
