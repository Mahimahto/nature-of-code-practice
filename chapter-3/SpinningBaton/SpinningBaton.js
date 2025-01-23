let angle = 0;            // Initial angle of the baton
let angleVelocity = 0;    // Speed at which the baton is rotating
let angleAcceleration = 0.01;  // How fast the rotation speed is increasing

function setup() {
  createCanvas(640, 240);  // Set the size of the canvas
}

function draw() {
  background(255);   // Set background color to white
  translate(width / 2, height / 2);  // Set the origin of rotation to the center of the canvas

  // Rotate the baton based on the angle
  rotate(angle);

  // Draw the baton as a line
  stroke(0);    // Set the line color to black
  line(-60, 0, 60, 0);   // Draw the baton (a horizontal line)
  circle(60, 0, 16);     // Add a circle at the end of the baton

  // Update the angle velocity and angle for rotation
  angleVelocity += angleAcceleration;  // Increase the speed of rotation
  angle += angleVelocity;  // Apply the updated rotation to the angle
}
