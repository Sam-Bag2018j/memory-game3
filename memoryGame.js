
var backCardList = [];
var frontCardList = [];
frontCardList = document.getElementsByClassName("front-face");
console.log(frontCardList);
backCardList = document.getElementsByClassName("back-face");
console.log(backCardList);

var timerGame = document.getElementsByClassName("display-timer");
let card1 = document.getElementsByClassName("card");
let cards1 = [...card1]
const deck = document.getElementById("back-face");

let flipedCard = false;
let firstCard, secondCard;
let lock = false;
var counter = 0;
var matchingCard = 0;
var stopCounting = false;
var firstClick=false;

var firstStar = document.getElementById('star1');
var secondStar = document.getElementById('star2');
var secs=30;
var remainingSeconds;
//timer
function floor(x) {
  return x | 0;
}

function pad(n) {
  if (n < 0) {
    n = -n;
  }
  if (n < 10) {
    return '0' + n.toString();
  }
  return n.toString();
}

function secondPassed() {
  if(stopCounting)
   return;
   
   if(firstClick){
 
  var minutes = pad(floor(secs / 60));

  if (secs < 0) {
     return secs = 0;


  }
   remainingSeconds = pad(secs % 60);

  document.getElementById('countdown').innerHTML = minutes + ":" + remainingSeconds;

  if (secs > 0) {
    secs--;
    if (secs >= 27) {
      countdown.style.color = "green";
    }
    else {
      if (/*secs <= 15 && secs >= 10*/ secs==15) {
        console.log("number of seconds"+secs);
        countdown.style.color = "yellow";
        document.getElementById("star1").remove();

      }
      else
       {
         if(secs==9){
        countdown.style.color = "red";
        document.getElementById("star2").remove();}
      }
    }
  }
  else {
    secs--;
  }
}
}
 var countdownTimer = setInterval('secondPassed()', 1000);

  //var countdownTimer;
document.getElementById('movements').innerHTML = counter + " " + "movements";

const cards = document.querySelectorAll('.card');


//check the card is flip it, and prevent it to flip it more than one. 
function cardFlip() {
  firstClick=true;
 
  document.getElementById('movements').innerHTML = counter + " " + "movements";
  if (lock)
  return;

  if (this === firstCard)
    return;

  this.classList.add('flip');

  if (!flipedCard) {
    //check if it is the first click
    flipedCard = true;
    firstCard = this;
    console.log("this is the first click");
    counter++;
    return;
  }

  //check if it is the second click
  flipedCard = false;
  secondCard = this;
  console.log("it's cecond click ");

  checkMathingCard();

}

function checkMathingCard() {
  if (firstCard.dataset.image === secondCard.dataset.image) {
    //if the cards matching  
    deleteMatchingCards();
    matchingCard++;
    console.log("matching cards is" + " " + matchingCard);
  }
  //if the cards not matching
  else {
    lock = true;
    setTimeout(() => {
      firstCard.classList.remove('flip');
      secondCard.classList.remove('flip');
      // lock will preven flip the second set until the previous set finish checking matching 
      lock = false;
      resetCard();
    }, 1000);


  }
  //counter++;
  console.log("the counter is" + counter);
  congratulation();
 

}
//disable flipping the first and second cards when they match
function deleteMatchingCards() {
  firstCard.removeEventListener('click', cardFlip);
  firstCard.removeEventListener('click', cardFlip);
  resetCard();
  console.log("now the two cards matched");

}
//to reset the first and second card after checking matching
function resetCard() {
  [flipedCard, lock] = [false, false];
  [firstCard, secondCard] = [null, null];

}

(function shuffle() {
  cards.forEach(card => {
    let randompos = Math.floor(Math.random() * 8);
    card.style.order = randompos;
  });
})();

cards.forEach(card => card.addEventListener('click', cardFlip));

//congratulation function when the game finished
function congratulation() {
 let remainTime;
 remainTime= 30 - secs;
  if (matchingCard == 4) {
    if ((matchingCard == 4) && (secs >= 15 && secs <= 30)) {
      window.alert("congratulation" + " " + "your movements are" + " " + counter + " " + "you get three stars" + " " + "in" + " " + remainTime + " " + "second!");
    }
    else
      if (matchingCard == 4 && (secs < 15 && secs >= 10) ) {

        window.alert("congratulation" + " " + "your movements are" + counter + " " + "you get two starts" + " " + "in" + " " + remainTime + " " + "second!");

      }

      else{
        window.alert("congratulation" + " " + "your movements are" + counter + " " + "you get one starts" + " " + "in" + " " + remainTime + " " + "second!");
      } 
        //ask the user if want play agin
        var t = confirm("do you want to play again?")
        //console.log(t);
    if (t) {
      resetGame();
     // secs=30;
    }
    else
    {
      //to stop the timer
      stopCounting = true;
     // countdownTimer= null;

      if(secs >=10)
    document.getElementById('countdown').innerHTML = "0" + ":" + secs ;
    else
    document.getElementById('countdown').innerHTML = "0" + ":" +"0"+ secs ;

    //document.getElementById("btn").onclick = resetGame();
    console.log("we completed the game");
 
   }
    
  }
}

//to reset the game when user click on reset button
function resetGame() {
  matchingCard = 0;
  secs = 30;
  resetCard();
  firstClick=false;
   counter = 0;
  //cardFlip();
  document.getElementById('movements').innerHTML = counter + " " + "movements";
  document.getElementById('starsdiv').innerHTML += '<img class="star-item" id="star1" src="https://img.freepik.com/free-vector/start_53876-25533.jpg?size=338&ext=jpg" />';
  document.getElementById('starsdiv').innerHTML += '<img class="star-item" id="star2" src="https://img.freepik.com/free-vector/start_53876-25533.jpg?size=338&ext=jpg" />';

  var imgs = document.querySelectorAll('div.flip');
  [].forEach.call(imgs, function (element, index, array) {
    element.classList.toggle("flip", false);

  });
  var imgs = document.querySelectorAll('div.flip img');
  [].forEach.call(imgs, function (element, index, array) {
    element.classList.toggle("back-face", false);
    element.classList.toggle("front-face", true);

  });
  cards.forEach(card => card.addEventListener('click', cardFlip));
  //to shuffle the cards
  cards.forEach(card => {
    let randompos = Math.floor(Math.random() * 8);
    card.style.order = randompos;
  });
  
}



