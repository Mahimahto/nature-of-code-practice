let mover;

function setup() {
  createCanvas(600, 600);
  mover = new Mover();  // Create a new Mover object
}

function draw() {
  background(240);

  mover.update();  // Update the mover's position and velocity
  mover.checkEdges();  // Check if it crosses the canvas edges
  mover.show();  // Draw the mover
}

// Mover class to simulate motion with acceleration
class Mover {
  constructor() {
    this.position = createVector(width / 2, height / 2);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);  // Acceleration starts as zero
  }

  // Update the position based on velocity and acceleration
  update() {
    this.acceleration = createVector(0.1, 0.1);  // Simple constant acceleration
    this.velocity.add(this.acceleration);  // Add acceleration to velocity
    this.position.add(this.velocity);  // Add velocity to position
  }

  // Check if the mover crosses the canvas edges
  checkEdges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }

    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  // Display the mover as a circle
  show() {
    fill(127);
    stroke(0);
    ellipse(this.position.x, this.position.y, 48, 48);
  }
}
