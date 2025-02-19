let fire;

function setup() {
  createCanvas(400, 400);
  fire = new ParticleSystem(width / 2, height);
}

function draw() {
  background(0);
  fire.addParticle();
  fire.run();
}

// 🔥 Particle Class (Ek single flame particle define karega)
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-3, -1)); // Upar move karega
    this.acceleration = createVector(0, 0.05); // Gravity effect
    this.lifespan = 255; // Dheere dheere fade hone ka time
    this.size = random(8, 15); // Random flame size
    this.color = color(random(200, 255), random(100, 180), 0, this.lifespan); // Fiery color
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 4; // Dheere dheere fade hoga
    this.color.setAlpha(this.lifespan);
  }

  show() {
    noStroke();
    fill(this.color);
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

// 🔥 Particle System (Bohot saare particles manage karega)
class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    for (let i = 0; i < 2; i++) { // More particles for richer flames
      this.particles.push(new Particle(this.origin.x + random(-15, 15), this.origin.y));
    }
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.show();
      if (p.isDead()) {
        this.particles.splice(i, 1); // Dead particles remove karega
      }
    }
  }
}
