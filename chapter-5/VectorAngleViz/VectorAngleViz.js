let v1, v2;

function setup() {
  createCanvas(400, 400);
  v1 = createVector(100, 0);
  v2 = createVector(50, 50);
}

function draw() {
  background(220);
  translate(width / 2, height / 2);

  strokeWeight(2);
  stroke(0);
  line(0, 0, v1.x, v1.y);
  line(0, 0, v2.x, v2.y);

  let angleBetween = degrees(v1.angleBetween(v2));

  fill(0);
  noStroke();
  textSize(16);
  text("Angle: " + nf(angleBetween, 1, 2) + "°", -50, 60);

  drawAngleArc();
}

function drawAngleArc() {
  let baseAngle = v1.heading();
  let angle = v2.heading();
  let start = min(baseAngle, angle);
  let end = max(baseAngle, angle);

  noFill();
  stroke(255, 0, 0);
  strokeWeight(2);
  arc(0, 0, 50, 50, start, end);
}
