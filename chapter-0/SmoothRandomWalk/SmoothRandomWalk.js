let x = 0;
let y = 0;
let steps = 1000;
let noiseFactor = 0; // Used for Perlin noise

function setup() {
  createCanvas(400, 400);
  background(255);
  noStroke();
}

function draw() {
  let stepSize = randomGaussian(); // Random step size based on Gaussian distribution
  
  // Perlin noise for smoother random direction
  let noiseX = map(noise(noiseFactor), 0, 1, -1, 1);
  let noiseY = map(noise(noiseFactor + 1000), 0, 1, -1, 1);

  x += stepSize * noiseX;
  y += stepSize * noiseY;

  // Draw the point
  fill(0, 100, 255); // Color for the point
  ellipse(x + width / 2, y + height / 2, 5, 5);

  // Update noise factor for smooth transitions
  noiseFactor += 0.01;

  // Stop after the set number of steps
  steps--;
  if (steps <= 0) {
    noLoop();
  }
}
