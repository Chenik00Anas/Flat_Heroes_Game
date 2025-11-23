// Vector2D utility class for 2D physics calculations
class Vector2D {
    constructor(x = 0, y = 0) {
        this.x = x;
        this.y = y;
    }

    // Add two vectors
    add(v) {
        return new Vector2D(this.x + v.x, this.y + v.y);
    }

    // Subtract two vectors
    sub(v) {
        return new Vector2D(this.x - v.x, this.y - v.y);
    }

    // Multiply vector by a scalar
    mult(n) {
        return new Vector2D(this.x * n, this.y * n);
    }

    // Calculate magnitude (length) of vector
    mag() {
        return Math.sqrt(this.x * this.x + this.y * this.y);
    }

    // Normalize vector (make length = 1)
    normalize() {
        const m = this.mag();
        if (m > 0) {
            return this.mult(1 / m);
        }
        return new Vector2D(0, 0);
    }

    // Limit vector magnitude to max value
    limit(max) {
        if (this.mag() > max) {
            return this.normalize().mult(max);
        }
        return new Vector2D(this.x, this.y);
    }

    // Create a copy of this vector
    copy() {
        return new Vector2D(this.x, this.y);
    }
}
