let position; // Ball's position
let velocity; // Ball's velocity
let wind;     // Wind vector

function setup() {
  createCanvas(640, 240);

  // Initial position of the ball
  position = createVector(100, 100);

  // Initial velocity of the ball
  velocity = createVector(2, 1.5);

  // Constant wind vector
  wind = createVector(0.1, 0); // Horizontal wind pushing to the right
}

function draw() {
  background(255);

  // Apply the wind effect to the ball's velocity
  velocity.add(wind);

  // Update the ball's position
  position.add(velocity);

  // Check for bouncing off the edges
  if (position.x > width || position.x < 0) {
    velocity.x *= -1;
  }
  if (position.y > height || position.y < 0) {
    velocity.y *= -1;
  }

  // Draw the ball
  fill(127);
  stroke(0);
  circle(position.x, position.y, 48);

  // Visualize the wind vector
  drawWindVector();
}

// Helper function to draw the wind vector
function drawWindVector() {
  push();
  stroke(0, 0, 255);
  strokeWeight(2);
  fill(0, 0, 255, 100);
  translate(50, height - 50);
  line(0, 0, wind.x * 100, wind.y * 100); // Scale wind vector for visibility
  triangle(wind.x * 100, wind.y * 100, wind.x * 90 - 5, wind.y * 110, wind.x * 110, wind.y * 90);
  pop();

  noStroke();
  fill(0);
  textSize(12);
  text("Wind Vector", 20, height - 20);
}
