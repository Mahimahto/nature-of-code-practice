class Particle {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      this.lifespan = 255;
      this.size = random(6, 12); // Variable size for diversity
    }
  
    applyForce(force) {
      this.acceleration.add(force);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
      this.lifespan -= 2;
    }
  
    show() {
      noStroke();
      fill(lerpColor(color(255, 100, 100), color(100, 100, 255), this.lifespan / 255));
      ellipse(this.position.x, this.position.y, this.size, this.size);
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
  
    applyForces(objects) {
      for (let p of this.particles) {
        for (let obj of objects) {
          let force = obj.calculateForce(p.position);
          p.applyForce(force);
        }
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
  
  class ForceObject {
    constructor(x, y, strength) {
      this.position = createVector(x, y);
      this.strength = strength;
    }
  
    calculateForce(particlePos) {
      let force = p5.Vector.sub(this.position, particlePos);
      let distance = constrain(force.mag(), 5, 100);
      force.normalize();
      force.mult(this.strength / (distance * distance));
      return force;
    }
  
    show() {
      noStroke();
      fill(this.strength > 0 ? 'blue' : 'red');
      ellipse(this.position.x, this.position.y, 20, 20, 5);
    }
  }
  
  let system;
  let forceObjects = [];
  
  function setup() {
    createCanvas(500, 500);
    system = new ParticleSystem(width / 2, height / 2);
  
    forceObjects.push(new ForceObject(150, 250, 80)); // Attractor
    forceObjects.push(new ForceObject(350, 250, -80)); // Repeller
  }
  
  function draw() {
    background(20);
    
    system.addParticle();
    system.applyForces(forceObjects);
    system.run();
  
    for (let obj of forceObjects) {
      obj.show();
    }
  }
  
  // Add attractor or repeller on mouse click
  function mousePressed() {
    let strength = random([-100, 100]); // Randomly an attractor or repeller
    forceObjects.push(new ForceObject(mouseX, mouseY, strength));
  }
  