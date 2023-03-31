const startGameBtn = document.getElementById("start-button");
const gameZone = document.getElementById("game-zone");
const scoreSpan = document.getElementById("score");
const letterList = document.getElementById("word-to-guess");

let score = {
  wins: 0,
  losses: 0,
};

let wordsArray = ["test", "apple", "banana"];

// Pull a random word from the array
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}

function revealLetter(element) {
  if (element.dataset.state == "hidden") {
    element.dataset.state = "display";
  } else {
    element.dataset.state = "hidden";
  }
}

startGameBtn.addEventListener("click", function () {
  console.log("start game button works");
  console.log(getRandomWord(wordsArray));

  let wordToGuessArr = getRandomWord(wordsArray).split("");

  for (let i = 0; i < wordToGuessArr.length; i++) {
    let letterHTML = document.createElement("li");
    letterHTML.setAttribute("data-letter", wordToGuessArr[i]);
    letterHTML.setAttribute("data-state", "hidden");
    letterHTML.textContent = "_";
    letterList.appendChild(letterHTML);
  }
});

letterList.addEventListener("click", function (event) {
  var element = event.target;
  if (element.matches("li") == true) {
    revealLetter(element);
    console.log(element.dataset.state);
  }
});
