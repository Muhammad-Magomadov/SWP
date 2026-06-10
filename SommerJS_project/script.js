let score = 0;
const fields = document.querySelectorAll('.field');
let spawnCounter = 0;
let spawnInterval = null;
let gameStarted = false;

const gameOverOverlay = document.getElementById('game-over');
if (gameOverOverlay) {
    gameOverOverlay.classList.add('hidden');
}

function getRandomField() {
    const randomIndex = Math.floor(Math.random() * fields.length);
    return fields[randomIndex];
}

function startGame() {
    if (gameStarted) return;
    gameStarted = true;
    document.getElementById('start-btn').style.display = 'none';
    spawnInterval = setInterval(spawnWorm, 1000);
}

function updateScore() {
    document.getElementById('score-text').textContent = 'Punkte: ' + score;
}

function removeHeart() {
    const hearts = document.querySelectorAll('.heart');
    if (hearts.length === 0) return;

    hearts[hearts.length - 1].remove();

    const remaining = document.querySelectorAll('.heart');
    if (remaining.length === 0) {
        showGameOver();
    }
}

function showGameOver() {
    const overlay = document.getElementById('game-over');
    if (!overlay) return;
    overlay.classList.remove('hidden');
    overlay.style.display = 'flex';
    clearInterval(spawnInterval);
}

function restartGame() {
    window.location.reload();
}

function spawnWorm() {
    const randomField = getRandomField();
    if (randomField.classList.contains('active')) return;

    const wormId = ++spawnCounter;
    randomField.dataset.wormId = wormId;
    randomField.classList.add('active');
    randomField.innerHTML = '<img src="bilder/marcel_tongue.png" alt="Wurm" draggable="false">';

    setTimeout(function () {
        if (randomField.dataset.wormId != wormId) return;
        if (!randomField.classList.contains('active')) return;
        randomField.classList.remove('active');
        randomField.innerHTML = '';
        removeHeart();
    }, 5000);
}

fields.forEach(function (field) {
    field.addEventListener('pointerdown', function (event) {
        if (!field.classList.contains('active')) return;
        event.preventDefault();
        field.classList.remove('active');
        field.innerHTML = '';
        score++;
        updateScore();
    });
});

const startButton = document.getElementById('start-btn');
if (startButton) {
    startButton.addEventListener('click', startGame);
}

const restartButton = document.getElementById('restart-btn');
if (restartButton) {
    restartButton.addEventListener('click', restartGame);
}
