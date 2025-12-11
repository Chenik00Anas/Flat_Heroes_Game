// Coin class for collecting
class Coin {
    constructor(x, y) {
        this.pos = new Vector2D(x, y);
        this.size = 10;
        this.collected = false;
        this.rotation = 0;
        this.color = '#ffd700';
        this.pulseScale = 1;
        this.pulseDirection = 1;
    }

    update() {
        // Rotate coin
        this.rotation += 0.1;
        
        // Pulse animation
        this.pulseScale += 0.02 * this.pulseDirection;
        if (this.pulseScale > 1.3 || this.pulseScale < 0.9) {
            this.pulseDirection *= -1;
        }
    }

    draw(ctx) {
        if (this.collected) return;
        
        ctx.save();
        ctx.translate(this.pos.x, this.pos.y);
        ctx.rotate(this.rotation);
        ctx.scale(this.pulseScale, this.pulseScale);
        
        // Draw star shape
        ctx.fillStyle = this.color;
        ctx.beginPath();
        for (let i = 0; i < 5; i++) {
            const angle = (i * 4 * Math.PI) / 5 - Math.PI / 2;
            const x = Math.cos(angle) * this.size;
            const y = Math.sin(angle) * this.size;
            if (i === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
        }
        ctx.closePath();
        ctx.fill();
        
        // Glow effect
        ctx.strokeStyle = 'rgba(255, 215, 0, 0.5)';
        ctx.lineWidth = 3;
        ctx.stroke();
        
        ctx.restore();
    }

    getBounds() {
        return {
            x: this.pos.x - this.size,
            y: this.pos.y - this.size,
            width: this.size * 2,
            height: this.size * 2
        };
    }
}
