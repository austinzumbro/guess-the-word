// Gather elements
const startGameBtn = document.getElementById("start-button");
const clearScoreBtn = document.getElementById("clear-score");
const gameZone = document.getElementById("game-zone");
const scoreSpan = document.getElementById("score");
const letterList = document.getElementById("word-to-guess");
const timer = document.getElementById("timer");
const wins = document.getElementById("wins");
const losses = document.getElementById("losses");

let wordsArray = ["test", "apple", "banana"];
let intervalTimer;

timer.innerHTML = "Time Remaining:<br>" + 15 + " seconds";

// initial score
let score = {
  wins: 0,
  losses: 0,
};

// Pull a wins and losses record from local storage and report it on the page
// If not such record exists, print the initial state.
function reportScore() {
  let storedWins = parseInt(localStorage.getItem("wins"));
  let storedLosses = parseInt(localStorage.getItem("losses"));
  score = { wins: 0, losses: 0 };
  if (storedWins) {
    score.wins = storedScore;
  }
  if (storedLosses) {
    score.losses = storedLosses;
  }
  wins.textContent = score.wins;
  losses.textContent = score.losses;
}

// Store the wins and losses record in local storage
function storeScore() {
  let winsScore = localStorage.setItem("wins", score.wins);
  let lossScore = localStorage.setItem("losses", score.losses);
  winsScore;
  lossScore;
}

function clearScore() {
  localStorage.clear();
  reportScore();
}

// Pull a random word from an array
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

// Switch a letter's state from hidden to display
function revealLetter(element) {
  if (element.dataset.state == "hidden") {
    element.dataset.state = "display";
    element.textContent = element.dataset.letter;
  }
}

// Runs the timer
function startTimer() {
  let count = 15;
  intervalTimer = setInterval(function () {
    if (count > 1) {
      timer.innerHTML = "Time Remaining:<br>" + count + " seconds";
      count--;
    } else if (count == 1) {
      timer.innerHTML = "Time Remaining:<br>" + count + " second!";
      count--;
    } else {
      timer.innerHTML = "Bad Buzzer Sound!";
      defeat();
      clearInterval(intervalTimer);
    }
  }, 1000);
}

// When the start button is clicked, do the following:
startGameBtn.addEventListener("click", function () {
  // Start the timer
  startTimer();

  // Clear the previous word, as needed
  letterList.innerHTML = "";

  // Get a random word from the array and store it as an array
  let wordToGuessArr = getRandomWord(wordsArray).split("");

  // Append the letters in the array as li elements.
  for (let i = 0; i < wordToGuessArr.length; i++) {
    let letterHTML = document.createElement("li");
    letterHTML.setAttribute("data-letter", wordToGuessArr[i]);
    letterHTML.setAttribute("data-state", "hidden");
    letterHTML.textContent = "_";
    letterList.appendChild(letterHTML);
  }
});

clearScoreBtn.addEventListener("click", function () {
  clearScore();
});

document.addEventListener("keydown", function (event) {
  // Get the key pressed
  let pressedKey = event.key;

  // Get the HTML Collection of list elements
  let listArr = letterList.children;

  // Iterate over the list and compare them to the key pressed
  for (let i = 0; i < listArr.length; i++) {
    // Reveal the letter if it matches
    if (pressedKey == listArr[i].dataset.letter) {
      revealLetter(listArr[i]);
    }
  }
  // Check for the win condition
  statusCheck(listArr);
});

// Checks to see if all the letters have been revealed
function statusCheck(arr) {
  let counter = 0;
  for (let i = 0; i < arr.length; i++) {
    if (arr[i].dataset.state == "display") {
      counter++;
    }
    if (counter == arr.length) {
      clearInterval(intervalTimer);
      timer.textContent = "You win!";
      victory();
    }
  }
}

function victory() {
  console.log("You win!");
  score.wins++;
  wins.textContent = score.wins;
  losses.textContent = score.losses;
  storeScore();
}
function defeat() {
  console.log("You lose :(");
  score.losses++;
  wins.textContent = score.wins;
  losses.textContent = score.losses;
  storeScore();
}

reportScore();
