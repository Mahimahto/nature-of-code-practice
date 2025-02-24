class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-2, 0));
      this.acceleration = createVector(0, 0);
      this.angle = 0;
      this.angularVelocity = random(-0.1, 0.1);
      this.lifespan = 255;
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.angle += this.angularVelocity; // Rotate particle
      this.lifespan -= 2;
      this.acceleration.mult(0);
    }
  
    show() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      noStroke();
      fill(255, 100, 0, this.lifespan);
      rectMode(CENTER);
      rect(0, 0, 15, 10); // Rotating rectangle
      pop();
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
    background(0);
  
    particles.push(new Particle(width / 2, 50));
  
    for (let i = particles.length - 1; i >= 0; i--) {
      let p = particles[i];
      p.applyForce(createVector(0, 0.1)); // Applying gravity
      p.update();
      p.show();
      if (p.isDead()) {
        particles.splice(i, 1);
      }
    }
  }
  