let angle = 0;              // Initial angle of the cannonball
let angleVelocity = 0;      // Initial angular velocity of the cannonball
let angleAcceleration = 0;  // Initial angular acceleration (can be changed with external force)
let gravity = 0.1;          // Gravity constant (affects the downward force)
let speed = 10;             // Initial speed of the cannonball
let x, y;                   // Position of the cannonball
let velocityX, velocityY;  // Velocity components of the cannonball (horizontal and vertical)

function setup() {
  createCanvas(640, 360);  // Set canvas size
  x = 50;                  // Starting x position of the cannonball
  y = height - 50;         // Starting y position (just above the ground)
  velocityX = speed * cos(angle);  // Initial horizontal velocity
  velocityY = speed * sin(angle);  // Initial vertical velocity
}

function draw() {
  background(255);  // Set background color to white

  // Update the position based on velocity
  x += velocityX;
  y += velocityY;

  // Apply gravity to the vertical velocity
  velocityY += gravity;

  // Draw the cannonball (as a circle)
  fill(127);
  noStroke();
  ellipse(x, y, 30, 30);

  // Draw the cannon (just for visual reference)
  stroke(0);
  line(50, height - 50, x, y);  // Line from cannon to the cannonball

  // Spin the cannonball (rotation effect)
  angleVelocity += angleAcceleration;  // Update the angular velocity
  angle += angleVelocity;  // Apply the angle to the rotation

  // Draw the rotating cannonball
  push();  // Save the current drawing state
  translate(x, y);  // Move the origin to the cannonball position
  rotate(angle);    // Rotate the cannonball based on the angle
  fill(0);
  ellipse(0, 0, 30, 30);  // Draw the rotated cannonball
  pop();  // Restore the previous drawing state
}

function keyPressed() {
  // When the space key is pressed, launch the cannonball
  if (keyCode === 32) {  // Spacebar key
    velocityX = speed * cos(angle);  // Reset horizontal velocity
    velocityY = speed * sin(angle);  // Reset vertical velocity
  }
}
