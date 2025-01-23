// Unified Simulation: Velocity Direction Simulation + Vehicle Simulation

let vehicles = []; // Array to hold multiple vehicles

function setup() {
  createCanvas(800, 600);

  // Create two types of vehicles: one for velocity simulation, one for user control
  vehicles.push(new VelocityVehicle(width / 4, height / 2)); // Automatic motion vehicle
  vehicles.push(new UserControlledVehicle(width * 3 / 4, height / 2)); // User-controlled vehicle
}

function draw() {
  background(220);

  for (let vehicle of vehicles) {
    vehicle.update();
    vehicle.show();
  }
}

// Class for vehicles showcasing velocity-based direction
class VelocityVehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-2, 2), random(-2, 2));
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 3;
  }

  update() {
    // Randomly apply slight acceleration to simulate natural motion
    let randomForce = p5.Vector.random2D().mult(0.05);
    this.acceleration.add(randomForce);

    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // Reset acceleration after applying forces
    this.acceleration.mult(0);

    // Wrap around canvas edges
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  show() {
    let angle = this.velocity.heading(); // Calculate rotation angle

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    fill(100, 200, 255);
    stroke(0);
    rect(0, 0, 50, 20); // Vehicle as a rectangle
    pop();
  }
}

// Class for user-controlled vehicles
class UserControlledVehicle {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = createVector(0, 0);
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 5;
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    // Handle user input for control
    if (keyIsDown(LEFT_ARROW)) {
      this.applyForce(createVector(-0.2, 0));
    }
    if (keyIsDown(RIGHT_ARROW)) {
      this.applyForce(createVector(0.2, 0));
    }
    if (keyIsDown(UP_ARROW)) {
      this.applyForce(createVector(0, -0.2));
    }
    if (keyIsDown(DOWN_ARROW)) {
      this.applyForce(createVector(0, 0.2));
    }

    // Update velocity and position
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);

    // Reset acceleration after applying forces
    this.acceleration.mult(0);

    // Wrap around canvas edges
    if (this.position.x > width) this.position.x = 0;
    if (this.position.x < 0) this.position.x = width;
    if (this.position.y > height) this.position.y = 0;
    if (this.position.y < 0) this.position.y = height;
  }

  show() {
    let angle = this.velocity.heading(); // Calculate rotation angle

    push();
    translate(this.position.x, this.position.y);
    rotate(angle);
    rectMode(CENTER);
    fill(255, 150, 100);
    stroke(0);
    rect(0, 0, 50, 20); // Vehicle as a rectangle
    pop();
  }
}
