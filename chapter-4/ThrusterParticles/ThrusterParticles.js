class Particle {
    constructor(x, y, velocity) {
      this.position = createVector(x, y);
      this.velocity = velocity.copy().mult(-1); // Emit opposite to thrust
      this.lifespan = 255;
    }
  
    update() {
      this.position.add(this.velocity);
      this.lifespan -= 3;
    }
  
    show() {
      noStroke();
      fill(255, 100, 0, this.lifespan);
      ellipse(this.position.x, this.position.y, 5, 5);
    }
  
    isDead() {
      return this.lifespan < 0;
    }
  }
  
  class Spaceship {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.angle = 0;
      this.particles = [];
    }
  
    applyThrust() {
      let force = p5.Vector.fromAngle(this.angle).mult(0.2);
      this.acceleration.add(force);
      this.emitParticles();
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
  
      // Wrap around screen edges
      if (this.position.x > width) this.position.x = 0;
      if (this.position.x < 0) this.position.x = width;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = height;
    }
  
    turn(angleOffset) {
      this.angle += angleOffset;
    }
  
    emitParticles() {
      let offset = p5.Vector.fromAngle(this.angle + PI).mult(10);
      let particleVelocity = p5.Vector.fromAngle(this.angle).mult(-2);
      this.particles.push(new Particle(this.position.x + offset.x, this.position.y + offset.y, particleVelocity));
    }
  
    runParticles() {
      for (let i = this.particles.length - 1; i >= 0; i--) {
        let p = this.particles[i];
        p.update();
        p.show();
        if (p.isDead()) {
          this.particles.splice(i, 1);
        }
      }
    }
  
    show() {
      push();
      translate(this.position.x, this.position.y);
      rotate(this.angle);
      fill(0, 255, 0);
      triangle(-10, 10, 10, 10, 0, -15);
      pop();
    }
  }
  
  let spaceship;
  
  function setup() {
    createCanvas(400, 400);
    spaceship = new Spaceship(width / 2, height / 2);
  }
  
  function draw() {
    background(0);
    spaceship.update();
    spaceship.runParticles();
    spaceship.show();
  }
  
  function keyPressed() {
    if (keyCode === UP_ARROW) {
      spaceship.applyThrust();
    } else if (keyCode === LEFT_ARROW) {
      spaceship.turn(-0.1);
    } else if (keyCode === RIGHT_ARROW) {
      spaceship.turn(0.1);
    }
  }
  