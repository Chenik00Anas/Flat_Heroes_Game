// Flat Heroes Game - Vector Physics Implementation
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player object with vector-based physics
const player = {
    pos: new Vector2D(400, 300),  // Position vector
    vel: new Vector2D(0, 0),      // Velocity vector
    acc: new Vector2D(0, 0),      // Acceleration vector
    size: 20,
    color: '#00ff88',
    speed: 0.8,        // Acceleration force
    maxSpeed: 6,       // Maximum velocity
    jumpForce: -15,    // Jump strength
    gravity: 0.6,      // Gravity force
    onGround: false
};

// Game variables
let score = 0;
const groundY = canvas.height - 50;

// Keyboard state
const keys = {};

// Keyboard event listeners
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// Apply force to player (F = ma)
function applyForce(force) {
    player.acc = player.acc.add(force);
}

// Update player physics
function updatePlayer() {
    // Horizontal movement - apply forces
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        applyForce(new Vector2D(-player.speed, 0));
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        applyForce(new Vector2D(player.speed, 0));
    }
    
    // Jump
    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && player.onGround) {
        player.vel.y = player.jumpForce;
        player.onGround = false;
    }
    
    // Apply gravity
    applyForce(new Vector2D(0, player.gravity));
    
    // Update velocity with acceleration
    player.vel = player.vel.add(player.acc);
    
    // Apply friction to horizontal movement
    player.vel.x *= 0.85;
    
    // Limit velocity to max speed
    player.vel = player.vel.limit(player.maxSpeed);
    
    // Update position with velocity
    player.pos = player.pos.add(player.vel);
    
    // Reset acceleration (forces are only applied once per frame)
    player.acc = player.acc.mult(0);
    
    // Ground collision
    if (player.pos.y + player.size >= groundY) {
        player.pos.y = groundY - player.size;
        player.vel.y = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
    
    // Horizontal boundaries
    if (player.pos.x - player.size < 0) {
        player.pos.x = player.size;
        player.vel.x = 0;
    }
    if (player.pos.x + player.size > canvas.width) {
        player.pos.x = canvas.width - player.size;
        player.vel.x = 0;
    }
    
    // Top boundary
    if (player.pos.y - player.size < 0) {
        player.pos.y = player.size;
        player.vel.y = 0;
    }
}

// Main game loop
function gameLoop() {
    // Update
    updatePlayer();
    
    // Clear canvas
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Draw ground
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, groundY, canvas.width, 50);
    
    // Draw player
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.pos.x - player.size,
        player.pos.y - player.size,
        player.size * 2,
        player.size * 2
    );
    
    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText('Score: ' + score, 20, 30);
    
    // Debug info
    ctx.fillStyle = '#888888';
    ctx.font = '12px monospace';
    ctx.fillText('Velocity: (' + player.vel.x.toFixed(2) + ', ' + player.vel.y.toFixed(2) + ')', 20, 60);
    ctx.fillText('Position: (' + player.pos.x.toFixed(0) + ', ' + player.pos.y.toFixed(0) + ')', 20, 80);
    ctx.fillText('On Ground: ' + player.onGround, 20, 100);
    
    // Controls
    ctx.fillStyle = '#666666';
    ctx.font = '14px monospace';
    ctx.fillText('Controls: Arrow Keys/WASD to move, Space/W/Up to jump', 20, canvas.height - 20);
    
    // Continue loop
    requestAnimationFrame(gameLoop);
}

// Start game
window.onload = function() {
    console.log('Game initialized with Vector2D physics');
    console.log('Vector-based position, velocity, and acceleration');
    gameLoop();
};
