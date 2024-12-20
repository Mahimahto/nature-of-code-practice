let mover;

function setup() {
  createCanvas(600, 600);
  mover = new Mover(); // Create a new Mover object
}

function draw() {
  background(240);

  // Update the mover's position
  mover.update();
  
  // Check if the mover goes off the canvas and wraps it around
  mover.checkEdges();

  // Show the mover on the canvas
  mover.show();
}

class Mover {
  constructor() {
    // Initialize position and velocity with random values
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2)); // Random velocity
  }

  update() {
    // Update the position by adding velocity to it
    this.position.add(this.velocity);
  }

  show() {
    // Draw the mover as a circle at the current position
    stroke(0);
    fill(175);
    circle(this.position.x, this.position.y, 48);
  }

  checkEdges() {
    // Wrap the mover around the edges of the canvas
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
}
