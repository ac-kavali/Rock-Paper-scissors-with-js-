
const playBtn = document.getElementById("play-btn")


const increaseRoundNumber = document.querySelector('#increase');
const roundNumTxt = document.querySelector('.round-number');
const decreaseRoundNumber = document.querySelector('#decrease');
const gameDataInput = document.querySelector('.rounds-container');
const startGame = document.getElementById('startGameBtn');
const gameArea = document.querySelector('.game-area');
const tit = document.querySelector('.title');
const gameDashboard = document.querySelector('.round-dashb');
const startHint = document.querySelector('.hint');
const userDisplay = document.getElementById("user-choice");
const botDisplay = document.getElementById("bot-choice");
const currentRoundTxt = document.getElementById("roundText");
const botScoreTxt = document.getElementById("bot-score");
const userScoreTxt = document.getElementById("user-score");

const winnerPanel = document.getElementById('winner-panel');
const winnerText = document.getElementById('winner-text');
const closeWinnerBtn = document.getElementById('close-winner');
const userBox = document.querySelector('.user-box');
const botBox = document.querySelector('.bot-box');

const clickSound = new Audio("/media/click.mp3");
const loseSound = new Audio("/media/lost.mp3");
const winSound = new Audio("/media/win.mp3")

const choices = document.querySelectorAll('.choice-btn');

gameDashboard.style.display = "none";

choices.forEach( btn => {
    btn.classList.add("disabled");   // Disable choice bottons by default.
});


function reCreateGame(){
    setTimeout(() => {
        let finalWinner = getWinner();
        winnerText.textContent = finalWinner;
        winnerPanel.style.display = "flex";
        console.log(finalWinner);
        if (finalWinner == 'You Win!'){
            winSound.play();
        }else{ 
            loseSound.play();
        }

        
        closeWinnerBtn.addEventListener("click", () => {
            clickSound.play();
            gameDashboard.style.display = "none";
            choices.forEach( btn => {
                btn.classList.add("disabled");   // Disable choices bottons again till game start
            });
            botScore = 0;
            botScoreTxt.textContent = botScore; // Initiate Bot Score

            userScore = 0;
            userScoreTxt.textContent = userScore; // Initiate User Score

            winnerPanel.style.display = "none"; // Hide Winner Pannel
            gameDataInput.style.display = "flex"; // Show Game Input Again.
            
            totalRounds = 3;
            roundNumTxt.textContent = totalRounds; // Initiate Total Round Number
            currentRound  = 1;
            currentRoundTxt.textContent = `Round ${currentRound}/${totalRounds}` //Initiat Rounds Info Display
        })
    }, 400);
}

let userChoice ;
var userScore = 0;
var botScore = 0;
let currentRound = 1;
var totalRounds = 3;
let userMove ;
let botMove;
var winner;

// Increase Round Number 
increaseRoundNumber.addEventListener("click", ()=>{
    clickSound.play();
    if (totalRounds < 19){
        totalRounds += 2;
    }
    roundNumTxt.textContent = totalRounds;
    
});

// Decrease Round Number
decreaseRoundNumber.addEventListener("click", ()=>{
    clickSound.play();
    if (totalRounds > 3){
        totalRounds -= 2;
    }
    roundNumTxt.textContent = totalRounds;
    
});





function randNum(userMove){
    let randNumber = Math.floor(Math.random() * 3);

    while (randNumber === userMove){
        randNumber = Math.floor(Math.random() * 3);
    }
    return randNumber;
}

function getWinner(){
    let finalWinner = null;
    if (userScore > botScore){
        finalWinner = "You Win!";
    }else if (userScore < botScore){
        finalWinner = "Andrew Win!";
    }else{
        finalWinner = "It's a draw!"
    }
    return finalWinner;
}


// Spin Function 
function spin(userMove, botMove){
    const imgs = ["/media/paper.png", "/media/rock.png", "/media/scissors.png"];
    let currentIndex = 0;

    userDisplay.src = imgs[userMove]; // Display user choice

    const intervalID = setInterval(() => {
        currentIndex = (currentIndex + 1) % imgs.length;
        botDisplay.src = imgs[currentIndex];
    }, 100);   // 2 seconds spining 

    setTimeout(() => {   // All what will happens after the spin finish and someone beat in the round
        clearInterval(intervalID);  // Then stop the spin
        botDisplay.src = imgs[botMove];   // Display bot choice

        if (winner == 'user'){  // Highlight The Winner
            userBox.classList.add("win");
        }else if(winner == 'bot'){
            botBox.classList.add("win");
        }else{ 
            userBox.classList.add("win");
            botBox.classList.add("win");
        }
        setTimeout(() => {
            userBox.classList.remove("win");
            botBox.classList.remove("win");
        }, 600);
        userScoreTxt.textContent = userScore;
        botScoreTxt.textContent = botScore; 
        
    }, 2000);
    setTimeout(() =>{// 1 seconde then update current round
        currentRound++;
        if (currentRound <= totalRounds){
            currentRoundTxt.textContent = `Round ${currentRound}/${totalRounds}`;
            choices.forEach(btn => { 
                btn.classList.remove("disabled"); // Enable choice bottons again
            });
            startHint.style.display = "block";
        }else {
            reCreateGame();
        }
    }, 3000) 
}

// Get Result Of A Single Battle
function getResult(userMove, botMove){
    if (userMove === 0 && botMove === 2){
        winner = "bot";
    }else if (userMove === 2 && botMove === 0){
        winner = "user";
    }else if (userMove < botMove){
        winner = "user";
    }else if (userMove === botMove){
        winner = "both";
    }else {
        winner = "bot";
    }
    return winner;
}


function updateScore(){
        winner = getResult(userMove, botMove);
        if (winner == 'user'){
            userScore++;
        }else if (winner == 'bot'){
            botScore++;
        }
}

let isRuning = false;

function gameEngine(){
    const pointes = ["paper", "rock", "scissors"];
        startHint.style.display = "block";

    choices.forEach(choice => {
        choice.addEventListener("click", ()=>{
            clickSound.play();
            if(!isRuning){
                isRuning = true;
                startHint.style.display = "none";
                userChoice = choice.dataset.choice;
                choices.forEach( btn => {
                    btn.classList.add("disabled");   // Disable 
                })
                userMove = pointes.indexOf(userChoice); // Get User Data-Choice As Number 
                console.log(`usr move :${userMove}`);
                botMove = pointes.indexOf(pointes[randNum(userMove)]); // Get Bot Data-Choice as Number
                console.log(`bot move :${botMove}`);
                updateScore(pointes,userChoice);
                spin(userMove, botMove);
            }
            setTimeout(() => {
                isRuning = false;
            }, 2000);
        });
    });
}

// Start Game
startGame.addEventListener("click", () => {
    gameDashboard.style.display = "block";
    currentRoundTxt.textContent = `Round ${currentRound}/${totalRounds}`; //upload round data 
    clickSound.play();
    gameDataInput.style.display = "none";
    tit.style.marginButtom = "200px";
    gameDashboard.classList.remove('hidden');
    choices.forEach( btn => {
        btn.classList.remove("disabled");   // Enable choice buttons when start the game
    });
    gameEngine();

});



