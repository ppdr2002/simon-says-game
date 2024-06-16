const colors = ['green', 'red', 'yellow', 'blue'];
let gameSequence = [];
let playerSequence = [];
let level = 0;
let isPlayerTurn = false;
let playSpeed = 600;

const startButton = document.getElementById('start');
const buttons = document.querySelectorAll('.button');
const levelDisplay = document.getElementById('level');

startButton.addEventListener('click', startGame);

buttons.forEach(button => {
    button.addEventListener('click', handlePlayerInput);
});

function startGame() {
    gameSequence = [];
    playerSequence = [];
    level = 0;
    playSpeed = 600;
    isPlayerTurn = false;
    nextLevel();
}

function nextLevel() {
    playerSequence = [];
    level++;
    levelDisplay.textContent = `Level: ${level}`;
    const nextColor = colors[Math.floor(Math.random() * colors.length)];
    gameSequence.push(nextColor);
    playSequence();
}

function playSequence() {
    isPlayerTurn = false;
    gameSequence.forEach((color, index) => {
        setTimeout(() => {
            playColor(color);
        }, (index + 1) * playSpeed);
    });
    setTimeout(() => {
        isPlayerTurn = true;
    }, gameSequence.length * playSpeed + 500);
    playSpeed = Math.max(200, playSpeed - 20);  // Increase speed as levels progress
}

function playColor(color) {
    const button = document.getElementById(color);
    button.classList.add('active');
    setTimeout(() => {
        button.classList.remove('active');
    }, playSpeed / 2);
}

function handlePlayerInput(event) {
    if (!isPlayerTurn) return;
    const color = event.target.id;
    playerSequence.push(color);
    playColor(color);
    
    if (!checkSequence()) {
        alert('Game Over! You reached level ' + level);
        startGame();
    } else if (playerSequence.length === gameSequence.length) {
        setTimeout(nextLevel, 1000);
    }
}

function checkSequence() {
    return playerSequence.every((color, index) => {
        return color === gameSequence[index];
    });
}
