let startAngle = 0; // Tracks the starting angle of the wave
let deltaAngle = 0.2; // Controls the spacing of the wave

function setup() {
  createCanvas(640, 240);
}

function draw() {
  background(255);
  let angle = startAngle; // Start from the current angle

  for (let x = 0; x <= width; x += 24) {
    let y = map(sin(angle), -1, 1, 0, height); // Calculate y using sine function
    stroke(0);
    fill(127, 127);
    circle(x, y, 48); // Draw a circle at (x, y)
    angle += deltaAngle; // Increment angle for the next point
  }

  startAngle += 0.02; // Slowly shift the starting angle to animate the wave
}
