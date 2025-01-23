let angle = Math.PI / 4;  // Initial angle (45 degrees)
let angleVelocity = 0;    // Initial angular velocity (no movement initially)
let angleAcceleration = 0;  // Initial angular acceleration
let damping = 0.995;       // Damping factor to gradually reduce movement
let length = 200;         // Length of the pendulum
let gravity = 0.4;        // Gravity constant

function setup() {
  createCanvas(640, 360);  // Set the size of the canvas
}

function draw() {
  background(255);  // Set background to white

  // Calculate angular acceleration based on gravity and the length of the pendulum
  angleAcceleration = (-gravity / length) * sin(angle);

  // Update angular velocity and angle
  angleVelocity += angleAcceleration;  // Update velocity based on acceleration
  angleVelocity *= damping;            // Apply damping to slow down the pendulum over time
  angle += angleVelocity;              // Update angle based on velocity

  // Pendulum mechanics: draw the pendulum
  let x = length * sin(angle);   // X position of the pendulum bob
  let y = length * cos(angle);   // Y position of the pendulum bob

  // Draw the pendulum (string and bob)
  translate(width / 2, height / 4);  // Move origin to the center of the top of the pendulum
  stroke(0);
  line(0, 0, x, y);  // Draw the string
  fill(127);
  ellipse(x, y, 40, 40);  // Draw the bob (circle)

  // Optionally, you can draw a circle at the pivot point for reference
  fill(0);
  ellipse(0, 0, 10, 10);  // Pivot point
}
