let r1 = 100, r2 = 100, m1 = 10, m2 = 10;
let a1 = Math.PI / 2, a2 = Math.PI / 2;
let a1_v = 0, a2_v = 0, g = 1;
let px2 = -1, py2 = -1;
let cx, cy;

function setup() {
  createCanvas(400, 400);
  cx = width / 2;
  cy = 100;
}

function draw() {
  background(220);
  let num1 = -g * (2 * m1 + m2) * sin(a1);
  let num2 = -m2 * g * sin(a1 - 2 * a2);
  let num3 = -2 * sin(a1 - a2) * m2;
  let num4 = a2_v * a2_v * r2 + a1_v * a1_v * r1 * cos(a1 - a2);
  let den = r1 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a1_a = (num1 + num2 + num3 * num4) / den;

  let num5 = 2 * sin(a1 - a2);
  let num6 = a1_v * a1_v * r1 * (m1 + m2);
  let num7 = g * (m1 + m2) * cos(a1);
  let num8 = a2_v * a2_v * r2 * m2 * cos(a1 - a2);
  let den2 = r2 * (2 * m1 + m2 - m2 * cos(2 * a1 - 2 * a2));
  let a2_a = (num5 * (num6 + num7 + num8)) / den2;

  a1_v += a1_a;
  a2_v += a2_a;
  a1 += a1_v;
  a2 += a2_v;

  let x1 = cx + r1 * sin(a1);
  let y1 = cy + r1 * cos(a1);
  let x2 = x1 + r2 * sin(a2);
  let y2 = y1 + r2 * cos(a2);

  stroke(0);
  line(cx, cy, x1, y1);
  line(x1, y1, x2, y2);
  fill(255, 0, 0);
  ellipse(x1, y1, m1, m1);
  ellipse(x2, y2, m2, m2);
}
