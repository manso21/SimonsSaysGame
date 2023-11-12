// Select all buttons with the class "btn"
const colorButtons = document.querySelectorAll(".btn");

// Select the element with the ID "level-title"
const levelTitle = document.getElementById("level-title");

// Game state and logic encapsulated in an object
const simonGame = {
  isGameOver: true,
  currentLevel: 1,
  colorsOrder: [],
  currentIndex: 0,
};

// Event listeners for color buttons
colorButtons.forEach((button) => {
  button.addEventListener("click", function () {
    animateButton.call(this, this.id + "Audio");
    handleButtonClick.call(this);
  });
});

// Event listener for starting the game on key press
document.addEventListener("keydown", function () {
  if (simonGame.isGameOver) {
    startGame();
  }
});

// Function to animate a button
function animateButton(audio) {
  if (simonGame.isGameOver) return;
  this.classList.add("pressed");
  document.getElementById(audio).play();
  setTimeout(() => {
    this.classList.remove("pressed");
  }, 50);
}

// Function to start the game
function startGame() {
  simonGame.colorsOrder = [];
  simonGame.isGameOver = false;
  simonGame.currentLevel = 1;
  updateTitle("Level " + simonGame.currentLevel);
  simonGame.currentIndex = 0;
  generateRandomColor();
}

// Function to handle button click
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

// Function to end the game
function endGame() {
  simonGame.isGameOver = true;
  updateTitle("Game Over, Press Any Key to Restart");
  document.body.classList.add("game-over");
  playSound("wrongAudio");
  setTimeout(() => {
    document.body.classList.remove("game-over");
  }, 200);
}

// Function to advance to the next level
function advanceLevel() {
  simonGame.currentLevel++;
  updateTitle("Level " + simonGame.currentLevel);
  simonGame.currentIndex = 0;
  setTimeout(() => {
    generateRandomColor();
  }, 1000);
}

// Function to generate a random color
function generateRandomColor() {
  const randomColorButton =
    colorButtons[Math.floor(Math.random() * colorButtons.length)];
  simonGame.colorsOrder.push(randomColorButton.id);
  animateButton.call(randomColorButton, randomColorButton.id + "Audio");
}

// Function to update the title text
function updateTitle(text) {
  levelTitle.textContent = text;
}

// Function to play a sound
function playSound(audio) {
  document.getElementById(audio).play();
}
