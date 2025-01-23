# Velocity Direction Simulation

This project simulates the movement of a car that can be controlled using the left and right arrow keys. The car points in the direction of its movement based on its velocity vector.

## Description

In this simulation, a car is represented by a rectangle. The car accelerates either to the left or right depending on whether the left or right arrow key is pressed. As the car moves, it rotates to point in the direction of its velocity, which is calculated using basic trigonometry principles, specifically the `atan2()` function and `heading()` method.

The simulation uses the p5.js library to handle the canvas and rendering of the car's movement and rotation.

## Features

- **Movement:** The car accelerates left or right with arrow keys.
- **Rotation:** The car rotates according to the direction of its velocity.
- **Basic physics:** Uses simple vector math to simulate velocity and movement.

## Controls

- **Left Arrow:** Accelerates the car to the left.
- **Right Arrow:** Accelerates the car to the right.

## Technologies Used

- p5.js: A JavaScript library for creative coding that simplifies drawing and animating on a web canvas.

## How to Run

1. Clone the repository.
2. Open the project in your preferred text editor.
3. Open the HTML file in a browser that supports JavaScript and p5.js.

## License

This project is open-source and available under the [MIT License](LICENSE).
