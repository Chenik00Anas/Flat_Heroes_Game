// Flat Heroes Game - Gravity and Jumping
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
    x: 400,
    y: 300,
    size: 20,
    color: '#00ff88',
    speedX: 5,  // Horizontal speed
    velocityY: 0,  // Vertical velocity
    jumpPower: -12,  // Jump strength
    gravity: 0.5,  // Gravity force
    onGround: false  // Is player on ground?
};

// Game variables
let score = 0;
const groundY = canvas.height - 50;  // Ground position

// Keyboard state
const keys = {};

// Keyboard event listeners
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    
    // Prevent arrow keys from scrolling the page
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// Update player position and physics
function updatePlayer() {
    // Horizontal movement
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.x -= player.speedX;
    }
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.x += player.speedX;
    }
    
    // Jump - only if on ground
    if ((keys['ArrowUp'] || keys['w'] || keys['W'] || keys[' ']) && player.onGround) {
        player.velocityY = player.jumpPower;
        player.onGround = false;
    }
    
    // Apply gravity
    player.velocityY += player.gravity;
    
    // Update vertical position
    player.y += player.velocityY;
    
    // Ground collision
    if (player.y + player.size >= groundY) {
        player.y = groundY - player.size;
        player.velocityY = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
    
    // Keep player inside horizontal canvas bounds
    if (player.x - player.size < 0) {
        player.x = player.size;
    }
    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;
    }
    
    // Don't let player go above canvas
    if (player.y - player.size < 0) {
        player.y = player.size;
        player.velocityY = 0;
    }
}

// Main game loop
function gameLoop() {
    // Update game state
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
        player.x - player.size, 
        player.y - player.size, 
        player.size * 2, 
        player.size * 2
    );
    
    // Draw UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText('Score: ' + score, 20, 30);
    
    // Draw debug info
    ctx.fillStyle = '#888888';
    ctx.font = '12px monospace';
    ctx.fillText('Velocity Y: ' + player.velocityY.toFixed(2), 20, 60);
    ctx.fillText('On Ground: ' + player.onGround, 20, 80);
    
    // Draw controls hint
    ctx.fillStyle = '#666666';
    ctx.font = '14px monospace';
    ctx.fillText('Controls: Arrow Keys/WASD to move, Space/W/Up to jump', 20, canvas.height - 20);
    
    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Start the game when page loads
window.onload = function() {
    console.log('Game initialized');
    console.log('Controls: WASD or Arrow Keys to move, Space/W/Up to jump');
    gameLoop();
};
