class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-2, 2), random(-2, -1));
      this.lifespan = 255;
    }
  
    update() {
      this.position.add(this.velocity);
      this.lifespan -= 5;
    }
  
    show() {
      noStroke();
      fill(255, this.lifespan);
      ellipse(this.position.x, this.position.y, 8, 8);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  class ParticleSystem {
    constructor(x, y, maxParticles = 50) {
      this.origin = createVector(x, y);
      this.particles = [];
      this.maxParticles = maxParticles;
    }
  
    addParticle() {
      if (this.particles.length < this.maxParticles) {
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
  
    isEmpty() {
      return this.particles.length === 0;
    }
  }
  
  let emitters = [];
  
  function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(0);
    
    for (let i = emitters.length - 1; i >= 0; i--) {
      emitters[i].addParticle();
      emitters[i].run();
      if (emitters[i].isEmpty()) {
        emitters.splice(i, 1);
      }
    }
  }
  
  function mousePressed() {
    emitters.push(new ParticleSystem(mouseX, mouseY));
  }
  