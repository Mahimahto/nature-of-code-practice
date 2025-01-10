let mover;
let attractor;

function setup() {
  createCanvas(640, 480);
  mover = new Mover(300, 50, 2); // Starting position (x, y) aur mass
  attractor = new Attractor();    // Center mein attractor
}

function draw() {
  background(255);

  // Force calculate karo attractor se mover ki taraf
  let force = attractor.attract(mover);
  
  // Force apply karo mover par
  mover.applyForce(force);
  
  // Mover ko update karo (position aur velocity)
  mover.update();
  
  // Attractor aur mover ko display karo
  attractor.show();
  mover.show();
}

// Mover class
class Mover {
  constructor(x, y, mass) {
    this.position = createVector(x, y);  // Mover ka position
    this.velocity = createVector(0, 0);  // Mover ki velocity
    this.acceleration = createVector(0, 0);  // Mover ka acceleration
    this.mass = mass;  // Mover ka mass
  }

  // Force apply karo mover par
  applyForce(force) {
    let f = force.copy();  // Force ko copy karo
    f.div(this.mass);  // Mass ke according force ko adjust karo
    this.acceleration.add(f);  // Acceleration mein add karo
  }

  // Mover ko update karo
  update() {
    this.velocity.add(this.acceleration);  // Velocity update karo
    this.position.add(this.velocity);  // Position update karo
    this.acceleration.mult(0);  // Acceleration reset karo
  }

  // Mover ko show karo
  show() {
    fill(175);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.mass * 10, this.mass * 10);  // Draw the mover
  }
}

// Attractor class (Gravitational source)
class Attractor {
  constructor() {
    this.position = createVector(width / 2, height / 2);  // Attractor ka position (center mein)
    this.mass = 20;  // Attractor ka mass
  }

  // Gravitational force calculate karo
  attract(mover) {
    let force = p5.Vector.sub(this.position, mover.position);  // Attractor aur mover ke beech vector difference
    let distance = force.mag();  // Distance calculate karo
    distance = constrain(distance, 5, 25);  // Distance ko limit karo (avoid very close distance)
    
    let strength = (this.mass * mover.mass) / (distance * distance);  // Gravitational force ka strength
    force.setMag(strength);  // Force ka magnitude set karo
    return force;
  }

  // Attractor ko show karo
  show() {
    fill(200, 0, 0);
    stroke(0);
    ellipse(this.position.x, this.position.y, this.mass * 2, this.mass * 2);  // Draw the attractor
  }
}
