let velocity = 5;
let dragCoefficient = 0.1; // Drag coefficient
let airDensity = 1.2;
let objectArea = 10; // Area of the object
let position = 200; // Starting position

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(220);
  
  // Calculate drag force
  let dragForce = 0.5 * airDensity * velocity * velocity * dragCoefficient * objectArea;
  
  // Apply drag force to velocity, which decreases over time
  let acceleration = dragForce / 10; // Using a constant mass value (just for simplicity)
  velocity -= acceleration; // Reduce velocity over time
  
  // Update position based on velocity
  position += velocity;
  
  // If the object stops or moves backward, stop it
  if (velocity < 0) {
    velocity = 0;
  }
  
  // Draw the object
  ellipse(position, height / 2, 40, 40);
}
