class Body {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    repel(other) {
      let force = p5.Vector.sub(this.position, other.position); // Calculate direction of force
      let distance = constrain(force.mag(), 5, 50); // Limit distance
      let strength = (1 * this.mass * other.mass) / (distance * distance); // Repulsion force formula (similar to gravity but opposite direction)
      force.setMag(-strength); // Reverse force to repel
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
  let mouseBody;
  
  function setup() {
    createCanvas(400, 400);
  
    // Create multiple bodies
    for (let i = 0; i < 10; i++) {
      bodies.push(new Body(random(width), random(height), random(2, 10)));
    }
  
    // Create an invisible "mouse body" for attraction/repulsion to the mouse
    mouseBody = new Body(0, 0, 20);
  }
  
  function draw() {
    background(255);
  
    // Update mouse position as a "body"
    mouseBody.position.set(mouseX, mouseY);
  
    for (let i = 0; i < bodies.length; i++) {
      // Repel bodies from each other
      for (let j = 0; j < bodies.length; j++) {
        if (i !== j) {
          let force = bodies[i].repel(bodies[j]);
          bodies[j].applyForce(force);
        }
      }
  
      // Attract all bodies to the mouse
      let attractionForce = mouseBody.repel(bodies[i]);
      bodies[i].applyForce(attractionForce);
  
      // Update and display each body
      bodies[i].update();
      bodies[i].show();
    }
  
    // Optional: Draw the mouse position (center of attraction/repulsion)
    noFill();
    stroke(0);
    ellipse(mouseX, mouseY, 40); // Visual indicator for the "mouse body"
  }
  