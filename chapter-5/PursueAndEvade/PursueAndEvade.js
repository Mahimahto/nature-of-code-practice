class Agent {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(2);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 3;
    }
  
    pursue(target) {
      let futurePosition = p5.Vector.add(
        target.position,
        p5.Vector.mult(target.velocity, 10) // Target ki future position ka estimate
      );
      this.seek(futurePosition);
    }
  
    evade(target) {
      let futurePosition = p5.Vector.add(
        target.position,
        p5.Vector.mult(target.velocity, 10)
      );
      this.flee(futurePosition);
    }
  
    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
    }
  
    flee(target) {
      let desired = p5.Vector.sub(this.position, target);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    show(colorVal) {
      fill(colorVal);
      ellipse(this.position.x, this.position.y, 20, 20);
    }
  }
  
  let pursuer, target;
  
  function setup() {
    createCanvas(400, 400);
    pursuer = new Agent(50, 50);
    target = new Agent(350, 350);
  }
  
  function draw() {
    background(220);
  
    // Target (Evader) moves randomly
    let randomForce = p5.Vector.random2D().mult(0.2);
    target.acceleration.add(randomForce);
    target.evade(pursuer); // Target will try to escape
    target.update();
    target.show(color(0, 0, 255));
  
    // Pursuer tries to catch the target
    pursuer.pursue(target);
    pursuer.update();
    pursuer.show(color(255, 0, 0));
  }
  