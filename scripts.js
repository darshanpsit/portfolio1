const cells = document.querySelectorAll('.cell');
const statusDiv = document.getElementById('status');
const restartBtn = document.getElementById('restart');
let currentPlayer = 'X';
let board = ['', '', '', '', '', '', '', '', ''];
let gameActive = true;

const winningConditions = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6]
];

const handleCellClick = (e) => {
    const clickedCell = e.target;
    const clickedCellIndex = parseInt(clickedCell.getAttribute('data-index'));

    if (board[clickedCellIndex] !== '' || !gameActive) {
        return;
    }

    board[clickedCellIndex] = currentPlayer;
    clickedCell.textContent = currentPlayer;

    if (checkWin()) {
        statusDiv.textContent = `${currentPlayer} Wins!`;
        gameActive = false;
        return;
    }

    if (board.every(cell => cell !== '')) {
        statusDiv.textContent = `It's a Draw!`;
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusDiv.textContent = `${currentPlayer}'s Turn`;
};

const checkWin = () => {
    return winningConditions.some(condition => {
        return condition.every(index => board[index] === currentPlayer);
    });
};

const restartGame = () => {
    board = ['', '', '', '', '', '', '', '', ''];
    gameActive = true;
    currentPlayer = 'X';
    statusDiv.textContent = `${currentPlayer}'s Turn`;
    cells.forEach(cell => cell.textContent = '');
};

const goHome = () => {
    window.location.href = "home.html"; // Redirect to home page
};

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
restartBtn.addEventListener('click', restartGame);

statusDiv.textContent = `${currentPlayer}'s Turn`;
