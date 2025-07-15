'use strict';

const player0El= document.querySelector('.player--0');
const player1El= document.querySelector('.player--1');

const score0El=document.querySelector('#score--0');
const score1El=document.getElementById('score--1');

const current0El= document.querySelector('#current--0');
const current1El= document.getElementById('current--1');

const btnRollDice= document.querySelector('.btn--roll');
const btnNew= document.querySelector('.btn--new');
const btnHold= document.querySelector('.btn--hold');
const diceEl= document.querySelector('.dice');

let score,currentScore,activePlayer,playing;
// initial conditions
const initialze=function () {
    diceEl.classList.add('hidden');
    player0El.classList.remove('player--winner');
    player1El.classList.remove('player--winner');
      score=[0,0];
     currentScore=0;
     activePlayer=0;
     playing=true;
   
   player0El.classList.add('player--active');
   player1El.classList.remove('player--active');
   score0El.textContent=0;
   score1El.textContent=0;
   current0El.textContent=0;
   current1El.textContent=0;    
}
// SWITCHING A PLAYER
const switchPlayer=function() {
    activePlayer= activePlayer === 0 ? 1:0;
    player0El.classList.toggle('player--active');
    player1El.classList.toggle('player--active');
}

initialze();

// USER PRESS DICE ROLL BUTTON
btnRollDice.addEventListener('click', function() {
    if(playing){
        const dice= Math.trunc(Math.random() * 6)+1;
        diceEl.src=`dice-${dice}.png`;
        diceEl.classList.remove('hidden'); 
       if(dice > 1){
           currentScore+=dice;
           
           document.getElementById(`current--${activePlayer}`).textContent=currentScore;
       }
       else if(dice===1){
        currentScore=0;
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
        switchPlayer();
       }
    
    }
   
});

// pressing hold button 
btnHold.addEventListener('click',function() {
    if(playing){
        score[activePlayer]+=currentScore; 
        currentScore=0;  
        document.getElementById(`score--${activePlayer}`).textContent=score[activePlayer];
        document.getElementById(`current--${activePlayer}`).textContent=currentScore;
    // Winning Condition
        if(score[activePlayer] >= 20){
            playing=false;
            diceEl.classList.add('hidden');
            document.querySelector(`.player--${activePlayer}`).classList.add('player--winner');
            document.querySelector(`.player--${activePlayer}`).classList.remove('player--active');
        }
        // switch player without winning
        else if(score[activePlayer] < 20){
            switchPlayer();
      }
    }
   
});

// RESETTING THE GAME
btnNew.addEventListener('click',initialze);
