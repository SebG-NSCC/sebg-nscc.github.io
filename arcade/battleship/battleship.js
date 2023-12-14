//===========================================================================

                // No longer crashes on generation. In rare
                // cases will only detect/push() 16/17 ships but
                // will console.log all 17 properly...

//===========================================================================
const gameDiv = document.getElementById(`theGame`);
gameDiv.insertAdjacentHTML('beforeend', `<table id='gameTable'></table>`);
threeInARow = [[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]],[[],[],[],[],[],[],[],[],[],[]]]
;

console.log(threeInARow.length);

 //table layout section
 for (let i = 0; i < threeInARow.length; i++) {
        
    //make a new row by using <tr></tr>
    tableRow = tableInfo = document.createElement('tr');
    tableRow.setAttribute('id', `tr${i+1}`);
    document.getElementById('gameTable').appendChild(tableRow);
    for (let k = 0; k < threeInARow[i].length; k++) {
        tableInfo = document.createElement('td');
        
        //assign IDs and attributes to the TD elements
        tableInfo.setAttribute('canToggle', `${threeInARow[i][k].canToggle}`);
        tableInfo.setAttribute('currentState', `${threeInARow[i][k].currentState}`);
        tableInfo.setAttribute('correctState', `${threeInARow[i][k].correctState}`);
        tableInfo.setAttribute('id', `row_${i+1}_column_${k+1}`);
        tableInfo.setAttribute('class', 'default');
        tableInfo.innerText = '-';
        document.getElementById(`tr${i+1}`).appendChild(tableInfo);
    }
}

// const readline = require('readline-sync');
// const chalk = require('chalk');
let missileNumber;
let hitsTotal = 0; //the total number of spaces occupied by ships
let mapGrid = Array.from({length: 10}, e=> Array(10).fill(0));
let shipRow;
let shipColumn;
let possibleHits = 0;

function log(data){
    console.log(data);
}

function getPlayerTarget(){ //ask the player to choose a target & check if player input is valid
    let verifyInput;
    do {
        playerTarget = readline.question(chalk.cyanBright(`\nChoose your target using (A-J) & (1-10) (ex. A1): `));
            targetLetter = playerTarget.slice(0, 1);
            targetNumber = playerTarget.slice(1, 3);
            if ((targetLetter.charCodeAt(0) >= 65 && playerTarget.charCodeAt(0) <= 74) && (targetNumber >= 1 && targetNumber <= 10)){
                verifyInput = "true";
                missileNumber--;
            }
            else {
                log(`${chalk.blue(`\n================================================================================`)}`);
                log(chalk.redBright(`\n"${playerTarget}" isn't a valid target. Please try again using (A-J) & (1-10).`));
                verifyInput = "false";
                log(`\nYou have ${chalk.yellow(`${missileNumber}`)} missiles remaining.\n`);
                log(`Hit Total: ` + chalk.yellow(`${hitsTotal}/17\n`));
                displayMap();
            }
    } while (verifyInput != "true")
}

function checkPlayerTarget(){ //compare player's target to the shipsMap, check for hit, miss, or already hit space
    let hit = "1";
    let miss = "0";
    let alreadyHit = "X";
    let targetedSpace = mapGrid[targetNumber - 1][targetLetter.charCodeAt(0) - 65];
    
    if (targetedSpace == hit){
        log(`${chalk.blue(`\n================================================================================`)}`);    
        log(chalk.greenBright("\nHit!!!"));
        mapGrid[targetNumber - 1][targetLetter.charCodeAt(0) - 65] = "X";
        playerMap[targetNumber - 1][targetLetter.charCodeAt(0) - 65] = chalk.greenBright("X");
        hitsTotal++;
    }

    //if the space is empty
    else if (targetedSpace == miss)  {
        log(`${chalk.blue(`\n================================================================================`)}`);    
        log(chalk.redBright("\nYou missed!"));
        mapGrid[targetNumber - 1][targetLetter.charCodeAt(0) - 65] = "O";
        playerMap[targetNumber - 1][targetLetter.charCodeAt(0) - 65] = chalk.redBright("O");
    }

    //display message and refund a missile if the space has been targeted previously
    else if (targetedSpace == alreadyHit){
        log(`${chalk.blue(`\n================================================================================`)}`);
        log(chalk.yellowBright("\nYou already hit that one! Try another location."));
        missileNumber++;
    }

    else {
        log(`${chalk.blue(`\n================================================================================`)}`);
        log(chalk.yellowBright("\nYou already tried this spot, please pick another location."));
        missileNumber++;
    }
}

