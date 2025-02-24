class FireParticle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-3, -1)); // Rising effect
      this.acceleration = createVector(0, 0);
      this.lifespan = random(180, 255); // Vary lifespan for natural effect
      this.size = random(8, 14); // Vary size for realistic flames
      this.noiseOffset = random(1000); // Used for smooth sideways flickering
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.lifespan -= random(3, 5); // Random fade speed
  
      // Add smooth flickering effect using Perlin noise
      let flicker = (noise(this.noiseOffset) - 0.5) * 2;
      this.position.x += flicker;
      this.noiseOffset += 0.02;
    }
  
    show() {
      noStroke();
      let r = map(this.lifespan, 255, 50, 255, 100);
      let g = map(this.lifespan, 255, 50, 150, 50);
      let b = map(this.lifespan, 255, 50, 0, 0);
      
      fill(r, g, b, this.lifespan);
      ellipse(this.position.x, this.position.y, this.size);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  class FireSystem {
    constructor(x, y) {
      this.origin = createVector(x, y);
      this.particles = [];
    }
  
    addParticle() {
      this.particles.push(new FireParticle(this.origin.x + random(-10, 10), this.origin.y));
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
  
  let fire;
  
  function setup() {
    createCanvas(400, 400);
    fire = new FireSystem(width / 2, height - 50);
  }
  
  function draw() {
    background(0);
    fire.addParticle();
    fire.run();
  }
  