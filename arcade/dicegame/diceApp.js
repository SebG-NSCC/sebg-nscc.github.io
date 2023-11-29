let roll;
let turn_score = 0;
let active_player = 0;
let rollHistory = [0];
let winningScore = 100;
let numberOfPlayers;
let playerArray;

function selectNumberOfPlayers() {    
    do {
        numberOfPlayers = prompt(`Select the number of players (1-10): `);

        if (numberOfPlayers >= 1 && numberOfPlayers <= 10) {
            playerScoreArray = Array.from({length: numberOfPlayers}, () => 0);
            playerArray = Array.from({length: numberOfPlayers}, () => 0);
        }
        else {
            alert("Please enter a number between 1 and 10.");
        }

    } while (numberOfPlayers < 1 || numberOfPlayers > 10);
}

function selectWinningScore (){
    do {
        winningScore = prompt(`Select the winning score(1-100): `);

        if (winningScore >= 1 && winningScore <= 100) {
        }
        else {
            alert("Please enter a number between 1 and 100.");
        }

    } while (winningScore < 1 || winningScore > 100);
}

function choosePlayerName() {
    for (let i=0; i < numberOfPlayers; i++) {
        playerArray[i] = prompt(`Player ${i+1}, enter your name:`);
    }

    for (let i = 0; i < playerArray.length; i++){
        document.getElementById(`player_score`).innerText += playerArray[i] + ': ' + playerScoreArray[i] + `\n`;
    }

    document.getElementById("holdButton").setAttribute("class", "enabled");
    document.getElementById("rollButton").setAttribute("class", "enabled");
}

function showMessage(msg, rollNum) { //show roll message in the middle of the screen
    document.getElementById(`rollMessage`).textContent = `${msg}! You rolled a ${rollNum}.`;
    document.getElementById(`rollMessage`).setAttribute("class", "imgDisplay");
    setTimeout(() => {
        document.getElementById(`rollMessage`).setAttribute("class", "disabled");
    }, "800")
}

function switchPlayer() {
    if (active_player === playerArray.length - 1) {
        active_player = 0;
    }
    else {
        active_player++;
    }
    
    setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);
    setInnerContent('player_score', '');
    
    for (let i = 0; i < playerArray.length; i++){
        document.getElementById(`player_score`).innerText += playerArray[i] + ': ' + playerScoreArray[i] + `\n`;
    }

    document.getElementById('currentPlayer').setAttribute('class', 'flashOn');
    setTimeout(() => {
        document.getElementById('currentPlayer').setAttribute('class', 'flashOff');
    }, 800)
    turn_score = 0;
}

function setInnerContent (htmlElement, data){ //modify html content using element id as target
    document.getElementById(htmlElement).textContent = data;
}

function setClass(element, data){ //modify class attribute on target element id
    document.getElementById(`${element}`).setAttribute("class", `${data}`);
    
}

function showGameLengthOptions(){
    //Hide number of players options
    setClass("soloGame", "disabled");
    setClass('twoGame', 'disabled');
    setClass("fourGame", "disabled");
    setClass('customPlayers', 'disabled');
    
    //Display game length options
    setClass("shortGame", "enabled");
    setClass('mediumGame', 'enabled');
    setClass("longGame", "enabled");
    setClass('customGame', 'enabled');
    setInnerContent('gameButtonsInfo', 'Select the winning score (1-100)');
}

function hideGameLengthOptions(){
    setClass("shortGame", "disabled");
    setClass('mediumGame', 'disabled');
    setClass("longGame", "disabled");
    setClass('customGame', 'disabled');
    setClass(`gameButtonsInfo`, 'disabled');
}

document.getElementById("newGameButton").addEventListener("click", function() {
    setClass("newGameButton", "disabled");
    setClass("soloGame", "enabled");
    setClass('twoGame', 'enabled');
    setClass("fourGame", "enabled");
    setClass('customPlayers', 'enabled');
    setInnerContent('gameButtonsInfo', 'Select the number of Players (1-10)');
});

