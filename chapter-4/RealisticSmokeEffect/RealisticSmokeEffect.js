class SmokeParticle {
    constructor(x, y) {
        this.position = createVector(x, y);
        this.velocity = createVector(randomGaussian(0, 0.3), randomGaussian(-1, 0.3)); // Natural upward movement
        this.acceleration = createVector(0, 0);
        this.lifespan = 255; // Fully visible at start
        this.size = random(10, 25); // Randomized smoke size
        this.noiseOffset = random(1000); // Offset for smooth drifting
    }

    applyForce(force) {
        this.acceleration.add(force);
    }

    update() {
        this.velocity.add(this.acceleration);
        this.position.add(this.velocity);
        this.acceleration.mult(0);

        // Expanding and fading effect
        this.size += 0.3;
        this.lifespan -= 2;

        // Perlin Noise for smooth swaying effect
        let drift = (noise(this.noiseOffset) - 0.5) * 1.5;
        this.position.x += drift;
        this.noiseOffset += 0.02;
    }

    show() {
        noStroke();
        let alpha = constrain(this.lifespan, 0, 255);
        fill(180, 180, 180, alpha); // Soft gray color
        ellipse(this.position.x, this.position.y, this.size);
    }

    isDead() {
        return this.lifespan <= 0;
    }
}

class SmokeSystem {
    constructor(x, y) {
        this.origin = createVector(x, y);
        this.particles = [];
    }

    addParticle() {
        this.particles.push(new SmokeParticle(this.origin.x + random(-10, 10), this.origin.y));
    }

    applyForce(force) {
        for (let p of this.particles) {
            p.applyForce(force);
        }
    }

    run() {
        for (let i = this.particles.length - 1; i >= 0; i--) {
            let p = this.particles[i];
            p.update();
            p.show();
            if (p.isDead()) {
                this.particles.splice(i, 1);
            }
        }
    }
}

let smoke;

function setup() {
    createCanvas(400, 400);
    smoke = new SmokeSystem(width / 2, height - 50);
}

function draw() {
    background(0);
    
    // Adding wind effect based on mouse movement
    let wind = createVector(map(mouseX, 0, width, -0.1, 0.1), 0);
    smoke.applyForce(wind);
    
    smoke.addParticle();
    smoke.run();
}
