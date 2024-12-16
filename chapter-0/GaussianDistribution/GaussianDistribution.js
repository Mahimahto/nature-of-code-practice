// Gaussian Random Walk Example

let x = 0;
let y = 0;
let steps = 1000;

function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();
}

function draw() {
  let stepSize = randomGaussian(); // Random step based on Gaussian distribution
  
  // Random direction (X and Y axis)
  x += stepSize * random([-1, 1]);
  y += stepSize * random([-1, 1]);

  // Set color for the points (e.g., red color)
  fill(255, 0, 0); // Red color for the points
  ellipse(x + width / 2, y + height / 2, 5, 5); // Draw the point

  // Stop after the set number of steps
  steps--;
  if (steps <= 0) {
    noLoop();
  }
}
