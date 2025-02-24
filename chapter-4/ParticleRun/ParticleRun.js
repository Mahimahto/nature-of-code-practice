class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-2, 0));
      this.acceleration = createVector(0, 0);
      this.lifespan = 255;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.lifespan -= 2;
      this.acceleration.mult(0);
    }
  
    show() {
      stroke(0, this.lifespan);
      fill(175, this.lifespan);
      circle(this.position.x, this.position.y, 10);
    }
  
    run() {
      this.applyForce(createVector(0, 0.1)); // Applying gravity
      this.update();
      this.show();
    }
  
    isDead() {
      return this.lifespan < 0;
    }
  }
  
  let particles = [];
  
  function setup() {
    createCanvas(400, 400);
  }
  
  function draw() {
    background(255);
  
    particles.push(new Particle(width / 2, 50));
  
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.run();
      if (p.isDead()) {
        particles.splice(i, 1);
      }
    }
  }
  