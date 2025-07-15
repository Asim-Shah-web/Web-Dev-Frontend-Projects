'use strict';
/*
console.log(document.querySelector('.message').textContent);
document.querySelector('.message').textContent= "🎉 Correct Number ";
document.querySelector('.number').textContent= 23;
document.querySelector('.score').textContent= 10;

document.querySelector('.guess').value= 22;
*/

const selectMessage=document.querySelector('.message');
const selectNumber = document.querySelector('.number');

// GENERATING RANDOM NUMBER AND STORING IT IN A VARIABLE;
let secretNumber =Math.trunc(Math.random() * 20 ) +1;
// selectNumber.textContent= secretNumber;
let highScore=0;

// dispalying whether input guess is low or high
const displayMessage = function(inp,secr){
    if (score > 0) {
        selectMessage.textContent= inp > secr ? "📈 Too high":"📉 Too Low"; 
        score--;
        document.querySelector('.score').textContent=score;
        clearGuess();
    } else {
    selectMessage.textContent = "😭 YOU LOST THE GAME";
    document.querySelector('.score').textContent = 0;
    }
}

// Clearing the input box after pressing the check button
const clearGuess = function(){
    document.querySelector('.guess').value= "";
}

let score= 20;
// ADDING EVENT LISTENER TO CHECK BUTTON
document.querySelector('.check').addEventListener('click',function() {
const guess=Number(document.querySelector('.guess').value);
console.log(guess,typeof guess);


// IF NO NUMBER IS PASSED
if(!guess){
 selectMessage.textContent= "🌶 No Number";

}
// IF CORRECT NUMBER IS GIVEN
else if (guess=== secretNumber) {
    selectMessage.textContent= "🎉 Correct Number ";
    document.querySelector('body').style.backgroundColor= "#60b347"
    selectNumber.style.width= "30rem";
    selectNumber.textContent= secretNumber;
    if(score > highScore){
        highScore=score;
        // console.log(highScore);
        document.querySelector('.highscore').textContent=highScore;
    }
} 

// IF NUMBER IS TOO HIGH
else if(guess > secretNumber) {
  displayMessage(guess,secretNumber);
   
}
// IF NUMBER IS TOO LOW
else if(guess < secretNumber){
   displayMessage(guess,secretNumber);
}
});

// Coding Challenge #1

/* 
Implement a game rest functionality, so that the player can make a new guess! Here is how:

1. Select the element with the 'again' class and attach a click event handler
2. In the handler function, restore initial values of the score and secretNumber variables
3. Restore the initial conditions of the message, number, score and guess input field
4. Also restore the original background color (#222) and number width (15rem)

GOOD LUCK 😀
*/

// HANDLER OF PRESSING AGAIN BUTTON
document.querySelector('.again').addEventListener('click',function() {
    score=20;
    document.querySelector('.score').textContent=score;
     secretNumber=Math.trunc(Math.random()*20)+1;
     selectNumber.textContent= secretNumber;

    selectMessage.textContent="Start guessing...";
     clearGuess();
     document.querySelector('body').style.backgroundColor=" #222";
     selectNumber.style.width="15rem";
     selectNumber.textContent="?";
    });