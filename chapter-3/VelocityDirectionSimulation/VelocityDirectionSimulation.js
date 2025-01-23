let car;

function setup() {
  createCanvas(600, 400);
  car = new Car(width / 2, height / 2);
}

function draw() {
  background(220);

  car.update();
  car.show();
}

class Car {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.angle = 0;
  }

  update() {
    // Handle movement based on arrow keys
    if (keyIsDown(LEFT_ARROW)) {
      this.acceleration.x = -0.1;
    } else if (keyIsDown(RIGHT_ARROW)) {
      this.acceleration.x = 0.1;
    } else {
      this.acceleration.x = 0;
    }

    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);

    // Calculate the angle based on velocity direction
    this.angle = this.velocity.heading();
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);  // Rotate according to the velocity direction
    fill(175);
    noStroke();
    rectMode(CENTER);
    rect(0, 0, 50, 20);  // Draw the car (rectangle)
    pop();
  }
}
