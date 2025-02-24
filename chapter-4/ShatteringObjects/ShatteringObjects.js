class Shard {
    constructor(x, y, size) {
      this.position = createVector(x, y);
      this.velocity = createVector(random(-3, 3), random(-3, 3));
      this.lifespan = 255;
      this.size = size;
    }
  
    update() {
      this.position.add(this.velocity);
      this.lifespan -= 4;
    }
  
    show() {
      noStroke();
      fill(255, this.lifespan);
      rect(this.position.x, this.position.y, this.size, this.size);
    }
  
    isDead() {
      return this.lifespan <= 0;
    }
  }
  
  class ShatteringObject {
    constructor(x, y, size) {
      this.position = createVector(x, y);
      this.size = size;
      this.shattered = false;
      this.shards = [];
    }
  
    show() {
      if (!this.shattered) {
        fill(255);
        rect(this.position.x, this.position.y, this.size, this.size);
      } else {
        for (let i = this.shards.length - 1; i >= 0; i--) {
          let s = this.shards[i];
          s.update();
          s.show();
          if (s.isDead()) {
            this.shards.splice(i, 1);
          }
        }
      }
    }
  
    shatter() {
      this.shattered = true;
      let numShards = 10;
      for (let i = 0; i < numShards; i++) {
        this.shards.push(new Shard(this.position.x + random(this.size), this.position.y + random(this.size), this.size / 5));
      }
    }
  
    isEmpty() {
      return this.shattered && this.shards.length === 0;
    }
  }
  
  let objects = [];
  
  function setup() {
    createCanvas(400, 400);
    objects.push(new ShatteringObject(150, 150, 50));
    objects.push(new ShatteringObject(250, 250, 60));
  }
  
  function draw() {
    background(0);
    
    for (let i = objects.length - 1; i >= 0; i--) {
      objects[i].show();
      if (objects[i].isEmpty()) {
        objects.splice(i, 1);
      }
    }
  }
  
  function mousePressed() {
    for (let obj of objects) {
      if (!obj.shattered && mouseX > obj.position.x && mouseX < obj.position.x + obj.size &&
          mouseY > obj.position.y && mouseY < obj.position.y + obj.size) {
        obj.shatter();
      }
    }
  }
  