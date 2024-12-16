// Dynamic_Random_Walker.js

let walker;  // To hold the walker object

function setup() {
  createCanvas(400, 400);
  walker = new Walker();  // Create a new walker object
}

function draw() {
  background(220, 220, 220, 10);  // Add transparency (last number is the alpha value)
  
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
    this.stepSize = 5;  // How far it moves in each step
  }

  // Function to update the walker's position
  update() {
    // Pick a random number to decide movement with weighted probability
    let r = random(1);
    
    if (r < 0.4) {
      this.x += this.stepSize;  // 40% chance to move right
    } else if (r < 0.6) {
      this.x -= this.stepSize;  // 20% chance to move left
    } else if (r < 0.8) {
      this.y += this.stepSize;  // 20% chance to move down
    } else {
      this.y -= this.stepSize;  // 20% chance to move up
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
