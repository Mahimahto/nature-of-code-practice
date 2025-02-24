class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-2, -1));
      this.acceleration = createVector(0, 0.05);
      this.angle = 0;
      this.angularVelocity = random(-0.05, 0.05);
      this.angularAcceleration = random(-0.001, 0.001);
      this.lifespan = 255;
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.angularVelocity += this.angularAcceleration;
      this.angle += this.angularVelocity;
      this.lifespan -= 4;
    }
  
    show() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      noStroke();
      fill(255, this.lifespan);
      rectMode(CENTER);
      rect(0, 0, 10, 10);
      pop();
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  class ParticleSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
    }
  
    addParticle() {
      this.particles.push(new Particle(this.origin.x, this.origin.y));
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
  
  let system;
  
  function setup() {
    createCanvas(400, 400);
    system = new ParticleSystem(width / 2, height / 2);
  }
  
  function draw() {
    background(0);
    system.addParticle();
    system.run();
  }
  