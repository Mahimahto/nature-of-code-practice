let fireImg, smokeImg;
let fireParticles = [];
let smokeParticles = [];

function preload() {
  fireImg = loadImage("fire.png"); // Load fire texture
  smokeImg = loadImage("smoke.png"); // Load smoke texture
}

class Particle {
  constructor(x, y, img, sizeMin, sizeMax, speedY, fadeSpeed, color) {
    this.position = createVector(x, y);
    this.velocity = createVector(random(-0.5, 0.5), random(speedY - 0.3, speedY));
    this.acceleration = createVector(0, 0);
    this.lifespan = 255; // Fully visible at start
    this.size = random(sizeMin, sizeMax);
    this.img = img;
    this.fadeSpeed = fadeSpeed;
    this.noiseOffset = random(1000);
    this.color = color; // Fire color tint
  }

  applyForce(force) {
    this.acceleration.add(force);
  }

  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);

    this.size += 0.3; // Expansion effect
    this.lifespan -= this.fadeSpeed; // Gradual fading

    // Smoother movement using Perlin noise for random drift
    let drift = (noise(this.noiseOffset) - 0.5) * 2;
    this.position.x += drift;
    this.noiseOffset += 0.02;
  }

  show() {
    imageMode(CENTER);
    tint(this.color[0], this.color[1], this.color[2], this.lifespan); // Apply smooth color fade
    image(this.img, this.position.x, this.position.y, this.size, this.size);
  }

  isDead() {
    return this.lifespan <= 0;
  }
}

function setup() {
  createCanvas(400, 400);
}

function draw() {
  background(0);

  // Add fire particles (more frequent and vibrant)
  if (random(1) < 0.8) {
    fireParticles.push(new Particle(width / 2, height - 30, fireImg, 20, 50, -2, 5, [255, 150, 50]));
  }

  // Add smoke particles (fainter and less frequent)
  if (random(1) < 0.4) {
    smokeParticles.push(new Particle(width / 2, height - 50, smokeImg, 30, 80, -1, 2, [200, 200, 200]));
  }

  // Update & display fire
  for (let i = fireParticles.length - 1; i >= 0; i--) {
    let p = fireParticles[i];
    p.update();
    p.show();
    if (p.isDead()) {
      fireParticles.splice(i, 1);
    }
  }

  // Update & display smoke
  for (let i = smokeParticles.length - 1; i >= 0; i--) {
    let p = smokeParticles[i];
    p.update();
    p.show();
    if (p.isDead()) {
      smokeParticles.splice(i, 1);
    }
  }
}
