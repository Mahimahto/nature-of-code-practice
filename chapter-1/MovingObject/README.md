# MovingObject Project

## Overview:
This project demonstrates a basic implementation of an object moving around the canvas using **p5.js**. The object (called a **mover**) has a position and velocity, and it will wrap around the edges of the canvas when it goes off-screen. This helps visualize motion and learn how position, velocity, and the wrapping behavior work in a 2D space.

## Features:
- **Random Initial Position and Velocity**: The object starts with a random position and velocity.
- **Edge Wrapping**: When the object reaches the edge of the canvas, it wraps around to the opposite edge.
- **Continuous Movement**: The object moves continuously based on its velocity, simulating smooth motion.
- **Dynamic Updates**: Every frame, the position is updated and displayed, allowing the object to move and wrap around in real-time.

## How It Works:
1. **Velocity**: The mover's position is updated by adding its velocity vector to its current position vector.
2. **Edge Wrapping**: When the mover reaches the edge of the canvas, it wraps around to the opposite side, creating a continuous loop of movement.
3. **Visualization**: The mover is drawn as a circle, and its position is updated every frame using the `update()` and `checkEdges()` methods in the `Mover` class.

## Project Files:
- **index.html**: The HTML file that sets up the canvas.
- **sketch.js**: The JavaScript file containing the p5.js code to control the motion and display the mover.

## Installation:

### Option 1: Using p5.js Web Editor
1. Go to the [p5.js Web Editor](https://editor.p5js.org/).
2. Create a new sketch and paste the code below.
3. Click "Play" to see the mover in action.

### Option 2: Running Locally
1. Clone or download this repository to your local machine.
2. Ensure that you have [p5.js](https://p5js.org/) linked in the HTML file or download it from the official website.
3. Open the `index.html` file in a browser to run the sketch.

## Code Example:

```javascript
let mover;

function setup() {
  createCanvas(600, 600);
  mover = new Mover();  // Create a new Mover object
}

function draw() {
  background(240);  // Set the background color
  
  // Update the mover's position based on velocity
  mover.update();
  
  // Check if the mover reaches the edge and wrap around
  mover.checkEdges();
  
  // Draw the mover (a circle)
  mover.show();
}

class Mover {
  constructor() {
    // Initialize position and velocity with random values
    this.position = createVector(random(width), random(height));
    this.velocity = createVector(random(-2, 2), random(-2, 2)); // Random velocity
  }

  // Update the position based on velocity
  update() {
    this.position.add(this.velocity);
  }

  // Show the mover as a circle at the current position
  show() {
    stroke(0);  // Set stroke color
    fill(175);  // Set fill color
    circle(this.position.x, this.position.y, 48);  // Draw a circle at position
  }

  // Check if the mover reaches the edge of the canvas and wrap it around
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
}
