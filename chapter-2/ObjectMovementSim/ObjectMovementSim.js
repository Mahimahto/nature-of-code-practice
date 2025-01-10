class Mover {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    applyForce(force) {
      let f = force.copy();
      f.div(this.mass);
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);  // Reset acceleration
    }
  
    show() {
      fill(175);
      circle(this.position.x, this.position.y, this.mass * 16);
    }
  }
  
  function setup() {
    createCanvas(600, 600);
    mover = new Mover(300, 300, 10);
  }
  
  function draw() {
    background(255);
  
    let gravity = createVector(0, 0.1 * mover.mass); // Gravity force
    mover.applyForce(gravity);
  
    mover.update();
    mover.show();
  }
  