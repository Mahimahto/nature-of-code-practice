class Wanderer {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D();
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 3;
      this.wanderTheta = 0; // Random direction change ke liye angle
    }
  
    wander() {
      let wanderRadius = 50;
      let wanderDistance = 80;
      let change = 0.3; // Jitna chhota hoga, utna smooth wandering
  
      // Future position calculate karo
      let future = this.velocity.copy();
      future.setMag(wanderDistance);
      future.add(this.position);
  
      // Circular wandering ke liye
      let offset = p5.Vector.fromAngle(this.wanderTheta);
      offset.setMag(wanderRadius);
      let target = p5.Vector.add(future, offset);
  
      this.seek(target);
  
      // Wander direction thoda change karna
      this.wanderTheta += random(-change, change);
    }
  
    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      this.acceleration.add(steer);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    show() {
      fill(0, 255, 0);
      ellipse(this.position.x, this.position.y, 20, 20);
    }
  }
  
  let wanderer;
  
  function setup() {
    createCanvas(400, 400);
    wanderer = new Wanderer(width / 2, height / 2);
  }
  
  function draw() {
    background(220);
    wanderer.wander();
    wanderer.update();
    wanderer.show();
  }
  