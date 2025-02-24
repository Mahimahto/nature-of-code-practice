class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-2, -1));
      this.acceleration = createVector(0, 0.05);
      this.lifespan = 255;
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 4;
    }
  
    show() {
      noStroke();
      fill(255, this.lifespan);
      ellipse(this.position.x, this.position.y, 10, 10);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  class SquareParticle extends Particle {
    show() {
      noStroke();
      fill(255, 100, 100, this.lifespan);
      rectMode(CENTER);
      rect(this.position.x, this.position.y, 10, 10);
    }
  }
  
  class TriangleParticle extends Particle {
    show() {
      noStroke();
      fill(100, 255, 100, this.lifespan);
      push();
      translate(this.position.x, this.position.y);
      triangle(-5, 5, 5, 5, 0, -5);
      pop();
    }
  }
  
  class ParticleSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
    }
  
    addParticle() {
      let type = int(random(3));
      if (type === 0) {
        this.particles.push(new Particle(this.origin.x, this.origin.y));
      } else if (type === 1) {
        this.particles.push(new SquareParticle(this.origin.x, this.origin.y));
      } else {
        this.particles.push(new TriangleParticle(this.origin.x, this.origin.y));
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
  