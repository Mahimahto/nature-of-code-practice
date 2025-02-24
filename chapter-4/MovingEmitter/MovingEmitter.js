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
      noStroke();
      fill(255, this.lifespan);
      ellipse(this.position.x, this.position.y, 10, 10);
    }
  
    isDead() {
      return this.lifespan < 0;
    }
  }
  
  class Emitter {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.particles = [];
    }
  
    updatePosition(x, y) {
      this.position.set(x, y);
    }
  
    emit() {
      this.particles.push(new Particle(this.position.x, this.position.y));
    }
  
    run() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.applyForce(createVector(0, 0.1)); // Gravity effect
        p.update();
        p.show();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  }
  
  let emitter;
  
  function setup() {
    createCanvas(400, 400);
    emitter = new Emitter(width / 2, height / 2);
  }
  
  function draw() {
    background(0);
    emitter.updatePosition(mouseX, mouseY);
    emitter.emit();
    emitter.run();
  }
  