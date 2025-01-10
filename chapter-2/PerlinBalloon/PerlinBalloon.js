let balloon;

function setup() {
  createCanvas(600, 400);
  balloon = new Balloon();
}

function draw() {
  background(220);
  
  let gravity = createVector(0, -0.05); // Upward buoyant force
  let wind = createVector(noise(frameCount * 0.01) - 0.5, 0); // Perlin noise wind
  
  balloon.applyForce(gravity);
  balloon.applyForce(wind);
  
  balloon.update();
  balloon.edges();
  balloon.show();
}

class Balloon {
  constructor() {
    this.position = createVector(width / 2, height - 50);
    this.velocity = createVector();
    this.acceleration = createVector();
  }
  
  applyForce(force) {
    this.acceleration.add(force);
  }
  
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }
  
  edges() {
    if (this.position.y < 0) {
      this.position.y = 0;
      this.velocity.y *= -0.8; // Bounce downward
    }
  }
  
  show() {
    fill(200, 0, 200);
    ellipse(this.position.x, this.position.y, 40);
  }
}
