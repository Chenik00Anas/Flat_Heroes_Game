// Flat Heroes Game - Basic Player Movement
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
    x: 400,
    y: 500,
    size: 20,
    color: '#00ff88',
    speed: 5  // Movement speed
};

// Game variables
let score = 0;

// Keyboard state - track which keys are pressed
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

// Update player position based on keyboard input
function updatePlayer() {
    // Move left
    if (keys['ArrowLeft'] || keys['a'] || keys['A']) {
        player.x -= player.speed;
    }
    
    // Move right
    if (keys['ArrowRight'] || keys['d'] || keys['D']) {
        player.x += player.speed;
    }
    
    // Keep player inside canvas bounds (collision with edges)
    if (player.x - player.size < 0) {
        player.x = player.size;
    }
    if (player.x + player.size > canvas.width) {
        player.x = canvas.width - player.size;
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
    ctx.fillRect(0, canvas.height - 50, canvas.width, 50);
    
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
    
    // Draw controls hint
    ctx.fillStyle = '#666666';
    ctx.font = '14px monospace';
    ctx.fillText('Controls: Arrow Keys or WASD to move', 20, canvas.height - 20);
    
    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Start the game when page loads
window.onload = function() {
    console.log('Game initialized');
    console.log('Use Arrow Keys or WASD to move the player');
    gameLoop();
};
