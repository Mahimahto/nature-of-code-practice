function setup() {
    createCanvas(600, 600); // Square canvas for better symmetry
  }
  
  function draw() {
    background(30, 30, 50); // Dark background for better contrast
  
    // Define center and mouse vectors
    let center = createVector(width / 2, height / 2);
    let mouse = createVector(mouseX, mouseY);
  
    // Calculate distance between center and mouse
    let distance = center.dist(mouse);
  
    // **Enhanced Center and Mouse Points**
    // Center point
    fill(100, 200, 255); // Light blue
    noStroke();
    ellipse(center.x, center.y, 15, 15);
  
    // Mouse point
    fill(255, 100, 150); // Pinkish-red
    ellipse(mouse.x, mouse.y, 15, 15);
  
    // **Enhanced Line Between Points**
    strokeWeight(map(distance, 0, width, 2, 8)); // Thickness increases with distance
    stroke(map(distance, 0, width, 0, 255), 150, map(distance, 0, width, 255, 100)); // Dynamic color gradient
    line(center.x, center.y, mouse.x, mouse.y);
  
    // **Dynamic Circle at Center**
    noFill();
    strokeWeight(2);
    stroke(255, 200, 0, 150); // Soft yellow with transparency
    ellipse(center.x, center.y, distance * 2); // Circle size proportional to distance
  
    // **Distance Display**
    noStroke();
    fill(255);
    textSize(20);
    textAlign(CENTER, CENTER); // Centered text
    text(`Distance: ${distance.toFixed(2)}`, center.x, center.y - 40); // Display above the center
  }
  