let agents = [];
let numAgents = 50;
let obstacles = [];
let target;

function setup() {
  createCanvas(800, 600);
  target = createVector(width / 2, height / 2);
  
  for (let i = 0; i < numAgents; i++) {
    agents.push(new Agent(random(width), random(height)));
  }
  
  for (let i = 0; i < 5; i++) {
    obstacles.push(createVector(random(width), random(height)));
  }
}

function draw() {
  background(30);
  
  // Draw obstacles
  fill(150, 0, 0);
  for (let obs of obstacles) {
    ellipse(obs.x, obs.y, 40, 40);
  }
  
  // Draw target
  fill(0, 255, 0);
  ellipse(target.x, target.y, 20, 20);

  for (let agent of agents) {
    agent.swarm(agents, obstacles, target);
    agent.update();
    agent.show();
  }
}

// Click to move target
function mousePressed() {
  target.set(mouseX, mouseY);
}

class Agent {
  constructor(x, y) {
    this.position = createVector(x, y);
    this.velocity = p5.Vector.random2D();
    this.acceleration = createVector(0, 0);
    this.maxSpeed = 3;
    this.maxForce = 0.1;
  }

  swarm(agents, obstacles, target) {
    let separation = this.separate(agents);
    let alignment = this.align(agents);
    let cohesion = this.cohere(agents);
    let seekForce = this.seek(target);
    let avoidObstacles = this.avoidObstacles(obstacles);

    separation.mult(1.5);
    alignment.mult(1.0);
    cohesion.mult(1.0);
    seekForce.mult(1.2);
    avoidObstacles.mult(2.0);

    this.applyForce(separation);
    this.applyForce(alignment);
    this.applyForce(cohesion);
    this.applyForce(seekForce);
    this.applyForce(avoidObstacles);
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.velocity.limit(this.maxSpeed);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
  }

  seek(target) {
    let desired = p5.Vector.sub(target, this.position);
    desired.setMag(this.maxSpeed);
    let steer = p5.Vector.sub(desired, this.velocity);
    steer.limit(this.maxForce);
    return steer;
  }

  separate(agents) {
    let desiredSeparation = 25;
    let steer = createVector(0, 0);
    let count = 0;

    for (let other of agents) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < desiredSeparation) {
        let diff = p5.Vector.sub(this.position, other.position);
        diff.normalize();
        diff.div(d);
        steer.add(diff);
        count++;
      }
    }

    if (count > 0) steer.div(count);
    if (steer.mag() > 0) {
      steer.setMag(this.maxSpeed);
      steer.sub(this.velocity);
      steer.limit(this.maxForce);
    }
    return steer;
  }

  align(agents) {
    let neighborDist = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of agents) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.velocity);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      sum.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(sum, this.velocity);
      steer.limit(this.maxForce);
      return steer;
    } else {
      return createVector(0, 0);
    }
  }

  cohere(agents) {
    let neighborDist = 50;
    let sum = createVector(0, 0);
    let count = 0;

    for (let other of agents) {
      let d = this.position.dist(other.position);
      if (d > 0 && d < neighborDist) {
        sum.add(other.position);
        count++;
      }
    }

    if (count > 0) {
      sum.div(count);
      return this.seek(sum);
    } else {
      return createVector(0, 0);
    }
  }

  avoidObstacles(obstacles) {
    let steer = createVector(0, 0);
    
    for (let obs of obstacles) {
      let d = this.position.dist(obs);
      if (d < 40) { 
        let away = p5.Vector.sub(this.position, obs);
        away.setMag(this.maxSpeed);
        steer.add(away);
      }
    }
    
    steer.limit(this.maxForce);
    return steer;
  }

  show() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.velocity.heading());
    fill(0, 150, 255);
    noStroke();
    triangle(0, -5, -10, 5, 10, 5);
    pop();
  }
}
