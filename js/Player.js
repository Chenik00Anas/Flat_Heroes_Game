// Player class with advanced mechanics
class Player {
    constructor(x, y) {
        this.pos = new Vector2D(x, y);
        this.vel = new Vector2D(0, 0);
        this.acc = new Vector2D(0, 0);
        this.size = 20;
        this.color = '#00ff88';
        this.speed = 0.8;
        this.maxSpeed = 8;
        this.jumpForce = -20;
        this.gravity = 1.0;
        this.onGround = false;
        this.dashCooldown = 0;
        this.dashSpeed = 15;
        this.trail = [];
        
        // Double jump & Coyote time
        this.jumpsRemaining = 2;
        this.maxJumps = 2;
        this.coyoteTime = 0;
        this.coyoteTimeMax = 8;
        this.jumpPressed = false;
    }

    applyForce(force) {
        this.acc = this.acc.add(force);
    }

    update(keys, canvas, platforms) {
        // Horizontal movement
        if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
            this.applyForce(new Vector2D(-this.speed, 0));
        }
        if (keys['ArrowRight'] || keys['d'] || keys['D']) {
            this.applyForce(new Vector2D(this.speed, 0));
        }

        // Jump logic with double jump and coyote time
        const jumpKeyPressed = keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' '];
        
        if (jumpKeyPressed && !this.jumpPressed) {
            if (this.onGround || this.coyoteTime > 0 || this.jumpsRemaining > 0) {
                this.vel.y = this.jumpForce;
                this.onGround = false;
                this.coyoteTime = 0;
                
                if (!this.onGround && this.jumpsRemaining > 0) {
                    this.jumpsRemaining--;
                }
            }
        }
        
        this.jumpPressed = jumpKeyPressed;

        // Dash
        if (keys['Shift'] && this.dashCooldown <= 0) {
            const direction = new Vector2D(
                (keys['ArrowRight'] || keys['d'] || keys['D'] ? 1 : 0) - 
                (keys['ArrowLeft'] || keys['a'] || keys['A'] ? 1 : 0),
                0
            );
            if (direction.mag() > 0) {
                this.vel = direction.normalize().mult(this.dashSpeed);
                this.dashCooldown = 30;
            }
        }

        // Apply gravity
        this.applyForce(new Vector2D(0, this.gravity));

        // Update velocity and position
        this.vel = this.vel.add(this.acc);
        this.vel.x *= 0.85;
        this.vel = this.vel.limit(this.maxSpeed * 3);
        this.pos = this.pos.add(this.vel);
        this.acc = this.acc.mult(0);

        // Ground collision
        const groundY = canvas.height - 50;
        const wasOnGround = this.onGround;
        this.onGround = false;
        
        if (this.pos.y + this.size >= groundY) {
            this.pos.y = groundY - this.size;
            this.vel.y = 0;
            this.onGround = true;
            this.jumpsRemaining = this.maxJumps;
            this.coyoteTime = this.coyoteTimeMax;
        }

        // Platform collision
        platforms.forEach(platform => {
            const playerBounds = this.getBounds();
            const platformBounds = platform.getBounds();
            
            if (this.vel.y >= 0 && this.checkCollision(playerBounds, platformBounds)) {
                if (this.pos.y < platform.y + platform.height / 2) {
                    this.pos.y = platform.y - this.size;
                    this.vel.y = 0;
                    this.onGround = true;
                    this.jumpsRemaining = this.maxJumps;
                    this.coyoteTime = this.coyoteTimeMax;
                }
            }
        });

        // Update coyote time
        if (wasOnGround && !this.onGround) {
            this.coyoteTime = this.coyoteTimeMax;
        } else if (!this.onGround && this.coyoteTime > 0) {
            this.coyoteTime--;
        }

        // Boundaries
        if (this.pos.x - this.size < 0) {
            this.pos.x = this.size;
            this.vel.x = 0;
        }
        if (this.pos.x + this.size > canvas.width) {
            this.pos.x = canvas.width - this.size;
            this.vel.x = 0;
        }

        // Update cooldowns
        if (this.dashCooldown > 0) this.dashCooldown--;

        // Trail effect
        this.trail.push({ x: this.pos.x, y: this.pos.y });
        if (this.trail.length > 8) this.trail.shift();
    }

    checkCollision(rect1, rect2) {
        return rect1.x < rect2.x + rect2.width &&
               rect1.x + rect1.width > rect2.x &&
               rect1.y < rect2.y + rect2.height &&
               rect1.y + rect1.height > rect2.y;
    }

    draw(ctx) {
        // Draw trail
        ctx.save();
        this.trail.forEach((t, i) => {
            ctx.globalAlpha = (i / this.trail.length) * 0.3;
            ctx.fillStyle = this.color;
            ctx.fillRect(t.x - this.size * 0.8, t.y - this.size * 0.8, 
                        this.size * 1.6, this.size * 1.6);
        });
        ctx.restore();

        // Draw player
        ctx.fillStyle = this.color;
        ctx.fillRect(this.pos.x - this.size, this.pos.y - this.size, 
                    this.size * 2, this.size * 2);
        
        // Draw jump indicator
        if (!this.onGround) {
            for (let i = 0; i < this.jumpsRemaining; i++) {
                ctx.fillStyle = 'rgba(0, 255, 136, 0.6)';
                ctx.beginPath();
                ctx.arc(this.pos.x - 10 + i * 10, this.pos.y - this.size - 10, 3, 0, Math.PI * 2);
                ctx.fill();
            }
        }
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
