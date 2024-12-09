const gameArea = document.getElementById('gameArea');
const scoreDisplay = document.getElementById('score');
const gridSize = 20;
let snake = [{ x: 10, y: 10 }];
let direction = { x: 0, y: 0 };
let food = { x: 5, y: 5 };
let score = 0;

// Initialize game area
for (let i = 0; i < gridSize * gridSize; i++) {
    const cell = document.createElement('div');
    cell.classList.add('cell');
    gameArea.appendChild(cell);
}

// Update game
function update() {
    // Move snake
    const head = { x: snake[0].x + direction.x, y: snake[0].y + direction.y };
    snake.unshift(head);

    // Check for collisions with food
    if (head.x === food.x && head.y === food.y) {
        score++;
        scoreDisplay.textContent = score;
        placeFood();
    } else {
        snake.pop();
    }

    // Check for collisions with walls or itself
    if (head.x < 0 || head.x >= gridSize || head.y < 0 || head.y >= gridSize ||
        snake.slice(1).some(segment => segment.x === head.x && segment.y === head.y)) {
        alert('Game Over');
        resetGame();
    }

    draw();
}

// Draw game state
function draw() {
    document.querySelectorAll('.cell').forEach(cell => cell.classList.remove('snake', 'food'));
    snake.forEach(segment => {
        const index = segment.y * gridSize + segment.x;
        document.querySelectorAll('.cell')[index].classList.add('snake');
    });
    const foodIndex = food.y * gridSize + food.x;
    document.querySelectorAll('.cell')[foodIndex].classList.add('food');
}

// Place food at a random position
function placeFood() {
    food.x = Math.floor(Math.random() * gridSize);
    food.y = Math.floor(Math.random() * gridSize);
}

function resetGame() {
    snake = [{ x: 10, y: 10 }];
    direction = { x: 0, y: 0 };
    score = 0;
    scoreDisplay.textContent = score;
    placeFood();
    draw();
}

// Handle keypress for snake direction
window.addEventListener('keydown', e => {
    switch (e.key) {
        case 'ArrowUp':
            if (direction.y === 0) direction = { x: 0, y: -1 };
            break;
        case 'ArrowDown':
            if (direction.y === 0) direction = { x: 0, y: 1 };
            break;
        case 'ArrowLeft':
            if (direction.x === 0) direction = { x: -1, y: 0 };
            break;
        case 'ArrowRight':
            if (direction.x === 0) direction = { x: 1, y: 0 };
            break;
    }
});

// Game loop
setInterval(update, 100);

// Start game
resetGame();
