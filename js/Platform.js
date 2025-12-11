// Platform class for jumping
class Platform {
    constructor(x, y, width, height) {
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.color = '#2a2a3e';
    }

    draw(ctx) {
        // Main platform body
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, this.y, this.width, this.height);
        
        // Highlight edge on top
        ctx.fillStyle = '#3a3a5e';
        ctx.fillRect(this.x, this.y, this.width, 3);
    }

    getBounds() {
        return {
            x: this.x,
            y: this.y,
            width: this.width,
            height: this.height
        };
    }
}
