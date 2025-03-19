const target = document.getElementById('target');
const yourScoreElement = document.getElementById('your-score');
const opponentScoreElement = document.getElementById('opponent-score');
const startButton = document.getElementById('start-button');
const totalClicksInput = document.getElementById('total-clicks');
const gameStatus = document.getElementById('game-status');
const winnerPopup = document.getElementById('winner-popup');
const winnerMessage = document.getElementById('winner-message');
const closeModal = document.getElementById('close-modal');

let yourScore = 0;
let opponentScore = 0;
let totalClicks = 20;
let gameStarted = false;

// Move the target to a random position
function moveTarget() {
  const x = Math.random() * (400 - 50);
  const y = Math.random() * (300 - 50);
  target.style.left = `${x}px`;
  target.style.top = `${y}px`;
}

// Handle click on the target
target.addEventListener('click', () => {
  if (gameStarted) {
    yourScore++;
    yourScoreElement.textContent = yourScore;
    checkGameEnd();
    moveTarget();
    computerClick();
  }
});

// Simulate computer click
function computerClick() {
  if (gameStarted) {
    setTimeout(() => {
      opponentScore++;
      opponentScoreElement.textContent = opponentScore;
      checkGameEnd();
      moveTarget();
    }, Math.random() * 1000 + 500); // Computer clicks after a random delay
  }
}

// Check if the game has ended
function checkGameEnd() {
  if (yourScore >= totalClicks || opponentScore >= totalClicks) {
    gameStarted = false;
    target.style.display = 'none';
    if (yourScore >= totalClicks) {
      winnerMessage.innerHTML = '🎉 You Win! 🎉';
    } else {
      winnerMessage.innerHTML = '😢 Computer Wins! 😢';
    }
    winnerPopup.style.display = 'flex';
  }
}

// Start the game
startButton.addEventListener('click', () => {
  yourScore = 0;
  opponentScore = 0;
  yourScoreElement.textContent = yourScore;
  opponentScoreElement.textContent = opponentScore;
  totalClicks = parseInt(totalClicksInput.value);
  gameStarted = true;
  target.style.display = 'block';
  gameStatus.textContent = 'Game Started!';
  moveTarget();
  computerClick();
});

// Close the winner popup and restart the game
closeModal.addEventListener('click', () => {
  winnerPopup.style.display = 'none';
  // startButton.click(); // Restart the game
});
