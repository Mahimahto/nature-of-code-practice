class Body {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    attract(other) {
      let force = p5.Vector.sub(this.position, other.position); // Calculate direction of force
      let distance = constrain(force.mag(), 5, 25); // Limit distance to avoid extreme forces
      let strength = (1 * this.mass * other.mass) / (distance * distance); // Gravitational force formula
      force.setMag(strength); // Set magnitude of the force
      return force;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass); // F = ma -> a = F/m
      this.acceleration.add(f); // Add acceleration
    }
  
    update() {
      this.velocity.add(this.acceleration); // Update velocity
      this.position.add(this.velocity); // Update position
      this.acceleration.mult(0); // Reset acceleration
    }
  
    show() {
      fill(0);
      noStroke();
      ellipse(this.position.x, this.position.y, this.mass * 10); // Draw the body
    }
  }
  
  let bodyA, bodyB;
  
  function setup() {
    createCanvas(400, 400);
    bodyA = new Body(150, 200, 10); // Create Body A
    bodyB = new Body(250, 200, 5);  // Create Body B
  }
  
  function draw() {
    background(255);
  
    // A attracts B
    let forceAB = bodyA.attract(bodyB);
    bodyB.applyForce(forceAB);
  
    // B attracts A
    let forceBA = bodyB.attract(bodyA);
    bodyA.applyForce(forceBA);
  
    // Update and display bodies
    bodyA.update();
    bodyB.update();
  
    bodyA.show();
    bodyB.show();
  }
  