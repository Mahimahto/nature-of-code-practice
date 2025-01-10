class Creature {
    constructor(x, y, mass) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-1, 1), random(-1, 1));
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    applyForce(force) {
      let f = p5.Vector.div(force, this.mass); // F = ma -> a = F/m
      this.acceleration.add(f);
    }
  
    update() {
      this.velocity.add(this.acceleration); // Update velocity
      this.position.add(this.velocity); // Update position
      this.acceleration.mult(0); // Reset acceleration
    }
  
    edges() {
      // Wrap around the screen edges
      if (this.position.x > width) this.position.x = 0;
      if (this.position.x < 0) this.position.x = width;
      if (this.position.y > height) this.position.y = 0;
      if (this.position.y < 0) this.position.y = height;
    }
  
    show() {
      fill(50, 150, 50);
      noStroke();
      ellipse(this.position.x, this.position.y, this.mass * 10);
    }
  }
  
  let creatures = [];
  let food = [];
  let predators = [];
  const numCreatures = 10;
  const numFood = 5;
  const numPredators = 2;
  
  function setup() {
    createCanvas(600, 600);
  
    // Create creatures
    for (let i = 0; i < numCreatures; i++) {
      creatures.push(new Creature(random(width), random(height), random(2, 5)));
    }
  
    // Create food
    for (let i = 0; i < numFood; i++) {
      food.push(createVector(random(width), random(height)));
    }
  
    // Create predators
    for (let i = 0; i < numPredators; i++) {
      predators.push(new Creature(random(width), random(height), random(5, 8)));
    }
  }
  
  function draw() {
    background(220);
  
    // Show food
    for (let f of food) {
      fill(200, 100, 0);
      noStroke();
      ellipse(f.x, f.y, 8);
    }
  
    // Update creatures
    for (let c of creatures) {
      // Attraction towards food
      for (let f of food) {
        let force = p5.Vector.sub(f, c.position); // Direction towards food
        let distance = constrain(force.mag(), 5, 100); // Limit distance
        force.setMag((0.5 * c.mass) / distance); // Attraction force
        c.applyForce(force);
      }
  
      // Repulsion from predators
      for (let p of predators) {
        let force = p5.Vector.sub(c.position, p.position); // Direction away from predator
        let distance = constrain(force.mag(), 5, 100); // Limit distance
        force.setMag((1 * c.mass) / (distance * distance)); // Repulsion force
        c.applyForce(force);
      }
  
      c.update();
      c.edges();
      c.show();
    }
  
    // Update predators
    for (let p of predators) {
      // Attraction towards creatures
      for (let c of creatures) {
        let force = p5.Vector.sub(c.position, p.position); // Direction towards creature
        let distance = constrain(force.mag(), 5, 100); // Limit distance
        force.setMag((0.8 * p.mass) / distance); // Attraction force
        p.applyForce(force);
      }
  
      p.update();
      p.edges();
      fill(200, 0, 0);
      noStroke();
      ellipse(p.position.x, p.position.y, p.mass * 10); // Show predator
    }
  }
  