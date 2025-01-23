let angle = 0;
let angleVelocity = 0;
let angleAcceleration = 0;
let damping = 0.99;  // Damping factor to slow down the oscillation over time

let waveLength = 200;  // Wave length for oscillation
let waveSpeed = 0.05;  // Speed at which the wave moves
let amplitude = 100;   // Amplitude of the wave
let frequency = 0.05;  // Frequency of the wave

function setup() {
  createCanvas(640, 360);
  angle = PI / 4;  // Initial angle for oscillation
  angleVelocity = 0;
  angleAcceleration = 0;
}

function draw() {
  background(255);

  // Draw oscillating wave
  stroke(0);
  noFill();
  beginShape();
  for (let x = 0; x < width; x++) {
    let y = height / 2 + sin(angle + x * waveSpeed) * amplitude;
    vertex(x, y);
  }
  endShape();

  // Update angle for oscillation and apply damping
  angleVelocity += angleAcceleration;
  angle += angleVelocity;
  angleAcceleration = -0.1 * sin(angle);  // Force that drives the oscillation
  angleVelocity *= damping;  // Apply damping to reduce the speed over time

  // Dynamic controls: Adjust amplitude with mouse position
  amplitude = map(mouseX, 0, width, 50, 200);
  frequency = map(mouseY, 0, height, 0.01, 0.1);  // Higher Y means lower frequency
}

function keyPressed() {
  if (keyCode === 32) {  // Spacebar key
    // Reset the wave parameters on spacebar press
    angle = PI / 4;
    angleVelocity = 0;
    angleAcceleration = 0;
  }
}