//Number of Players Selection
    document.getElementById("soloGame").addEventListener("click", function() {
        numberOfPlayers = 1;
        playerScoreArray = Array.from({length: numberOfPlayers}, () => 0);
        playerArray = Array.from({length: numberOfPlayers}, () => 0);
        showGameLengthOptions();
    });
    document.getElementById("twoGame").addEventListener("click", function() {
        numberOfPlayers = 2;
        playerScoreArray = Array.from({length: numberOfPlayers}, () => 0);
        playerArray = Array.from({length: numberOfPlayers}, () => 0);
        showGameLengthOptions();
    });
    document.getElementById("fourGame").addEventListener("click", function() {
        numberOfPlayers = 4;
        playerScoreArray = Array.from({length: numberOfPlayers}, () => 0);
        playerArray = Array.from({length: numberOfPlayers}, () => 0);
        showGameLengthOptions();
    });
    document.getElementById("customPlayers").addEventListener("click", function() {
        selectNumberOfPlayers();
        showGameLengthOptions();
    });

//Winning Score Selection
    document.getElementById("shortGame").addEventListener("click", function() {
        let shortGameScore = 10;
        winningScore = shortGameScore;
        hideGameLengthOptions()
        choosePlayerName();
        setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);
    });
    document.getElementById("mediumGame").addEventListener("click", function() {
        let mediumGameScore = 50;
        winningScore = mediumGameScore;
        hideGameLengthOptions()
        choosePlayerName();
        setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);
    });
    document.getElementById("longGame").addEventListener("click", function() {
        let longGameScore = 100;
        winningScore = longGameScore;
        hideGameLengthOptions()
        choosePlayerName();
        setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);
    });
    document.getElementById("customGame").addEventListener("click", function() {
        hideGameLengthOptions()
        selectWinningScore();
        choosePlayerName();
        setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);
    });

// choosePlayerName();
// setInnerContent('currentPlayer', `${playerArray[active_player]}'s Turn`);

document.getElementById("holdButton").addEventListener("click", function() {
    //add turn score to the active player's total score in playerScoreArray.
    playerScoreArray[active_player] = playerScoreArray[active_player] += turn_score;
    switchPlayer();   
    setInnerContent('turnScore', parseInt(turn_score));

});

document.getElementById("rollButton").addEventListener("click", function() {           
    
    //generate a random number between 1 and 6
    roll = parseInt(roll = Math.floor(Math.random() * 6) + 1);
    
    //hide image from previous dice roll, display image for current roll
    let lastRoll = rollHistory[rollHistory.length - 1];  
    setClass(`dice${lastRoll}`, "disabled");
    setClass(`dice${roll}`, "imgDisplay");
    
    //store current roll in the rollHistory array
    rollHistory.push(roll);
    
      
    
    if (roll === 1) {
        showMessage("Shoot", 1);
        switchPlayer();
        setInnerContent('turnScore', turn_score);

    } else {
        turn_score = turn_score + roll;
            if (playerScoreArray[active_player] + turn_score >= winningScore) {
                setInnerContent('turnScore', turn_score); 
                setClass(`holdButton`, "disabled");
                setClass(`rollButton`, "disabled");   
                setClass(`winningArticle`, "winningArticle");
                setClass(`winningMessage`, "enabled");

                setInnerContent('winningMessage', `${playerArray[active_player]} won the game! Final Score: ${playerScoreArray[active_player] + turn_score}`);
                
                setClass(`restartButton`, "enabled");
                
            } 
            else{
            showMessage("Nice", roll);
            setInnerContent('turnScore', turn_score); 
            }
    }

});

document.getElementById("restartButton").addEventListener("click", function() {
    document.getElementById(`winningArticle`).setAttribute("class", "disabled");
    document.getElementById('winningMessage').setAttribute("class", "disabled");
    location.reload();
});
