let walker;

function setup() {
  createCanvas(640, 240);
  walker = new Walker();
  background(255);
}

function draw() {
  walker.step();
  walker.show();
}

class Walker {
  constructor() {
    this.x = width / 2; // Starting position (center)
    this.y = height / 2;
  }

  show() {
    stroke(0);
    point(this.x, this.y); // Draw object
  }

  step() {
    // Random movement with equal probability
    let choice = floor(random(4));
    if (choice === 0) this.x++; // Right
    else if (choice === 1) this.x--; // Left
    else if (choice === 2) this.y++; // Down
    else this.y--; // Up
  }
}