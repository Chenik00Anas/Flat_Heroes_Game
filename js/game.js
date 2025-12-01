// Flat Heroes Game - Enemy AI Implementation
// Get canvas and context
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

// Set canvas size
canvas.width = 800;
canvas.height = 600;

// Player object
const player = {
    pos: new Vector2D(400, 300),
    vel: new Vector2D(0, 0),
    acc: new Vector2D(0, 0),
    size: 20,
    color: '#00ff88',
    speed: 0.8,
    maxSpeed: 6,
    jumpForce: -15,
    gravity: 0.6,
    onGround: false
};

// Game variables
let score = 0;
let gameOver = false;
const groundY = canvas.height - 50;

// Enemies array
const enemies = [];

// Spawn initial enemies
function spawnEnemies() {
    for (let i = 0; i < 3; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height - 100);
        enemies.push(new Enemy(x, y));
    }
}

// Keyboard state
const keys = {};

// Event listeners
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    
    // Reset game on R key
    if (e.key === 'r' && gameOver) {
        resetGame();
    }
    
    if(['ArrowUp', 'ArrowDown', 'ArrowLeft', 'ArrowRight', ' '].includes(e.key)) {
        e.preventDefault();
    }
});

window.addEventListener('keyup', function(e) {
    keys[e.key] = false;
});

// Apply force to player
function applyForce(force) {
    player.acc = player.acc.add(force);
}

// Check collision between two rectangles
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Update player
function updatePlayer() {
    if (gameOver) return;

    // Movement
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
    
    // Gravity
    applyForce(new Vector2D(0, player.gravity));
    
    // Update physics
    player.vel = player.vel.add(player.acc);
    player.vel.x *= 0.85;
    player.vel = player.vel.limit(player.maxSpeed);
    player.pos = player.pos.add(player.vel);
    player.acc = player.acc.mult(0);
    
    // Ground collision
    if (player.pos.y + player.size >= groundY) {
        player.pos.y = groundY - player.size;
        player.vel.y = 0;
        player.onGround = true;
    } else {
        player.onGround = false;
    }
    
    // Boundaries
    if (player.pos.x - player.size < 0) {
        player.pos.x = player.size;
        player.vel.x = 0;
    }
    if (player.pos.x + player.size > canvas.width) {
        player.pos.x = canvas.width - player.size;
        player.vel.x = 0;
    }
    if (player.pos.y - player.size < 0) {
        player.pos.y = player.size;
        player.vel.y = 0;
    }
}

// Update enemies
function updateEnemies() {
    if (gameOver) return;

    enemies.forEach(enemy => {
        enemy.update(player.pos, canvas);
        
        // Check collision with player
        const playerBounds = {
            x: player.pos.x - player.size,
            y: player.pos.y - player.size,
            width: player.size * 2,
            height: player.size * 2
        };
        
        if (checkCollision(playerBounds, enemy.getBounds())) {
            gameOver = true;
        }
    });
}

// Draw everything
function draw() {
    // Clear canvas
    ctx.fillStyle = '#0a0a14';
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    
    // Ground
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, groundY, canvas.width, 50);
    
    // Player
    ctx.fillStyle = player.color;
    ctx.fillRect(
        player.pos.x - player.size,
        player.pos.y - player.size,
        player.size * 2,
        player.size * 2
    );
    
    // Enemies
    enemies.forEach(enemy => enemy.draw(ctx));
    
    // UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText('Score: ' + score, 20, 30);
    ctx.fillText('Enemies: ' + enemies.length, 20, 60);
    
    // Controls
    ctx.fillStyle = '#666666';
    ctx.font = '14px monospace';
    ctx.fillText('Controls: Arrow/WASD to move, Space to jump', 20, canvas.height - 20);
    
    // Game over screen
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0066';
        ctx.font = '48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px monospace';
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 50);
        ctx.textAlign = 'left';
    }
}

// Reset game
function resetGame() {
    player.pos = new Vector2D(400, 300);
    player.vel = new Vector2D(0, 0);
    player.acc = new Vector2D(0, 0);
    enemies.length = 0;
    spawnEnemies();
    score = 0;
    gameOver = false;
}

// Main game loop
function gameLoop() {
    updatePlayer();
    updateEnemies();
    draw();
    requestAnimationFrame(gameLoop);
}

// Start game
window.onload = function() {
    console.log('Game initialized with Enemy AI');
    console.log('Enemies use steering behavior to seek player');
    spawnEnemies();
    gameLoop();
};
