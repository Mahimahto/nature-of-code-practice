class Vector {
    constructor(x, y) {
      this.x = x;
      this.y = y;
    }
  
    // Vector ko scale karna
    scale(factor) {
      this.x *= factor;
      this.y *= factor;
    }
  
    // Vector ko display karna
    display() {
      console.log(`Vector: (${this.x}, ${this.y})`);
    }
  }
  