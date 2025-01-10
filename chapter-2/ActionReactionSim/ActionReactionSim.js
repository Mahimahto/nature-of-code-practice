let person;
let truck;

function setup() {
  createCanvas(600, 400);
  person = new Person();
  truck = new Truck();
}

function draw() {
  background(220);

  // Apply a force to the person (push)
  let push = createVector(10, 0); // Increased push
  person.applyForce(push);
  
  // Apply the opposite force to the truck (reaction)
  let pushBack = createVector(-10, 0); // Increased reaction force
  truck.applyForce(pushBack);

  // Update and show the person and truck
  person.update();
  person.show();

  truck.update();
  truck.show();
}

class Person {
  constructor() {
    this.position = createVector(width / 2 - 100, height - 50);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 1; // Mass of the person
  }

  applyForce(force) {
    // F = m * a ==> a = F / m
    let f = force.copy();
    f.div(this.mass); // Divide by mass to apply acceleration
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
  }

  show() {
    fill(0);
    ellipse(this.position.x, this.position.y, 30, 30); // Person shape
  }
}

class Truck {
  constructor() {
    this.position = createVector(width / 2 + 100, height - 50);
    this.velocity = createVector();
    this.acceleration = createVector();
    this.mass = 5; // Truck has more mass
  }

  applyForce(force) {
    // F = m * a ==> a = F / m
    let f = force.copy();
    f.div(this.mass); // Divide by mass to apply acceleration
    this.acceleration.add(f);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0); // Reset acceleration
  }

  show() {
    fill(255, 0, 0); // Red for truck
    rect(this.position.x, this.position.y, 100, 50); // Truck shape
  }
}
