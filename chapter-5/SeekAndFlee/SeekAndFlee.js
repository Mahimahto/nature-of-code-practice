class Agent {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 4;
    }
  
    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    show() {
      fill(255, 0, 0);
      ellipse(this.position.x, this.position.y, 20, 20);
    }
  }
  
  let agent;
  
  function setup() {
    createCanvas(400, 400);
    agent = new Agent(width / 2, height / 2);
  }
  
  function draw() {
    background(220);
    let target = createVector(mouseX, mouseY);
    agent.seek(target);
    agent.update();
    agent.show();
  }
  