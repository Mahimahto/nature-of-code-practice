# AngularMotionParticles

## Description
This project simulates a particle system where each particle has **angular motion**. Instead of using the `map()` function for angles, the particles have their own **angular velocity** and **angular acceleration**.

## Features
- Particles move with a **random velocity**.
- Each particle has **angular velocity and acceleration**, making them **rotate** as they move.
- The particles fade out over time and get removed when their lifespan ends.

## How It Works
1. A new particle is created at the center.
2. The particle moves upwards while rotating.
3. The angular velocity changes over time due to angular acceleration.
4. The particle fades and eventually disappears.

## Controls
- The particle system continuously generates particles at the center.

## Future Improvements
- Allow user interaction to change angular velocity.
- Add different shapes for better visual effects.
