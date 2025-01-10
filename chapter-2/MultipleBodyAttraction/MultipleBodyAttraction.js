class Body {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    attract(other) {
      let force = p5.Vector.sub(this.position, other.position); // Calculate direction of force
      let distance = constrain(force.mag(), 5, 25); // Limit distance
      let strength = (1 * this.mass * other.mass) / (distance * distance); // Gravitational force formula
      force.setMag(strength); // Set magnitude
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
  
  let bodies = [];
  
  function setup() {
    createCanvas(400, 400);
  
    // Create multiple bodies with random positions and masses
    for (let i = 0; i < 10; i++) {
      bodies.push(new Body(random(width), random(height), random(2, 10)));
    }
  }
  
  function draw() {
    background(255);
  
    // Nested loop: every body attracts every other body
    for (let i = 0; i < bodies.length; i++) {
      for (let j = 0; j < bodies.length; j++) {
        if (i !== j) { // Skip self-interaction
          let force = bodies[i].attract(bodies[j]);
          bodies[j].applyForce(force);
        }
      }
  
      // Update and display each body
      bodies[i].update();
      bodies[i].show();
    }
  }
  