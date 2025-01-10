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
  
  let mover1;
  let mover2;
  
  function setup() {
    createCanvas(600, 600);
    mover1 = new Mover(200, 300, 10);
    mover2 = new Mover(400, 300, 15);
  }
  
  function draw() {
    background(255);
  
    let force1 = createVector(0.1, 0); // Horizontal force on mover1
    let force2 = createVector(-0.1, 0); // Horizontal force on mover2
  
    mover1.applyForce(force1);
    mover2.applyForce(force2);
  
    mover1.update();
    mover2.update();
  
    mover1.show();
    mover2.show();
  }
  