function displayMap(){ //show map and previously targeted positions
    let row = " ";
    log('    A B C D E F G H I J');
    for (let i = 0; i < playerMap.length; i++){        
        if (i == 9){
            row = "  ";
        } else {
            row = "   ";
        }
        for (let j = 0; j < playerMap[i].length; j++){
        //create a visual of each row and print to the screen
            row += playerMap[i][j] + " ";
    }
            log(`${i+1}${row}`);
    }
}

function countPossibleHits() { //count the number of ship spaces and store as possibleHits variable
    for (let i = 0; i < mapGrid.length; i++){
        for (let j = 0; j < mapGrid[i].length; j++){
            if (mapGrid[i][j] == 1){
                possibleHits++;
            }
            else{}
        }
    }
}

function displayDifficulty(missiles, difficulty){ //display the user-selected difficulty
    missileNumber = missiles;
    // console.clear();
        log(`${chalk.blue(`\n================================================================================`)}`);
        log(`\nYou've selected ${difficulty} difficulty. Good Luck!`);
        log(`${chalk.blue(`\n================================================================================`)}`);
}


function placeShipRandomly(lengthOfShip){
    let emptySpacesCheck = 0;
    for (let i = 0; i < 1; i++){
        direction = Math.floor(Math.random() * 2) + 1;

        if (direction == 1){ //placing ships vertically
            shipRow = Math.floor(Math.random() * (10 - (lengthOfShip - 1)));
            shipColumn = Math.floor(Math.random() * 10);

            for (let h = 0; h < lengthOfShip; h++){
                if (mapGrid[shipRow + h][shipColumn] == "0"){
                    emptySpacesCheck++;
                }
                else {
                    emptySpacesCheck = 0;
                }    
            }

            if (emptySpacesCheck == lengthOfShip){
                for (let j = 0; j < lengthOfShip; j++){
                mapGrid[shipRow + j][shipColumn] = "1";
                // log(`\n${String.fromCharCode(65 + shipColumn)}${shipRow + j + 1}`);
                }
            }

            else {
                i--
            }
        }
            
        if (direction == 2){ //placing ships horizontally 
            shipRow = Math.floor(Math.random() * 10);
            shipColumn = Math.floor(Math.random() * (10 - (lengthOfShip - 1)));

            for (let h = 0; h < lengthOfShip; h++){
                if (mapGrid[shipRow][shipColumn + h] == "0"){
                    emptySpacesCheck++;
                }
                else {
                    emptySpacesCheck = 0;
                }    
            }

            if (emptySpacesCheck == lengthOfShip){
                for (let j = 0; j < lengthOfShip; j++){
                mapGrid[shipRow][shipColumn + j + 1] = "1";
                // log(`\n${String.fromCharCode(65 + shipColumn + j + 1)}${shipRow + 1}`);
                }
            }

            else {
                i--
            }
            
        }
    }
}

//welcome message
log(`Welcome to Battleship,\n\nYour objective is to sink all of the enemy ships before you run out of missiles.`);

