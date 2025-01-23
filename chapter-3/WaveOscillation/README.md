# Wave Oscillation Simulation

## Overview

This project demonstrates the concept of wave oscillation using the sine function in p5.js. The wave oscillates horizontally, simulating natural wave behavior. The project allows you to interact with the wave's amplitude and frequency using your mouse, giving you control over the wave's appearance in real-time.

### Features:
- **Sine Wave Oscillation**: A smooth sine wave oscillates across the canvas, driven by an angular force.
- **Interactivity**: The amplitude of the wave can be controlled with the horizontal mouse movement, and the frequency can be adjusted with the vertical mouse movement.
- **Damping**: The wave gradually slows down over time, simulating damping in oscillations.
- **Reset on Spacebar**: Press the **spacebar** to reset the wave to its initial state.

### How It Works:
1. The wave is generated using the sine function, which creates smooth, periodic oscillations.
2. The **amplitude** of the wave increases and decreases based on the horizontal position of the mouse (`mouseX`), giving you control over the wave's height.
3. The **frequency** of the wave is adjusted based on the vertical position of the mouse (`mouseY`), allowing you to speed up or slow down the wave's oscillation.
4. The **damping** factor slowly reduces the wave's velocity, causing it to eventually settle.

### Controls:
- **Mouse**: Move your mouse to control the amplitude and frequency of the wave.
- **Spacebar**: Press the spacebar to reset the wave.

## Installation:
1. Clone or download this repository to your local machine.
2. Make sure you have [p5.js](https://p5js.org/) installed or include it in your HTML file.
3. Open `waveOscillation.js` in a web browser or p5.js web editor to run the project.

## Example Screenshot:

![Wave Oscillation Screenshot](example_wave.png)

## License:
This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.
