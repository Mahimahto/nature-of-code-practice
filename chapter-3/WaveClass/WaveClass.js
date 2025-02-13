class Wave {
    constructor(amplitude, wavelength, speed, yOffset) {
      this.amplitude = amplitude;
      this.wavelength = wavelength;
      this.speed = speed;
      this.yOffset = yOffset;
      this.startAngle = 0;
    }
  
    update() {
      this.startAngle += this.speed; // Move the wave forward
    }
  
    show() {
      let angle = this.startAngle;
      stroke(0);
      noFill();
      beginShape();
      for (let x = 0; x <= width; x += 10) {
        let y = this.yOffset + this.amplitude * sin(angle);
        vertex(x, y);
        angle += TWO_PI / this.wavelength; // Adjust angle for wavelength
      }
      endShape();
    }
  }
  
  let waves = [];
  
  function setup() {
    createCanvas(640, 240);
    waves.push(new Wave(50, 100, 0.02, height / 3)); // First wave
    waves.push(new Wave(80, 150, 0.03, (2 * height) / 3)); // Second wave
  }
  
  function draw() {
    background(255);
    for (let wave of waves) {
      wave.update();
      wave.show();
    }
  }
  