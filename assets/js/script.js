const startGameBtn = document.getElementById("start-button");
const gameZone = document.getElementById("game-zone");
const scoreSpan = document.getElementById("score");
const letterList = document.getElementById("word-to-guess");
const timer = document.getElementById("timer");
let wins = document.getElementById("wins");
let losses = document.getElementById("losses");

let score = {
  wins: 0,
  losses: 0,
};

let wordsArray = ["test", "apple", "banana"];
let intervalTimer;


function reportScore(){
  score.wins = parseInt(localStorage.getItem("wins"));
  score.losses = parseInt(localStorage.getItem("losses"));
  wins.textContent = score.wins
  
  losses.textContent = score.losses
}
reportScore();

// Pull a random word from the array
function getRandomWord(array) {
  return array[Math.floor(Math.random() * array.length)];
}


function revealLetter(element) {
  if (element.dataset.state == "hidden") {
    element.dataset.state = "display";
    element.textContent = element.dataset.letter;
  }
}
function startTimer(){
  let count = 15;
  intervalTimer = setInterval(function(){

    timer.textContent = count;
    count--
    if(count == -1){
      console.log("This should be over.");
      defeat();
      clearInterval(intervalTimer);
    }
  },1000)
}
//startTimer.intervalTimer
startGameBtn.addEventListener("click", function () {
    //Set the content of the list
  letterList.innerHTML = "";

  let wordToGuessArr = getRandomWord(wordsArray).split("");

  for (let i = 0; i < wordToGuessArr.length; i++) {
    let letterHTML = document.createElement("li");
    letterHTML.setAttribute("data-letter", wordToGuessArr[i]);
    letterHTML.setAttribute("data-state", "hidden");
    letterHTML.textContent = "_";
    letterList.appendChild(letterHTML);
  }
  startTimer();



});




// letterList.addEventListener("click", function (event) {
//   var element = event.target;
//   if (element.matches("li") == true) {
//     revealLetter(element);
//     console.log(element.dataset.state);
//   }
// });

// function isPressedInList(element, wordToGuess){
//   for(let i = 0; i < wordToGuess.length; i++){
//     if(wordToGuess[i] == (element)){

//     }
//   }

// }

document.addEventListener("keydown", function (event) {
  // let btnPress = event.target
  let pressedKey = event.key
  //Get the list item in the dom.
  let listArr = letterList.children
  for(let i = 0; i < listArr.length; i++ ){
    if(pressedKey == listArr[i].dataset.letter){
      revealLetter(listArr[i])
    }
  }
  statusCheck(listArr)
  //Run down every list item
  //If the data's list item letter matches the pressed key
  //Switch the state
  // isPressedInList(pressedKey)
})

function statusCheck(arr) {
  let counter = 0;
  for(let i = 0; i < arr.length; i++){
    if (arr[i].dataset.state == "display"){
      counter++
    } if (counter == arr.length){
      clearInterval(intervalTimer);
      timer.textContent = "You win!";
      victory()
    }

    //Some way to check if ALL of the array's states are "display"
  }

}

function storeScore(){
  let winsScore = localStorage.setItem("wins", score.wins)
  let lossScore = localStorage.setItem('losses', score.losses)

  winsScore; lossScore;
}
function victory(){
  console.log("You win!")
  score.wins++
  wins.textContent = score.wins
  losses.textContent = score.losses
  storeScore();
}
function defeat(){
  console.log("You lose :(")
  score.losses++
  wins.textContent = score.wins
  losses.textContent = score.losses
  storeScore();
}
