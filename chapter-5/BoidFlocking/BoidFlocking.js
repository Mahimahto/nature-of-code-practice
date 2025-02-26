class Boid {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = p5.Vector.random2D();
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 3;
      this.maxForce = 0.05;
    }
  
    align(boids) {
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;
      
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < perceptionRadius) {
          steering.add(other.velocity);
          total++;
        }
      }
  
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    cohesion(boids) {
      let perceptionRadius = 50;
      let steering = createVector();
      let total = 0;
  
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < perceptionRadius) {
          steering.add(other.position);
          total++;
        }
      }
  
      if (total > 0) {
        steering.div(total);
        steering.sub(this.position);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    separation(boids) {
      let perceptionRadius = 25;
      let steering = createVector();
      let total = 0;
  
      for (let other of boids) {
        let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
        if (other !== this && d < perceptionRadius) {
          let diff = p5.Vector.sub(this.position, other.position);
          diff.div(d);
          steering.add(diff);
          total++;
        }
      }
  
      if (total > 0) {
        steering.div(total);
        steering.setMag(this.maxSpeed);
        steering.sub(this.velocity);
        steering.limit(this.maxForce);
      }
      return steering;
    }
  
    flock(boids) {
      let alignment = this.align(boids);
      let cohesion = this.cohesion(boids);
      let separation = this.separation(boids);
  
      alignment.mult(1);
      cohesion.mult(1);
      separation.mult(1.5);
  
      this.acceleration.add(alignment);
      this.acceleration.add(cohesion);
      this.acceleration.add(separation);
    }
  
    update() {
      this.velocity.add(this.acceleration);
      this.velocity.limit(this.maxSpeed);
      this.position.add(this.velocity);
      this.acceleration.mult(0);
    }
  
    edges() {
      if (this.position.x > width) this.position.x = 0;
      if (this.position.x < 0) this.position.x = width;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = height;
    }
  
    show() {
      fill(0, 100, 255);
      ellipse(this.position.x, this.position.y, 10, 10);
    }
  }
  
  let flock = [];
  
  function setup() {
    createCanvas(600, 400);
    for (let i = 0; i < 50; i++) {
      flock.push(new Boid(random(width), random(height)));
    }
  }
  
  function draw() {
    background(220);
  
    for (let boid of flock) {
      boid.flock(flock);
      boid.update();
      boid.edges();
      boid.show();
    }
  }
  