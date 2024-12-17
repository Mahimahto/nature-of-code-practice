let cols, rows;
let scl = 20; // Size of each grid square
let zoff = 0; // Perlin noise z-axis offset for animation
let flowField = [];

function setup() {
  createCanvas(600, 600);
  cols = floor(width / scl);
  rows = floor(height / scl);
  flowField = new Array(cols * rows);
  background(255);
}

function draw() {
  background(255, 20); // Fading effect for smoother visuals
  let yoff = 0; // Perlin noise y-axis offset
  for (let y = 0; y < rows; y++) {
    let xoff = 0; // Perlin noise x-axis offset
    for (let x = 0; x < cols; x++) {
      let index = x + y * cols; // Index for flowField array
      let angle = noise(xoff, yoff, zoff) * TWO_PI * 2; // Angle from Perlin noise
      let v = p5.Vector.fromAngle(angle); // Create a vector from angle
      v.setMag(1); // Set vector magnitude
      flowField[index] = v; // Save vector in the flowField array

      // Draw the vector as an arrow
      push();
      translate(x * scl, y * scl); // Move to grid point
      rotate(v.heading()); // Rotate to the vector's direction
      stroke(0);
      strokeWeight(1);
      line(0, 0, scl * 0.5, 0); // Draw arrow line
      pop();

      xoff += 0.1; // Increment x-offset for smooth noise
    }
    yoff += 0.1; // Increment y-offset for smooth noise
  }
  zoff += 0.01; // Increment z-offset to animate the field
}
