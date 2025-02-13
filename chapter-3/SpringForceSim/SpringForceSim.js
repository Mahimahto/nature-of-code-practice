class Bob {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.mass = 5;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass);
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    show() {
      fill(0);
      stroke(0);
      ellipse(this.position.x, this.position.y, this.mass * 5);
    }
  }
  
  class Spring {
    constructor(x, y, restLength) {
      this.anchor = createVector(x, y);
      this.restLength = restLength;
      this.k = 0.2; // Spring constant
    }
  
    connect(bob) {
      let force = p5.Vector.sub(bob.position, this.anchor);
      let currentLength = force.mag();
      let stretch = currentLength - this.restLength;
  
      force.setMag(-1 * this.k * stretch);
      bob.applyForce(force);
    }
  
    show() {
      fill(127);
      ellipse(this.anchor.x, this.anchor.y, 10);
    }
  
    showLine(bob) {
      stroke(0);
      line(this.anchor.x, this.anchor.y, bob.position.x, bob.position.y);
    }
  }
  
  let bob, spring;
  
  function setup() {
    createCanvas(400, 300);
    bob = new Bob(200, 200);
    spring = new Spring(200, 50, 150);
  }
  
  function draw() {
    background(255);
    
    let gravity = createVector(0, 0.2);
    bob.applyForce(gravity);
    
    spring.connect(bob);
    
    bob.update();
    
    spring.showLine(bob);
    spring.show();
    bob.show();
  }
  