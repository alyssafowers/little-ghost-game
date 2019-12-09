
var goalNumber = Math.round(Math.random()*100);

console.log(goalNumber);

var guess;
var allGuess = [];
var allDistance = [];
var tryCount;
var distance;
var lastTime;

var formSubmit = document.querySelector("#number-guess [type=submit]");
var enterNumber = document.querySelector("input[type=number]");

console.log(enterNumber)

var feedbackBox = document.getElementById("feedback-form").firstChild;
var tryText = document.getElementById("tries").firstChild;
var friend = document.getElementById("friend");

var ghostBody = document.getElementById("ghost-body")
var openMouth = document.getElementById("open-mouth");
var neutralMouth = document.getElementById("neutral-mouth");
var makeHappy = document.getElementById("make-happy");
var makeSad = document.getElementById("make-sad");
var leftBrow = document.getElementById("left-brow");
var rightBrow = document.getElementById("right-brow");

var bigMad = false;

var sadFace = function(){
  openMouth.setAttribute("opacity", "1")
  makeHappy.setAttribute("opacity", "0")
  makeSad.setAttribute("opacity", "1");
  neutralMouth.setAttribute("opacity", "0");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var bigSadFace = function(){
  openMouth.setAttribute("opacity", "1")
  makeHappy.setAttribute("opacity", "0")
  makeSad.setAttribute("opacity", "1");
  neutralMouth.setAttribute("opacity", "1");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var happyFace = function(){
  openMouth.setAttribute("opacity", "1")
  makeHappy.setAttribute("opacity", "1")
  makeSad.setAttribute("opacity", "0");
  neutralMouth.setAttribute("opacity", "0");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var victoryFace = function(){
  openMouth.setAttribute("opacity", "1")
  makeHappy.setAttribute("opacity", "1")
  makeSad.setAttribute("opacity", "0");
  neutralMouth.setAttribute("opacity", "1");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var neutralFace = function(){
  openMouth.setAttribute("opacity", "0")
  makeHappy.setAttribute("opacity", "0")
  makeSad.setAttribute("opacity", "0");
  neutralMouth.setAttribute("opacity", "1");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var ooFace = function(){
  openMouth.setAttribute("opacity", "1")
  makeHappy.setAttribute("opacity", "0")
  makeSad.setAttribute("opacity", "0");
  neutralMouth.setAttribute("opacity", "0");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var clearMouth = function(){
  openMouth.setAttribute("opacity", "0");
  makeHappy.setAttribute("opacity", "0");
  makeSad.setAttribute("opacity", "0");
  neutralMouth.setAttribute("opacity", "0");
  leftBrow.setAttribute("opacity", "0");
  rightBrow.setAttribute("opacity", "0");
}

var angryFace = function(){
  openMouth.setAttribute("opacity", "1");
  makeHappy.setAttribute("opacity", "0");
  makeSad.setAttribute("opacity", "1");
  makeSad.style.stroke="#ff3333";
  neutralMouth.setAttribute("opacity", "1");
  leftBrow.setAttribute("opacity", "1");
  rightBrow.setAttribute("opacity", "1");
  ghostBody.style.fill="#ff3333";
  ghostBody.setAttribute("opacity", "1")
}

var errorDecimal = "I don't know decimals! Try a whole number.";
var errorBig= "I can only count to 100. Try a smaller number?"
var errorZero="I don't know what zero means! I am a very old ghost."
var errorString="I don't understand. Try a digit instead?"
var waiting = "What'll it be?";
var victory = "You did it! That's the number!";
var wrongFirst = "Oops, that's not it. Try again!";
var wrongWarm = "That's not it, but you're getting warmer!";
var wrongCold = "That's definitely not it. Getting colder.";
var wrongSame = "Weren't we just here?";
var wrongSameDistance = "Just as wrong, but in the other direction.";
var touchWarning = "ooOOOoooOOOOoo can't touch this"
var touchClick = "I SAID DON'T TOUCH THIS"

ghostBody.addEventListener("click", function(){
  feedbackBox.nodeValue=touchClick;
  formSubmit.setAttribute("value", "NO");
  enterNumber.disabled=true;
  enterNumber.value="666";
  formSubmit.disabled=true;
  tryText.nodeValue="NO MORE TRIES!!! LEARN BOUNDARIES!!!";
  angryFace();
  bigMad = true;
})

ghostBody.addEventListener("mouseover", function(){
  if (bigMad == false){
    clearMouth();
    ghostBody.setAttribute("opacity", ".3")
    ghostBody.style.fill="#ff3333";
    ghostBody.style.stroke="none";
    feedbackBox.nodeValue = touchWarning;
  };
})

ghostBody.addEventListener("mouseleave", function(){
  if (bigMad == false){
    clearMouth();
    ghostBody.setAttribute("opacity", "1")
    ghostBody.style.fill="white";
    feedbackBox.nodeValue = waiting;
    ghostBody.style.stroke="black";
  }
})

enterNumber.onfocus = function(){
  ooFace()
  feedbackBox.nodeValue=waiting;
}

formSubmit.addEventListener("click", function(event){

  event.preventDefault();

  guess = document.forms[0].elements[0].value;

  if(guess % 1 !=0){
    //if the guess isn't an integer:
    feedbackBox.nodeValue = errorDecimal;
    sadFace();
  } else if(isNaN(parseInt(guess))){
    feedbackBox.nodeValue = errorString;
    sadFace();
  } else {
    //if the guess is an integer:
    distance = Math.abs(goalNumber - guess);
    allGuess.push(guess);
    allDistance.push(distance);

    tryCount = allGuess.length;

    if(distance == 0){
      //if the guess IS the number:
      feedbackBox.nodeValue = victory;
      victoryFace();
    } else {
      if(guess > 100){
        feedbackBox.nodeValue = errorBig;
        sadFace();
      } else if(guess == 0){
        feedbackBox.nodeValue = errorZero;
        sadFace();
      } else if(allGuess.length == 1){
        //if this is the first guess
        feedbackBox.nodeValue = wrongFirst;
        neutralFace()
      } else if(guess == lastTime){
        feedbackBox.nodeValue = wrongSame;
        sadFace();
      } else if(allDistance[tryCount - 2] > distance) {
        happyFace();
        feedbackBox.nodeValue = wrongWarm;
      } else if(allDistance[tryCount - 2] < distance) {
          feedbackBox.nodeValue = wrongCold;
          neutralFace();
      } else if(allDistance[tryCount - 2] == distance){
        feedbackBox.nodeValue = wrongSameDistance;
        sadFace();
      } else {
        feedbackBox.nodeValue = "Something seems to have gone wrong."
        sadFace();
      }
    }
  }
  tryText.nodeValue=tryCount;
  lastTime = document.forms[0].elements[0].value;
}, false);
