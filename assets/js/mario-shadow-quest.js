const gameData = [
  {
      image: "./assets/images/yoshi-shadow.jpg",
      options: ["Yoshi", "Toad"],
      correctOption: 0,
  },
  {
      image: "./assets/images/mario-shadow.jpg",
      options: ["Luigi", "Mario"],
      correctOption: 1,
  },
  {
      image: "./assets/images/luigi-shadow.jpg",
      options: ["Luigi", "Yoshi"],
      correctOption: 0,
  },
  {
      image: "./assets/images/daisy-shadow.jpg",
      options: ["Daisy", "Peach"],
      correctOption: 0,
  },
  {
      image: "./assets/images/toad-shadow.jpg",
      options: ["Birdo", "Toad"],
      correctOption: 1,
  },
  {
      image: "./assets/images/dk-shadow.jpg",
      options: ["D.Kong", "Wario"],
      correctOption: 0,
  },
  {
      image: "./assets/images/peach-shadow.jpg",
      options: ["Rosalina", "Peach"],
      correctOption: 1,
  },
  {
      image: "./assets/images/boo-shadow.jpg",
      options: ["Boo", "Toad"],
      correctOption: 0,
  },
  {
      image: "./assets/images/waluigi-shadow.jpg",
      options: ["Luigi", "Waluigi"],
      correctOption: 1,
  },
  {
      image: "./assets/images/wario-shadow.jpg",
      options: ["Mario", "Wario"],
      correctOption: 1,
  },
  {
      image: "./assets/images/rosalina-shadow.jpg",
      options: ["Rosalina", "Daisy"],
      correctOption: 0,
  },
];

// DOM elements
const timeLeft = document.querySelector(".time-left");
const startButton = document.getElementById("start-button");
const winningMessageElement = document.getElementById("winningMessage");
const winningMessageTextElement = document.querySelector(
  "[data-winning-message-text]"
);
const restartButton = document.getElementById("restart-button");


// Game variables
let imageIndex;
let currentTime = 10;
let countDownTimerId = null;
let timerStarted = false;
let highScore = localStorage.getItem("highScore") || 0;


// Set the high score on page load
document.getElementById("high-score-value").textContent = highScore;

// Main game functions

function loadNewImage() {
  imageIndex = Math.floor(Math.random() * gameData.length);

  const gameImage = document.getElementById("shadow-image");
  gameImage.src = gameData[imageIndex].image;

  // Update option button texts
  document.getElementById("option1").textContent =
      gameData[imageIndex].options[0];
  document.getElementById("option2").textContent =
      gameData[imageIndex].options[1];

  // Clear previous result message
  document.getElementById("result-message").textContent = "";
}

// Function to check if the selected option is correct
function checkOption(optionIndex) {
  const resultMessage = document.getElementById("result-message");
  const correctOption = gameData[imageIndex].correctOption;

  if (optionIndex === correctOption) {
      resultMessage.style.color = "green";
      incrementScore();
  } else {
      resultMessage.style.color = "red";
      incrementWrongAnswer();
  }

  // Delay loading a new image for better UX
  setTimeout(loadNewImage, 200);
}

// Score management functions
function incrementScore() {
  let oldScore = parseInt(document.getElementById("score").innerText);
  document.getElementById("score").innerHTML = ++oldScore;
}

function incrementWrongAnswer() {
  let oldScore = parseInt(document.getElementById("incorrect").innerText);
  document.getElementById("incorrect").innerHTML = ++oldScore;
}

// Countdown timer function
function countDown() {
  currentTime--;
  timeLeft.textContent = "Timer: " + currentTime + "s"; 

  if (currentTime === 0) {
      endGame();
  }
}

// Game start function
function startGame() {
  if (!timerStarted) {
      loadNewImage();
      timerStarted = true;
      currentTime = 10;
      countDownTimerId = setInterval(countDown, 1000);
  }
}

// End game function
function endGame() {
  clearInterval(countDownTimerId);
  timerStarted = false;

  const finalScore = document.getElementById("score").innerText;

  //Check if the final score is a new high score
  if (finalScore > highScore) {
    highScore = finalScore;
    localStorage.setItem("highScore", highScore);
    document.getElementById("high-score").textContent = highScore;
  }
  winningMessageTextElement.textContent = `Your final score is ${finalScore}`;
  winningMessageElement.classList.add("show");
}

// Restart game function
function restartGame() {
  window.location.reload();
}



// Event listeners
startButton.addEventListener("click", startGame);
restartButton.addEventListener("click", restartGame);