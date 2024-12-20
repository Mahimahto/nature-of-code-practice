# Distance Visualization

This project visualizes the distance between the center of the canvas and the current mouse position. It dynamically updates the visual elements based on the distance in real-time, creating an engaging and interactive experience.

## Features
- **Dynamic Line:** A line connects the center to the mouse position, with thickness and color changing based on the distance.
- **Dynamic Circle:** A glowing circle is drawn around the center, with its diameter proportional to the distance.
- **Distance Display:** The distance value is displayed above the center in real-time.
- **Aesthetic Design:** The visualization includes gradient colors, smooth transitions, and a dark theme for better contrast and clarity.

## How It Works
1. **Center and Mouse Points:**
   - The center of the canvas is defined as a fixed point.
   - The mouse position is updated dynamically as the cursor moves.

2. **Distance Calculation:**
   - The distance between the center and the mouse position is calculated using the `dist()` function.

3. **Visualization Elements:**
   - A line connects the center to the mouse, with color and thickness changing based on the distance.
   - A circle around the center expands or shrinks based on the distance.
   - The distance value is displayed above the center.

## Code
```javascript
function setup() {
  createCanvas(600, 600); // Square canvas for better symmetry
}

function draw() {
  background(30, 30, 50); // Dark background for better contrast

  // Define center and mouse vectors
  let center = createVector(width / 2, height / 2);
  let mouse = createVector(mouseX, mouseY);

  // Calculate distance between center and mouse
  let distance = center.dist(mouse);

  // **Enhanced Center and Mouse Points**
  // Center point
  fill(100, 200, 255); // Light blue
  noStroke();
  ellipse(center.x, center.y, 15, 15);

  // Mouse point
  fill(255, 100, 150); // Pinkish-red
  ellipse(mouse.x, mouse.y, 15, 15);

  // **Enhanced Line Between Points**
  strokeWeight(map(distance, 0, width, 2, 8)); // Thickness increases with distance
  stroke(map(distance, 0, width, 0, 255), 150, map(distance, 0, width, 255, 100)); // Dynamic color gradient
  line(center.x, center.y, mouse.x, mouse.y);

  // **Dynamic Circle at Center**
  noFill();
  strokeWeight(2);
  stroke(255, 200, 0, 150); // Soft yellow with transparency
  ellipse(center.x, center.y, distance * 2); // Circle size proportional to distance

  // **Distance Display**
  noStroke();
  fill(255);
  textSize(20);
  textAlign(CENTER, CENTER); // Centered text
  text(`Distance: ${distance.toFixed(2)}`, center.x, center.y - 40); // Display above the center
}
```

## How to Run
1. Open a code editor like [p5.js Web Editor](https://editor.p5js.org/) or use a local development environment with p5.js.
2. Copy and paste the code into the editor.
3. Run the sketch to see the visualization.

## Customization
- **Colors:** Adjust the colors of the points, line, and circle to match your preferences.
- **Canvas Size:** Modify the canvas size in the `createCanvas()` function.
- **Distance Display:** Change the position or styling of the distance text for different layouts.

## Preview
The visualization includes:
- A glowing circle at the center.
- A gradient line connecting the center and mouse.
- Real-time distance measurement displayed above the center.
