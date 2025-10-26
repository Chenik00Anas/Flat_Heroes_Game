// Flat Heroes Game - Initial Setup
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player object (just a simple square for now)
const player = {
    x: 400,
    y: 500,
    size: 20,
    color: '#00ff88'
};

// Game variables
let score = 0;

// Main game loop
function gameLoop() {
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

    // Continue the loop
    requestAnimationFrame(gameLoop);
}

// Start the game when page loads
window.onload = function() {
    console.log('Game initialized');
    gameLoop();
};
