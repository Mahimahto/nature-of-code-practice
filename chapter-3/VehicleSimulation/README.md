# Unified Simulation: Velocity Direction Simulation + Vehicle Simulation

This project combines two types of simulations into a single interactive canvas:

1. **Velocity-Based Vehicle Simulation**: A vehicle that moves automatically and demonstrates direction based on its velocity vector.
2. **User-Controlled Vehicle Simulation**: A vehicle controlled by the user using arrow keys.

## Features

- **Velocity-Based Vehicle**:
  - Simulates random motion with smooth directional changes.
  - Wraps around the edges of the canvas.
  - Visual representation of direction based on velocity.

- **User-Controlled Vehicle**:
  - Controlled using arrow keys (UP, DOWN, LEFT, RIGHT).
  - Acceleration changes the velocity and direction of movement.
  - Wraps around the edges of the canvas.

## Controls

- **Arrow Keys**:
  - `UP`: Move the user-controlled vehicle upward.
  - `DOWN`: Move the user-controlled vehicle downward.
  - `LEFT`: Move the user-controlled vehicle leftward.
  - `RIGHT`: Move the user-controlled vehicle rightward.

## How It Works

- **Velocity-Based Vehicle**:
  - Applies a small random force at each frame to simulate natural movement.
  - Updates its velocity and position based on acceleration and velocity vectors.
  - Rotates to face the direction of motion.

- **User-Controlled Vehicle**:
  - Acceleration is applied based on user input (arrow keys).
  - Updates its velocity and position based on acceleration and velocity vectors.
  - Rotates to face the direction of motion.

## Code Structure

- `VelocityVehicle` Class:
  - Handles the automatic motion of the velocity-based vehicle.
  - Manages random acceleration and wraps around edges.

- `UserControlledVehicle` Class:
  - Handles user input and controlled motion.
  - Updates position and velocity based on user-applied forces.

- **Main Code**:
  - Initializes two vehicles: one for automatic motion and one for user control.
  - Continuously updates and displays both vehicles on the canvas.

## Setup and Run Instructions

1. Ensure you have the [p5.js library](https://p5js.org/) installed or linked in your project.
2. Copy the code into an HTML file or run it directly in the p5.js web editor.
3. Use the arrow keys to control the user-controlled vehicle while observing the automatic movement of the velocity-based vehicle.

## Visualization

- Vehicles are represented as rectangles.
- The orientation of each rectangle shows the direction of motion.
- Colors differentiate between the two vehicle types:
  - **Velocity-Based Vehicle**: Blue.
  - **User-Controlled Vehicle**: Orange.

## Potential Enhancements

- Add obstacles or boundaries to navigate around.
- Include acceleration limits for more realistic movement.
- Implement additional user-controlled vehicles or autonomous behaviors.