// Vector class definition
class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
      this.originalX = x; // Store the original x value
      this.originalY = y; // Store the original y value
    }
  
    // Reset vector to original value
    reset() {
      this.x = this.originalX;
      this.y = this.originalY;
    }
  
    // Scale the vector by a given factor
    scale(factor) {
      this.x = this.originalX * factor;
      this.y = this.originalY * factor;
    }
  
    // Draw the vector on the canvas
    drawVector(originX, originY, color = "black") {
      stroke(color);
      strokeWeight(2);
      line(originX, originY, originX + this.x * 50, originY - this.y * 50); // Scaled for better visualization
      fill(color);
      ellipse(originX + this.x * 50, originY - this.y * 50, 7, 7); // Arrow tip
    }
  }
  
  // Initialize variables
  let vectors = [];
  let scalingFactor = 1;
  let scaleSlider;
  let resetButton;
  
  // Setup function for p5.js
  function setup() {
    createCanvas(600, 600);
    vectors.push(new Vector(2, 3)); // Vector 1
    vectors.push(new Vector(1, -2)); // Vector 2
    vectors.push(new Vector(-3, 1)); // Vector 3
  
    // Create a slider to control the scaling factor
    scaleSlider = createSlider(0.1, 3, 1, 0.1); // Min value 0.1, max value 3, default value 1, step size 0.1
    scaleSlider.position(10, height - 40); // Position slider
  
    // Create a reset button
    resetButton = createButton('Reset Vectors');
    resetButton.position(10, height - 70); // Position button
    resetButton.mousePressed(resetVectors); // Attach function to reset vectors when clicked
  }
  
  // Draw function for continuous rendering
  function draw() {
    background(240); // Clear canvas
    translate(width / 2, height / 2); // Center canvas
  
    // Update scaling factor based on the slider value
    scalingFactor = scaleSlider.value();
  
    // Draw axes
    stroke(200);
    line(-width / 2, 0, width / 2, 0); // X-axis
    line(0, -height / 2, 0, height / 2); // Y-axis
  
    // Draw each vector
    vectors.forEach((vector, index) => {
      const colors = ["blue", "green", "purple"];
      vector.drawVector(0, 0, colors[index % colors.length]);
    });
  
    // Display current scaling factor
    noStroke();
    fill(0);
    textSize(16);
    text(`Scaling Factor: ${scalingFactor.toFixed(2)}`, -width / 2 + 10, -height / 2 + 20);
    
    // Scale each vector according to the scaling factor
    vectors.forEach((vector) => vector.scale(scalingFactor));
  }
  
  // Function to reset vectors when the reset button is clicked
  function resetVectors() {
    vectors.forEach((vector) => vector.reset()); // Reset each vector to its original value
    scaleSlider.value(1); // Reset slider to 1 as well
  }
  