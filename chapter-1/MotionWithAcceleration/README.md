# Motion with Acceleration

This project simulates motion with constant acceleration using p5.js. The movement of an object (represented as a circle) is influenced by a simple acceleration, and the object’s position is updated over time based on its velocity. The object wraps around the edges of the canvas when it reaches the boundaries, creating a continuous motion.

## Features:
- **Constant Acceleration**: The object accelerates in a constant direction, resulting in increasing velocity over time.
- **Position Update**: The object’s position is updated by adding the current velocity to its position.
- **Edge Wrapping**: When the object reaches the canvas boundaries, it reappears from the opposite edge (both horizontally and vertically).
- **Smooth Motion**: The object continuously moves in a smooth and natural way.

## How it Works:
1. **Position**: The object starts at the center of the canvas.
2. **Velocity**: The object has an initial velocity of zero.
3. **Acceleration**: A constant acceleration of `0.1` is applied to the object’s velocity in both the x and y directions.
4. **Edge Behavior**: When the object reaches the edge of the canvas, it wraps around to the other side, creating a looping effect.
5. **Display**: The object is displayed as a circle on the canvas, and its position updates every frame.

## Usage:
1. Clone this repository or download the code.
2. Open the `index.html` file in a browser to view the simulation.
3. Modify the acceleration and other parameters in the code to experiment with different behaviors.

## Example Output:
The object starts at the center and moves with constant acceleration. When it hits the canvas boundaries, it wraps around to the other side.

## Dependencies:
- [p5.js](https://p5js.org/) - A JavaScript library that makes coding graphics and interactive content simple.

