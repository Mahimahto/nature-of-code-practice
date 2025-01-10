let ball;

function setup() {
  createCanvas(600, 400);
  ball = new Ball();
}

function draw() {
  background(220);
  
  let gravity = createVector(0, 0.2); // Downward force
  ball.applyForce(gravity);
  
  ball.update();
  ball.edges();
  ball.show();
}

class Ball {
  constructor() {
    this.position = createVector(width / 2, 50);
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
    if (this.position.y > height) {
      this.position.y = height;
      this.velocity.y *= -0.9; // Reverse and reduce velocity
    }
  }
  
  show() {
    fill(0);
    ellipse(this.position.x, this.position.y, 30);
  }
}
