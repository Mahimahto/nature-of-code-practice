# Limited Particle System

## Description
This project implements a particle system where each emitter has a limited lifespan. When an emitter is created, it can only generate a maximum number of particles. Once all particles have faded out, the emitter is removed from the system automatically.

## Features
- Each emitter has a maximum number of particles it can generate.
- Particles fade out over time and get removed when their lifespan ends.
- Emitters are created at the mouse position on click.
- When an emitter runs out of particles, it is removed from the system.

## How It Works
1. Clicking anywhere on the canvas creates a new particle system at that location.
2. The particle system continuously adds particles until it reaches its limit.
3. Each particle has a random velocity and slowly fades away.
4. When all particles in a system have disappeared, the system itself is removed.

## Code Structure
- **Particle Class**: Represents individual particles with movement, fading effect, and lifespan control.
- **ParticleSystem Class**: Manages a group of particles and ensures the system removes itself when empty.
- **setup() & draw()**: Handles creating and updating all active particle systems.
- **mousePressed()**: Creates new emitters at the mouse location when clicked.

## Usage
1. Open the project in a p5.js environment.
2. Click anywhere on the canvas to generate a particle system.
3. Observe the particles fade and disappear over time.
4. The emitter gets removed once it has no particles left.

## Dependencies
- p5.js library

## Possible Enhancements
- Add color variation to particles.
- Introduce gravity or wind effects.
- Experiment with different shapes instead of circles.

Enjoy experimenting with particle systems! 🚀

