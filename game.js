const colorButtons = document.querySelectorAll(".btn");
const levelTitle = document.getElementById("level-title");

const simonGame = {
  isGameOver: true,
  currentLevel: 1,
  colorsOrder: [],
  currentIndex: 0,
};

colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    animateButton.call(this, this.id + "Audio");
    handleButtonClick.call(this);
  });
});

document.addEventListener("keydown", function () {
  if (simonGame.isGameOver) {
    startGame();
  }
});

function animateButton(audio) {
  if (simonGame.isGameOver) return;
  this.classList.add("pressed");
  document.getElementById(audio).play();
  setTimeout(() => {
    this.classList.remove("pressed");
  }, 50);
}

function startGame() {
  simonGame.colorsOrder = [];
  simonGame.isGameOver = false;
  simonGame.currentLevel = 1;
  updateTitle("Level " + simonGame.currentLevel);
  simonGame.currentIndex = 0;
  generateRandomColor();
}

function handleButtonClick() {
  if (simonGame.isGameOver) return;
  if (this.id !== simonGame.colorsOrder[simonGame.currentIndex]) {
    endGame();
  } else if (simonGame.currentIndex + 1 === simonGame.currentLevel) {
    advanceLevel();
  } else {
    simonGame.currentIndex++;
  }
}

function endGame() {
  simonGame.isGameOver = true;
  updateTitle("Game Over, Press Any Key to Restart");
  document.body.classList.add("game-over");
  playSound("wrongAudio");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 200);
}

function advanceLevel() {
  simonGame.currentLevel++;
  updateTitle("Level " + simonGame.currentLevel);
  simonGame.currentIndex = 0;
  setTimeout(() => {
    generateRandomColor();
  }, 1000);
}

function generateRandomColor() {
  const randomColorButton =
    colorButtons[Math.floor(Math.random() * colorButtons.length)];
  simonGame.colorsOrder.push(randomColorButton.id);
  animateButton.call(randomColorButton, randomColorButton.id + "Audio");
}

function updateTitle(text) {
  levelTitle.textContent = text;
}

function playSound(audio) {
  document.getElementById(audio).play();
}
