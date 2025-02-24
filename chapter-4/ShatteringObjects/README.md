# Shattering Objects Simulation

## Overview
This project simulates objects that shatter into multiple pieces when clicked. Each object is a solid square that breaks into smaller pieces upon interaction, gradually fading away until disappearing completely.

## Features
- Objects remain static until clicked.
- Clicking on an object causes it to break into smaller shards.
- Shards have random velocities and gradually fade out.
- Once all shards disappear, the object is removed from the simulation.

## How It Works
- **ShatteringObject Class:** Represents the main object that can be shattered.
- **Shard Class:** Represents individual fragments that result from shattering.
- **Interaction:** Clicking within the bounds of an object triggers its shatter function.
- **Lifecycle Management:** Shards fade out over time, and once all shards disappear, the object is removed from the simulation.

## Controls
- **Mouse Click:** Click on an object to shatter it.

## Code Explanation
1. **ShatteringObject Class:**
   - Stores the object's position and size.
   - Handles the shatter process and manages shards.
   - Removes itself from the simulation when all shards disappear.

2. **Shard Class:**
   - Moves with random velocity after being created.
   - Gradually fades until it disappears.

3. **Mouse Interaction:**
   - Checks if the click is within an object's boundaries.
   - Calls the `shatter()` function to break the object into shards.

## Installation & Usage
1. Copy the provided code into a `p5.js` environment.
2. Run the script and click on objects to see them shatter.

## Future Enhancements
- Add more shapes (circles, triangles) that shatter.
- Introduce physics-based interactions between shards.
- Implement sound effects for a more immersive experience.

