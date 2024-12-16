let numDots = 500;  // Number of paint dots
let stdDevSlider;  // Slider to control standard deviation

function setup() {
  createCanvas(400, 400);
  stdDevSlider = createSlider(10, 100, 60);  // Create a slider for adjusting standard deviation
  stdDevSlider.position(20, height + 20);  // Place the slider below the canvas
}

function draw() {
  background(255, 255, 255, 50);  // Add slight transparency for trail effect
  
  let stdDev = stdDevSlider.value();  // Get the current value of standard deviation from the slider
  
  // Draw the paint splatter using Gaussian distribution
  for (let i = 0; i < numDots; i++) {
    let x = randomGaussian(width / 2, stdDev);  // Normal distribution for x position
    let y = randomGaussian(height / 2, stdDev);  // Normal distribution for y position
    
    let r = randomGaussian(100, 30);  // Generate random color using Gaussian distribution (mean 100, stdDev 30)
    let g = randomGaussian(150, 50);  // Mean 150, stdDev 50
    let b = randomGaussian(200, 50);  // Mean 200, stdDev 50
    
    fill(constrain(r, 0, 255), constrain(g, 0, 255), constrain(b, 0, 255), 150);  // Set color with transparency
    noStroke();
    ellipse(x, y, 10, 10);  // Draw the dot (paint splatter)
  }
  
  // Draw the slider value as text
  textSize(14);
  fill(0);
  text('Standard Deviation: ' + stdDev, 20, height + 50);
}
