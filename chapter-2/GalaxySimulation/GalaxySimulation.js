class Body {
    constructor(x, y, mass, velocity) {
      this.position = createVector(x, y);
      this.velocity = velocity || createVector(0, 0);
      this.acceleration = createVector(0, 0);
      this.mass = mass;
    }
  
    attract(other) {
      let force = p5.Vector.sub(this.position, other.position); // Direction of force
      let distance = constrain(force.mag(), 20, 200); // Constrain distance for stability
      let strength = (G * this.mass * other.mass) / (distance * distance); // Gravitational force formula
      force.setMag(strength); // Set magnitude of force
      return force.mult(-1); // Negative because this attracts the other
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
  
    show() {
      fill(0, 100, 255);
      noStroke();
      ellipse(this.position.x, this.position.y, this.mass * 5); // Draw body
    }
  }
  
  let bodies = [];
  let centralBody;
  const G = 1; // Gravitational constant
  
  function setup() {
    createCanvas(600, 600);
    
    // Create a central massive body (galactic center)
    centralBody = new Body(width / 2, height / 2, 50);
    
    // Create smaller bodies orbiting the center
    for (let i = 0; i < 100; i++) {
      let angle = random(TWO_PI); // Random angle for circular positioning
      let distance = random(50, 300); // Random distance from the center
      let x = centralBody.position.x + cos(angle) * distance;
      let y = centralBody.position.y + sin(angle) * distance;
      
      // Calculate orbital velocity (circular orbit formula)
      let speed = sqrt((G * centralBody.mass) / distance);
      let velocity = createVector(-sin(angle) * speed, cos(angle) * speed);
      
      let mass = random(1, 5); // Small mass for each body
      bodies.push(new Body(x, y, mass, velocity));
    }
  }
  
  function draw() {
    background(30);
    
    // Show and update central body
    fill(255, 200, 0);
    ellipse(centralBody.position.x, centralBody.position.y, centralBody.mass * 5);
    
    // Update and display orbiting bodies
    for (let body of bodies) {
      let force = centralBody.attract(body); // Central body attracts all other bodies
      body.applyForce(force);
      
      body.update();
      body.show();
    }
  }
  