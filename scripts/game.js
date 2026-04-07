
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

const choices = document.querySelectorAll('.choice-btn');

// Increase Round Number 
increaseRoundNumber.addEventListener("click", ()=>{
    if (totalRounds < 19){
        totalRounds += 2;
    }
    roundNumTxt.textContent = totalRounds;
    
});

// Decrease Round Number
decreaseRoundNumber.addEventListener("click", ()=>{
    if (totalRounds > 3){
        totalRounds -= 2;
    }
    roundNumTxt.textContent = totalRounds;
    
});



// Restart the game and init all the variables : 
/*function restartGame(){
    rou
}*/

let userChoice ;
var userScore = 0;
var botScore = 0;
let currentRound = 1;
let totalRounds = 3;
var gameEnded = false;
let userMove ;
let botMove;
var winner;

function randNum(userMove){
    let randNumber = (Math.random() * (2 - 0) + 0).toFixed(0)
    while (randNumber === userMove){
        randNumber = (Math.random() * (2 - 0) + 0).toFixed(0);
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

        botDisplay.src = imgs[botMove];   // Display bot choice
        choices.forEach(btn => { 
            btn.classList.remove("disabled"); // Enable choice bottons again
        });

        if (currentRound <= totalRounds){
            currentRoundTxt.textContent = `Round ${currentRound}/${totalRounds}`;
        }
        userScoreTxt.textContent = userScore;
        botScoreTxt.textContent = botScore; 
        startHint.style.display = "block";  
    
        

        // Show Winner and Restart the game; 
        if (gameEnded){
            setTimeout(() => {
                winnerText.textContent = getWinner();
                winnerPanel.style.display = "flex";

                
                closeWinnerBtn.addEventListener("click", () => {
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
            }, 1000);
        }
        // if the last round show the game winner with removing the full element in the page and show the option of restart game
    }, 2000);

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

function gameEngine(totalRounds){
    const pointes = ["paper", "rock", "scissors"];
        startHint.style.display = "block";

    choices.forEach(choice => {
        choice.addEventListener("click", ()=>{
            if(!isRuning){
                isRuning = true;
                startHint.style.display = "none";
                userChoice = choice.dataset.choice;
                currentRound++;                         //increment current round number
                gameEnded = currentRound > totalRounds;
                choices.forEach( btn => {
                    btn.classList.add("disabled");
                })
                userMove = pointes.indexOf(userChoice); // Get User Data-Choice As Number 
                botMove = pointes.indexOf(pointes[randNum(userMove)]); // Get Bot Data-Choice as Number
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
    gameDataInput.style.display = "none";
    tit.style.marginButtom = "200px";
    gameDashboard.classList.remove('hidden');
    gameEngine(totalRounds);

});



