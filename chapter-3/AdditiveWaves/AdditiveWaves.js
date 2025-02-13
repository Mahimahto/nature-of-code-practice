class AdditiveWave {
    constructor(numWaves) {
      this.numWaves = numWaves;
      this.startAngle = 0;
      this.speed = 0.02;
      this.amplitudes = [];
      this.wavelengths = [];
  
      // Generate random amplitudes and wavelengths for each wave
      for (let i = 0; i < numWaves; i++) {
        this.amplitudes.push(random(20, 50));
        this.wavelengths.push(random(80, 150));
      }
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
        let y = height / 2;
        
        // Sum multiple sine waves
        for (let i = 0; i < this.numWaves; i++) {
          y += this.amplitudes[i] * sin(angle * (i + 1));
        }
  
        vertex(x, y);
        angle += TWO_PI / 100;
      }
      endShape();
    }
  }
  
  let additiveWave;
  
  function setup() {
    createCanvas(640, 240);
    additiveWave = new AdditiveWave(3); // Create a wave with 3 components
  }
  
  function draw() {
    background(255);
    additiveWave.update();
    additiveWave.show();
  }
  