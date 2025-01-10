let mover;
let attractor;

function setup() {
  createCanvas(640, 240);
  mover = new Mover(300, 50, 2); // Initial position and mass
  attractor = new Attractor();   // Create attractor at center
}

function draw() {
  background(255);

  let force = attractor.customAttract(mover);  // Calculate the gravitational force
  mover.applyForce(force);   // Apply the force to the mover
  mover.update();            // Update the position of the mover
  attractor.show();          // Display the attractor
  mover.show();              // Display the mover
}

// Mover class definition
class Mover {
  constructor(x, y, mass) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.mass = mass;
  }

  applyForce(force) {
    let f = force.copy();
    f.div(this.mass);
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);  // Reset acceleration after each update
  }

  show() {
    fill(0);
    noStroke();
    ellipse(this.position.x, this.position.y, this.mass * 16, this.mass * 16); // Visual representation
  }
}

// Attractor class definition
class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2); // Attractor at center of canvas
    this.mass = 20;   // Mass of the attractor
    this.G = 1;       // Gravitational constant
  }

  customAttract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);  // Force is vector pointing towards the attractor
    let distance = force.mag();  // Get the magnitude of the distance
    distance = constrain(distance, 5, 25);  // Avoid too small or large values
    force.normalize();  // Normalize the force direction
    let strength = (this.G * this.mass * mover.mass) / (distance * distance);  // Gravitational force formula
    force.mult(strength);  // Scale the force by strength
    return force;
  }

  show() {
    fill(255, 0, 0);  // Color for the attractor
    noStroke();
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);  // Visual representation
  }
}
