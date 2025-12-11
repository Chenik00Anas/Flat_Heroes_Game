// Flat Heroes Game - Final Version
const canvas = document.getElementById('gameCanvas');
const ctx = canvas.getContext('2d');

canvas.width = 800;
canvas.height = 600;

// Game state
let player;
let enemies = [];
let platforms = [];
let coins = [];
let score = 0;
let coinsCollected = 0;
let gameOver = false;
let wave = 1;
let coinSpawnTimer = 0;
const groundY = canvas.height - 50;

// Keyboard state
const keys = {};

// Event listeners
window.addEventListener('keydown', function(e) {
    keys[e.key] = true;
    
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

// Collision detection
function checkCollision(rect1, rect2) {
    return rect1.x < rect2.x + rect2.width &&
           rect1.x + rect1.width > rect2.x &&
           rect1.y < rect2.y + rect2.height &&
           rect1.y + rect1.height > rect2.y;
}

// Create platforms
function createPlatforms() {
    platforms = [
        new Platform(150, 450, 120, 20),
        new Platform(350, 380, 100, 20),
        new Platform(550, 320, 140, 20),
        new Platform(100, 280, 100, 20),
        new Platform(300, 200, 120, 20),
        new Platform(550, 150, 100, 20),
        new Platform(650, 450, 100, 20),
    ];
}

// Spawn enemies for current wave
function spawnWave() {
    enemies = [];
    const numEnemies = 3 + wave;
    
    for (let i = 0; i < numEnemies; i++) {
        const x = Math.random() * canvas.width;
        const y = Math.random() * (canvas.height - 100);
        enemies.push(new Enemy(x, y));
    }
}

// Update game
function update() {
    if (gameOver) return;

    // Update player
    player.update(keys, canvas, platforms);

    // Update enemies
    enemies.forEach(enemy => {
        enemy.update(player.pos, canvas);
        
        // Check collision with player
        if (checkCollision(player.getBounds(), enemy.getBounds())) {
            gameOver = true;
        }
    });

    // Update coins
    coins.forEach(coin => {
        coin.update();
        
        if (!coin.collected && checkCollision(player.getBounds(), coin.getBounds())) {
            coin.collected = true;
            score += 50;
            coinsCollected++;
        }
    });

    // Remove collected coins
    coins = coins.filter(coin => !coin.collected);

    // Spawn new coins
    coinSpawnTimer++;
    if (coinSpawnTimer > 120 && coins.length < 5) {
        coinSpawnTimer = 0;
        
        if (Math.random() > 0.3 && platforms.length > 0) {
            const platform = platforms[Math.floor(Math.random() * platforms.length)];
            const x = platform.x + Math.random() * platform.width;
            const y = platform.y - 20;
            coins.push(new Coin(x, y));
        } else {
            const x = Math.random() * canvas.width;
            const y = groundY - 20;
            coins.push(new Coin(x, y));
        }
    }

    // Check wave complete
    if (enemies.length === 0) {
        wave++;
        score += 100 * wave;
        spawnWave();
    }
}

// Draw everything
function draw() {
    // Clear with fade effect
    ctx.fillStyle = 'rgba(10, 10, 20, 0.3)';
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    // Ground
    ctx.fillStyle = '#222222';
    ctx.fillRect(0, groundY, canvas.width, 50);

    // Platforms
    platforms.forEach(platform => platform.draw(ctx));

    // Coins
    coins.forEach(coin => coin.draw(ctx));

    // Player
    player.draw(ctx);

    // Enemies
    enemies.forEach(enemy => enemy.draw(ctx));

    // UI
    ctx.fillStyle = '#ffffff';
    ctx.font = '20px monospace';
    ctx.fillText('Wave: ' + wave, 20, 30);
    ctx.fillText('Score: ' + score, 20, 60);
    ctx.fillText('Enemies: ' + enemies.length, 20, 90);
    
    ctx.fillStyle = '#ffd700';
    ctx.fillText('★ ' + coinsCollected, 20, 120);

    // Controls
    ctx.fillStyle = '#666666';
    ctx.font = '14px monospace';
    ctx.fillText('WASD/Arrows: Move | Space: Jump | Shift: Dash', 20, canvas.height - 20);

    // Game over
    if (gameOver) {
        ctx.fillStyle = 'rgba(0, 0, 0, 0.7)';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.fillStyle = '#ff0066';
        ctx.font = '48px monospace';
        ctx.textAlign = 'center';
        ctx.fillText('GAME OVER', canvas.width / 2, canvas.height / 2 - 20);
        
        ctx.fillStyle = '#ffffff';
        ctx.font = '24px monospace';
        ctx.fillText('Final Score: ' + score, canvas.width / 2, canvas.height / 2 + 30);
        ctx.fillText('Coins: ' + coinsCollected, canvas.width / 2, canvas.height / 2 + 60);
        ctx.fillText('Press R to Restart', canvas.width / 2, canvas.height / 2 + 90);
        ctx.textAlign = 'left';
    }
}

// Game loop
function gameLoop() {
    update();
    draw();
    requestAnimationFrame(gameLoop);
}

// Reset game
function resetGame() {
    player = new Player(canvas.width / 2, canvas.height - 100);
    enemies = [];
    coins = [];
    score = 0;
    coinsCollected = 0;
    gameOver = false;
    wave = 1;
    coinSpawnTimer = 0;
    createPlatforms();
    spawnWave();
}

// Initialize
window.onload = function() {
    console.log('Flat Heroes Game - Final Version');
    console.log('Features: Double Jump, Coyote Time, Dash, Platforms, Coins, Waves');
    resetGame();
    gameLoop();
};
