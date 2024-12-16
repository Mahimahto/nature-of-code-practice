let walker;  // To hold the walker object

function setup() {
  createCanvas(400, 400);
  walker = new Walker();  // Create a new walker object
}

function draw() {
  background(220);
  
  // Update the walker's position
  walker.update();
  
  // Display the walker on the canvas
  walker.display();
}

// Walker class to define the random walker
class Walker {
  constructor() {
    this.x = width / 2;  // Start position in the middle of canvas
    this.y = height / 2;
    this.stepSizeMean = 5;  // Mean for the step size
    this.stepSizeStdDev = 2;  // Standard deviation for the step size
  }

  // Function to update the walker's position using Gaussian distribution for step size
  update() {
    let stepSize = randomGaussian(this.stepSizeMean, this.stepSizeStdDev);  // Gaussian step size
    
    // Pick a random direction to move
    let choice = floor(random(4));
    
    // Move the walker in one of the four directions
    if (choice === 0) {
      this.x += stepSize; // Move right
    } else if (choice === 1) {
      this.x -= stepSize; // Move left
    } else if (choice === 2) {
      this.y += stepSize; // Move down
    } else {
      this.y -= stepSize; // Move up
    }

    // Make sure the walker doesn't go outside the canvas
    this.x = constrain(this.x, 0, width);
    this.y = constrain(this.y, 0, height);
  }

  // Function to display the walker on the canvas
  display() {
    fill(0);
    noStroke();
    ellipse(this.x, this.y, 10, 10);  // Draw a small circle at the walker's position
  }
}
