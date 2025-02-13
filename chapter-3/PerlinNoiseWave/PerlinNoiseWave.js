let startNoise = 0; // Starting value for Perlin noise
let noiseIncrement = 0.1; // Controls smoothness of the wave

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  let noiseValue = startNoise; // Initialize noise offset

  for (let x = 0; x <= width; x += 24) {
    let y = map(noise(noiseValue), 0, 1, 0, height); // Get Perlin noise value for y
    stroke(0);
    fill(127, 127);
    circle(x, y, 48); // Draw a circle at (x, y)
    noiseValue += noiseIncrement; // Increment noise for smooth transitions
  }

  startNoise += 0.02; // Move the wave forward over time
}
