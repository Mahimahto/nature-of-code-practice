// FadingMist: A Beautiful Mist Simulation

let mist;

function setup() {
  createCanvas(400, 400);
  mist = new ParticleSystem(width / 2, height);
}

function draw() {
  background(30, 30, 50); // Dark bluish background
  mist.addParticle();
  mist.run();
}

//Particle Class (Defines a single mist particle)
class Particle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-0.5, 0.5), random(-2, -0.5)); // Slow upward movement
    this.acceleration = createVector(0, 0.01); // Slight upward acceleration
    this.lifespan = 255; // Fades out over time
    this.size = random(10, 20); // Varying mist sizes
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 1.5; // Slowly fades away
  }

  show() {
    noStroke();
    fill(200, 200, 255, this.lifespan * 0.5); // Soft misty blue
    ellipse(this.position.x, this.position.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan < 0;
  }
}

//Particle System (Manages multiple particles)
class ParticleSystem {
  constructor(x, y) {
    this.origin = createVector(x, y);
    this.particles = [];
  }

  addParticle() {
    this.particles.push(new Particle(this.origin.x + random(-20, 20), this.origin.y));
  }

  run() {
    for (let i = this.particles.length - 1; i >= 0; i--) {
      let p = this.particles[i];
      p.update();
      p.show();
      if (p.isDead()) {
        this.particles.splice(i, 1); // Remove dead particles
      }
    }
  }
}
