# ThrusterParticles

## Overview
ThrusterParticles is a simple physics-based simulation where a spaceship moves and emits particles from its thrusters whenever a thrust force is applied. The project demonstrates the use of forces, velocity, acceleration, and particle systems in motion simulation.

## Features
- A spaceship that can move forward and rotate.
- A thruster system that emits particles in the opposite direction of motion.
- Particle lifespan control, making them fade over time.
- Dynamic physics-based movement using vectors.

## Controls
- **Up Arrow (↑):** Apply thrust to move the spaceship forward.
- **Left Arrow (←):** Rotate the spaceship counterclockwise.
- **Right Arrow (→):** Rotate the spaceship clockwise.

## Mechanics
- The spaceship follows Newtonian motion principles.
- Applying thrust adds force in the direction the spaceship is facing.
- Particles are generated when thrust is applied and move in the opposite direction of the thrust.
- The particles fade out and get removed when their lifespan ends.

## Expected Output
- The spaceship starts at the center of the canvas.
- When thrust is applied, it moves in the direction it is facing, leaving behind particles.
- The particles gradually fade and disappear.
- The spaceship can turn left or right to change its direction.

## Technologies Used
- p5.js (for rendering and animation)
- JavaScript (for logic and interactivity)

## Installation
1. Clone the repository or download the files.
2. Open `index.html` in a browser.
3. Use the arrow keys to control the spaceship.

## Future Improvements
- Add collision detection.
- Implement gravitational forces.
- Introduce fuel constraints for more realistic movement.

This project serves as an example of how simple physics concepts can be used to create engaging visual simulations.

