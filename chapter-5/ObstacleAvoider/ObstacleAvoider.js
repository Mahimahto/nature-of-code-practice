class Obstacle {
    constructor(x, y, r) {
      this.position = createVector(x, y);
      this.radius = r;
    }
  
    show() {
      fill(100);
      noStroke();
      ellipse(this.position.x, this.position.y, this.radius * 2);
    }
  }
  
  class ObstacleAvoider {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D().mult(2);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 3;
      this.maxForce = 0.1;
    }
  
    avoid(obstacles) {
      for (let obs of obstacles) {
        let desired = p5.Vector.sub(this.position, obs.position);
        let distance = desired.mag();
        
        if (distance < obs.radius + 30) { // If too close to obstacle
          desired.setMag(this.maxSpeed);
          let steer = p5.Vector.sub(desired, this.velocity);
          steer.limit(this.maxForce);
          this.acceleration.add(steer);
        }
      }
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    show() {
      fill(255, 0, 0);
      ellipse(this.position.x, this.position.y, 20);
    }
  }
  
  let avoider;
  let obstacles = [];
  
  function setup() {
    createCanvas(400, 400);
    avoider = new ObstacleAvoider(50, 200);
  
    // Random obstacles
    for (let i = 0; i < 5; i++) {
      obstacles.push(new Obstacle(random(width), random(height), random(20, 40)));
    }
  }
  
  function draw() {
    background(220);
  
    for (let obs of obstacles) {
      obs.show();
    }
  
    avoider.avoid(obstacles);
    avoider.update();
    avoider.show();
  }
  