//difficulty selection
// do { //difficulty selection
    // gameDifficulty = readline.question(`${chalk.yellowBright(`Please enter your preferred difficulty (Example: "easy", "Expert", or "30").\n\n`)}${chalk.greenBright(`Easy:`)} 50 Missiles${chalk.blue(`\nMedium:`)} 35 Missiles${chalk.grey(`\nStandard:`)} 30 Missiles${chalk.redBright(`\nExpert:`)} 25 Missiles${chalk.yellowBright(`\n\nType your selection here: `)}`);
        // if (gameDifficulty == "Easy" || gameDifficulty == "easy" || gameDifficulty == "50"){
            // displayDifficulty(50, chalk.greenBright(`Easy`));
//         }

//         else if (gameDifficulty == "Medium" || gameDifficulty == "medium" || gameDifficulty == "35"){
//             displayDifficulty(35,chalk.blue(`Medium`));
//         }
        
//         else if (gameDifficulty == "Standard" || gameDifficulty == "standard" || gameDifficulty == "30"){
//             displayDifficulty(30, chalk.grey(`Standard`));
//         }

//         else if (gameDifficulty == "Expert" || gameDifficulty == "expert" || gameDifficulty == "25"){
//             displayDifficulty(25, chalk.redBright(`Expert`));
//         }
        
//         else {
//             log(`\n\n\n\n${chalk.bgRed(`"${gameDifficulty}" is not a valid difficulty, please try again. Remember, you can enter the name OR number of missiles.\n`)}`)
//             }      
// } while (gameDifficulty != "Easy" && gameDifficulty != "Medium" && gameDifficulty != "Expert" && gameDifficulty != "Standard" && gameDifficulty != "easy" && gameDifficulty != "medium" && gameDifficulty != "standard" && gameDifficulty != "expert" && gameDifficulty != "50" && gameDifficulty != "35" && gameDifficulty != "30" && gameDifficulty != "25");
//grid for the ship coordinates provided by the text file
let shipsMap = [];

//empty array for the player view
let playerMap = Array.from({length: 10}, e=> Array(10).fill("-"));

//read in the ship locations from the text file
// const shipsLocations = fs.readFileSync('map.txt', 'UTF-8');

//split shipsLocations into an array of rows
// let shipsRow = shipsLocations.split('\r\n');

//split shipsRow into coordinates, then push to a grid that contains all of them
// for (let k = 0; k < shipsRow.length; k++){
//     let shipsCoordinates = shipsRow[k].split(",");
//     shipsMap.push(shipsCoordinates);
// }

placeShipRandomly(2);
placeShipRandomly(3);
placeShipRandomly(3);
placeShipRandomly(4);
placeShipRandomly(5);

countPossibleHits();
// log(mapGrid);

while (missileNumber > 0 && hitsTotal < possibleHits){
    // log(`\n${chalk.cyan(`You have `)}${chalk.yellow(`${missileNumber}`)} ${chalk.cyan(`missiles remaining.`)}\n`);
    // log(`${chalk.cyan(`Hit Total: `)}` + chalk.yellow(`${hitsTotal}/${possibleHits}\n`));
    displayMap();
    getPlayerTarget();
    checkPlayerTarget();
}

//if the player runs out of missiles or sinks all of the ships display one of the following messages
if (missileNumber > 0 && hitsTotal == possibleHits) { //win message
    log(`\n`);
    displayMap();
    // log(`${chalk.blue(`\n================================================================================`)}`);
    // log(chalk.greenBright(`\nYou Win!\nYou sank the entire fleet, well done!\nYou had ${chalk.yellow(`${`${hitsTotal}/${possibleHits}`}`)} possible hits and ${chalk.yellow(`${missileNumber}`)} missiles remaining.`))
}
else { //loss message
    log(`\n`);
    displayMap();
    // log(`${chalk.blue(`\n================================================================================`)}`);
    // log(chalk.redBright(`\nGame Over.\nYou ran out of missiles, but you had ${chalk.yellow(`${`${hitsTotal}/${possibleHits}`}`)} possible hits.\nBetter luck next time.`));
}    