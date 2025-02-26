class Path {
    constructor() {
      this.points = [];
      for (let i = 0; i < width; i += 20) {
        this.points.push(createVector(i, height / 2 + sin(i * 0.05) * 50));
      }
    }
  
    show() {
      noFill();
      stroke(0);
      beginShape();
      for (let p of this.points) {
        vertex(p.x, p.y);
      }
      endShape();
    }
  }
  
  class PathFollower {
    constructor(x, y) {
      this.position = createVector(x, y);
      this.velocity = createVector(2, 0);
      this.acceleration = createVector(0, 0);
      this.maxSpeed = 2;
      this.maxForce = 0.1;
    }
  
    follow(path) {
      let closestPoint = null;
      let closestDist = Infinity;
  
      for (let p of path.points) {
        let d = dist(this.position.x, this.position.y, p.x, p.y);
        if (d < closestDist) {
          closestDist = d;
          closestPoint = p;
        }
      }
  
      if (closestPoint) {
        this.seek(closestPoint);
      }
    }
  
    seek(target) {
      let desired = p5.Vector.sub(target, this.position);
      desired.setMag(this.maxSpeed);
      let steer = p5.Vector.sub(desired, this.velocity);
      steer.limit(this.maxForce);
      this.acceleration.add(steer);
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
  
  let path;
  let follower;
  
  function setup() {
    createCanvas(600, 400);
    path = new Path();
    follower = new PathFollower(50, height / 2);
  }
  
  function draw() {
    background(220);
    path.show();
    
    follower.follow(path);
    follower.update();
    follower.show();
  }
  