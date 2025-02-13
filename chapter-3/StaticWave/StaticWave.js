let angle = 0;          // Starting angle for the wave
let deltaAngle = 0.2;   // Change in angle for each step (affects wavelength)
let amplitude = 100;    // Height of the wave

function setup() {
  createCanvas(640, 240);  // Set up the canvas size
  background(255);         // White background
  stroke(0);               // Black outline for circles
  fill(127, 127);          // Gray fill with some transparency

  for (let x = 0; x <= width; x += 24) {  // Loop through x-axis with steps of 24 pixels
    let y = amplitude * sin(angle);       // Calculate y using sine function
    circle(x, y + height / 2, 48);        // Draw circle at (x, y) with diameter 48
    angle += deltaAngle;                  // Increase angle for the next x position
  }
}
