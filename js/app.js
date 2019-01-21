// function to reset/start game

// Create a list that holds all of your cards
let card = document.querySelectorAll(".card");
const allCards = [...card];
const deck = document.querySelector(".deck");
let movesCountText = document.querySelector(".moves");
let star = document.querySelectorAll(".stars li");
const stars = [...star];
const restart = document.querySelector('.restart');
let moves;
const timer = document.querySelector('.timer');
let time; 
let timePassed;
const playAgain = document.querySelector('.playAgain');
let matchedCards;
let flippedCard;

//Start Game
window.onload = startGame();

function startGame() {
	moves = 0;
	shuffleCards();
	time = 0;
	timer.innerHTML = "0:00";	
	stopTime();
}

// Restart game
restart.addEventListener('click', restartGame);

function restartGame() {
	startGame();
	movesCountText.innerHTML = moves;
	for (i=0; i < star.length; i++) {
		star[i].style.display = "inline-block";
}
	for (i=0; i < matchedCards.length; i++) {
		matchedCards[i].classList.remove('match');
	}	
	for (i=0; i < flippedCard.length; i++) {
		flippedCard[i].classList.remove('open', 'show');
	}
	flippedCard = [];
	matchedCards = [];
}


/* Display the cards on the page
 * shuffle the list of cards using the provided "shuffle" method below */
 
// Shuffle function from http://stackoverflow.com/a/2450976
function shuffle(array) {
    var currentIndex = array.length, temporaryValue, randomIndex;

    while (currentIndex !== 0) {
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
    }

    return array;
}

 /*  - loop through each card and create its HTML
		 - add each card's HTML to the page */		 
function shuffleCards() {
	const shuffledArray = shuffle(allCards);
	for (let card of shuffledArray) {
		deck.appendChild(card);
	}
}

// add event listeners to each card to show + add card 
for (let i = 0; i < allCards.length; i++) {
	allCards[i].addEventListener("click", function(click) {
		const clickedCard = click.target;
		if (clickedCard.classList.contains('card') && !clickedCard.classList.contains('match') && flippedCard.length < 2 && !flippedCard.includes(clickedCard)) {
			showCard(clickedCard);
			addCard(clickedCard);
			checkStars();
			if (flippedCard.length === 2) {
				matchCards();
			}
		}
	})
};

// Function to show/flip card when clicked
function showCard(clickedCard) {	
	clickedCard.classList.toggle('open');
	clickedCard.classList.toggle('show');
	movesCount();
}

// Increment moves counter with each move + start timer on first move.
function movesCount() {
	moves++
	movesCountText.innerHTML = moves;
	if (moves === 1) {
		startTimer();
	}
}

// Remove a star after 20 or 40 moves
let starCount = 3;
function checkStars() {
	if (moves === 20) {
			star[0].style.display = "none";
			starCount = 2;
	} else if (moves === 40) {
			star[1].style.display = "none";
			starCount = 1;
	}
}


// Add opened card to an array
function addCard(clickedCard) {
	flippedCard.push(clickedCard);
} 

// See if cards match 
matchedCards = [];
flippedCard = [];
function matchCards() {
	if (flippedCard[0].innerHTML === flippedCard[1].innerHTML) {
			match();
			console.log('match');
		} else {
			noMatch();
			console.log("try again");
		}
	}				

function match() {
	flippedCard[0].classList.add('match');
	flippedCard[1].classList.add('match');
	flippedCard[0].classList.remove('open', 'show');
	flippedCard[1].classList.remove('open', 'show');
	matchedCards.push(flippedCard[0]);
	matchedCards.push(flippedCard[1]);
	flippedCard = [];
};

function noMatch() {
	setTimeout(function flipBack() {
	flippedCard[0].classList.remove('open', 'show');
	flippedCard[1].classList.remove('open', 'show');
	flippedCard = [];
		}, 700);
};	


// Add timer functionality: start, show in score panel and stop 
function startTimer() {
		timePassed = setInterval(function() {
		time++;
		showTime();
		}
	,1000)};

function showTime(){
	let minutes = Math.floor(time / 60);
	let seconds = time % 60;
	if (seconds < 10) {
		timer.innerHTML = minutes + ":0" + seconds;
	} else {
		timer.innerHTML = minutes + ":" + seconds;
	}
}

function stopTime() {
	clearInterval(timePassed);
}


// Win! All cards matched ->  Modal Box with number of moves, star rating and time. Also stop time
let modal = document.querySelector('.modal-box');
let modalClose = document.querySelector('.close');	
let timeStats = document.querySelector('.timeStats');
let movesStats = document.querySelector('.movesStats');
let starsStats = document.querySelector('.starsStats');


if (matchedCards.length === allCards.length) { 
	win();
}

function win() {
	stopTime();
	showModal();
	showStats();
}

function showStats() {
	timeStats.innerHTML = timer.innerHTML;
	starsStats.innerHTML = starCount;
	movesStats.innerHTML = moves; 
}

function showModal() {
	modal.style.display = "block";
}

function closeModal() {
		modal.style.display = "none";
}
modalClose.addEventListener('click', closeModal);

playAgain.addEventListener('click', function() {
	restartGame();
	closeModal();
});

/*
 * set up the event listener for a card. If a card is clicked:
 *  - display the card's symbol (put this functionality in another function that you call from this one)
 *  - add the card to a *list* of "open" cards (put this functionality in another function that you call from this one)
 *  - if the list already has another card, check to see if the two cards match
 *    + if the cards do match, lock the cards in the open position (put this functionality in another function that you call from this one)
 *    + if the cards do not match, remove the cards from the list and hide the card's symbol (put this functionality in another function that you call from this one)
 *    + increment the move counter and display it on the page (put this functionality in another function that you call from this one)
 *    + if all cards have matched, display a message with the final score (put this functionality in another function that you call from this one)
 */
