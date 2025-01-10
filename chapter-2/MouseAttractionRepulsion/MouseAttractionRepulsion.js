class Body {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-1, 1), random(-1, 1));
    this.acceleration = createVector(0, 0);
    this.mass = mass;
  }

  attractOrRepel(mouse, isAttraction) {
    let force = p5.Vector.sub(mouse, this.position); // Calculate direction of force
    let distance = constrain(force.mag(), 10, 50); // Limit distance
    let strength = (1 * this.mass) / (distance * distance); // Force formula
    force.setMag(isAttraction ? strength : -strength); // Set magnitude of force
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
let attractMode = true; // Mode flag for attraction or repulsion

function setup() {
  createCanvas(400, 400);

  // Create multiple bodies
  for (let i = 0; i < 10; i++) {
    bodies.push(new Body(random(width), random(height), random(2, 10)));
  }
}

function draw() {
  background(255);

  for (let i = 0; i < bodies.length; i++) {
    // Attraction or repulsion towards mouse
    let mouse = createVector(mouseX, mouseY); // Mouse vector
    let force = bodies[i].attractOrRepel(mouse, attractMode); // Attraction or repulsion
    bodies[i].applyForce(force);

    // Update and display each body
    bodies[i].update();
    bodies[i].show();
  }

  // Instruction text
  fill(0);
  noStroke();
  textSize(12);
  text("Press 'A' for Attraction | 'R' for Repulsion", 10, height - 10);
}

// Correct keyPressed function
function keyPressed() {
  if (key === 'A' || key === 'a') {
    attractMode = true; // Enable attraction mode
    console.log("Attraction mode activated");
  } else if (key === 'R' || key === 'r') {
    attractMode = false; // Enable repulsion mode
    console.log("Repulsion mode activated");
  }
}
