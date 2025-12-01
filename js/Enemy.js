// Enemy class with steering behavior AI
class Enemy {
    constructor(x, y) {
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(0, 0);
        this.acc = new Vector2D(0, 0);
        this.size = 15;
        this.maxSpeed = 2.5;
        this.maxForce = 0.1;
        this.color = '#ff0066';
    }

    // Steering behavior: Seek target
    seek(target) {
        // Calculate desired velocity (from current position to target)
        const desired = target.sub(this.pos);
        
        // Normalize and scale to max speed
        const normalizedDesired = desired.normalize();
        const scaledDesired = normalizedDesired.mult(this.maxSpeed);
        
        // Steering = Desired - Current velocity
        const steer = scaledDesired.sub(this.vel);
        
        // Limit steering force
        return steer.limit(this.maxForce);
    }

    // Apply force to enemy
    applyForce(force) {
        this.acc = this.acc.add(force);
    }

    // Update enemy position and behavior
    update(playerPos, canvas) {
        // Calculate steering force towards player
        const seekForce = this.seek(playerPos);
        this.applyForce(seekForce);

        // Update velocity and position
        this.vel = this.vel.add(this.acc);
        this.vel = this.vel.limit(this.maxSpeed);
        this.pos = this.pos.add(this.vel);
        
        // Reset acceleration
        this.acc = this.acc.mult(0);

        // Wrap around screen edges
        if (this.pos.x < 0) this.pos.x = canvas.width;
        if (this.pos.x > canvas.width) this.pos.x = 0;
        if (this.pos.y < 0) this.pos.y = canvas.height;
        if (this.pos.y > canvas.height) this.pos.y = 0;
    }

    // Draw enemy
    draw(ctx) {
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        
        // Rotate based on velocity direction
        const angle = Math.atan2(this.vel.y, this.vel.x);
        ctx.rotate(angle);
        
        // Draw diamond shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        ctx.moveTo(this.size, 0);
        ctx.lineTo(0, this.size);
        ctx.lineTo(-this.size, 0);
        ctx.lineTo(0, -this.size);
        ctx.closePath();
        ctx.fill();
        
        ctx.restore();
    }

    // Get bounding box for collision detection
    getBounds() {
        return {
            x: this.pos.x - this.size,
            y: this.pos.y - this.size,
            width: this.size * 2,
            height: this.size * 2
        };
    }
}
