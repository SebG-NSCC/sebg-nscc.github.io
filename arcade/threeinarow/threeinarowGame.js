async function getData (){

    const response = await fetch('https://prog2700.onrender.com/threeinarow/random');
    let threeInARow = await response.json();

    //identify the location that game content should be added to
    const gameDiv = document.getElementById(`theGame`);
    
    //insert necessary game elements and text placeholders into the gameDiv
    gameDiv.insertAdjacentHTML('afterbegin', '<h2>Welcome to 3-in-a-row</h2>');
    gameDiv.insertAdjacentHTML('beforeend', '<p id="themesTitle"><strong>Themes</strong></p><input type="checkbox" id="theme1" class="themes"></input><label for="theme1">Pink</label><input type="checkbox" id="theme2" class="themes"></input><label for="theme2">Blue</label><input type="checkbox" id="theme3" class="themes"></input><label for="theme3">Grey</label><input type="checkbox" id="theme4" class="themes"></input><label for="theme4">Green</label>');
    gameDiv.insertAdjacentHTML('beforeend', '<p id=checkPuzzleMsg class="visibilityOff">Placeholder</p>');
    gameDiv.insertAdjacentHTML('beforeend', `<table id='gameTable'></table>`);
    gameDiv.insertAdjacentHTML('beforeend', `<input type="checkbox" id="showIncorrect">`);
    gameDiv.insertAdjacentHTML('beforeend', `<label for="showIncorrect">Show Errors</label>`);
    gameDiv.insertAdjacentHTML('beforeend', `<button id="checkPuzzleBtn">Check</button>`);
    gameDiv.insertAdjacentHTML('beforeend', `<button id="restartBtn">Restart</button>`);
    gameDiv.insertAdjacentHTML('beforeend', `<button id="newPuzzleBtn">New</button>`);
    

    //table layout section
    for (let i = 0; i < threeInARow.rows.length; i++) {
        
        //make a new row by using <tr></tr>
        tableRow = tableInfo = document.createElement('tr');
        tableRow.setAttribute('id', `tr${i+1}`);
        document.getElementById('gameTable').appendChild(tableRow);
        for (let k = 0; k < threeInARow.rows[i].length; k++) {
            tableInfo = document.createElement('td');
            
            //assign IDs and attributes to the TD elements
            tableInfo.setAttribute('canToggle', `${threeInARow.rows[i][k].canToggle}`);
            tableInfo.setAttribute('currentState', `${threeInARow.rows[i][k].currentState}`);
            tableInfo.setAttribute('correctState', `${threeInARow.rows[i][k].correctState}`);
            tableInfo.setAttribute('id', `row_${i+1}_column_${k+1}`);
            tableInfo.setAttribute('class', 'default');
            document.getElementById(`tr${i+1}`).appendChild(tableInfo);
        }
    }
    
    //function to check the "canToggle" attribute, and change the currentState value to alter box color 
    let tdElements = document.querySelectorAll("td");
    const changeBoxColor = (event) => {
        let targetBox = document.getElementById(`${event.target.id}`);
        let toggleCheck = targetBox.getAttribute('canToggle');
        if (toggleCheck != "false"){
            if (targetBox.getAttribute('currentState') != 2){
                currentStateValue = targetBox.getAttribute('currentState');
                targetBox.setAttribute('currentState', parseInt(currentStateValue) + 1);
            }
            else {
                currentStateValue = targetBox.setAttribute('currentState', 0);
            }
        }
        
    };

    //function to add event listeners to each td element
    tdElements.forEach( (element) => {
        element.addEventListener("click", changeBoxColor);
    });

    //function to check the puzzle for errors
    const checkPuzzle = () => {      
        let errorTally = 0;
        let correctBoxes = 0;
        let totalBoxes = tdElements.length;
    
        tdElements.forEach(element => {
            let targetState = element.getAttribute('correctState');
            let actualState = element.getAttribute('currentState');
            let toggleCheck = element.getAttribute('canToggle');
            let checkMessage = document.getElementById('checkPuzzleMsg');

            //if the box is provided by the api and can't be modified, add 1 to the correct box count
            if (toggleCheck === 'false'){
                correctBoxes++;    
            }

            else if (toggleCheck === 'true' && actualState != 0){
                if (actualState != targetState) {
                    errorTally += 1;
                } 
                else if (actualState === targetState) {
                    correctBoxes++;
                }
            
            if (correctBoxes === totalBoxes) { //if the grid is complete
                checkMessage.innerText="You win! Well done!"; 
            }
                    
            else if (errorTally > 0){ //if there is an error
                checkMessage.innerText="Something is wrong.";
            }
            else if (errorTally === 0){ //if boxes are correct so far
                checkMessage.innerText="So far, so good!";
            }

            //make modified message text visible for a short duration (2s)
            checkMessage.setAttribute('class', 'visibilityOn');
                setTimeout(() => {
                    checkMessage.setAttribute('class', 'visibilityOff');
                }, 2000);
            }
        });
    }      
    document.getElementById('checkPuzzleBtn').addEventListener('click', checkPuzzle);

    //Event listener and function for the show errors checkbox
    document.getElementById('showIncorrect').addEventListener('change', (event => {
        if (event.currentTarget.checked){ //run this if the checkbox is checked
            tdElements.forEach(element => {
                let targetState = element.getAttribute('correctState');
                let actualState = element.getAttribute('currentState');
                let toggleCheck = element.getAttribute('canToggle');

                if (toggleCheck === 'true' && actualState != 0){ //add error indicators to boxes that can be toggled only
                    if (actualState != targetState) {
                            element.innerText="!!"
                    }
                }
            });
        }
        
        else { //remove the error indicators
            tdElements.forEach(element => {
                element.innerText="";                    
            });

        }
    
    }));

    document.getElementById('theme1').addEventListener('change', (event => {
        if (event.currentTarget.checked){
            tdElements.forEach(element => {
            element.setAttribute('class', `${event.currentTarget.id}`);
            })  
        }
        else {
            tdElements.forEach(element => {
            element.setAttribute('class', `default`);
            })
        }
    }))

    document.getElementById('theme2').addEventListener('change', (event => {
        if (event.currentTarget.checked){
            tdElements.forEach(element => {
            element.setAttribute('class', `${event.currentTarget.id}`);
            })  
        }
        else {
            tdElements.forEach(element => {
            element.setAttribute('class', `default`);
            })
        }
    }))

    document.getElementById('theme3').addEventListener('change', (event => {
        if (event.currentTarget.checked){
            tdElements.forEach(element => {
            element.setAttribute('class', `${event.currentTarget.id}`);
            })  
        }
        else {
            tdElements.forEach(element => {
            element.setAttribute('class', `default`);
            })
        }
    }))

    document.getElementById('theme4').addEventListener('change', (event => {
        if (event.currentTarget.checked){
            tdElements.forEach(element => {
            element.setAttribute('class', `${event.currentTarget.id}`);
            })  
        }
        else {
            tdElements.forEach(element => {
            element.setAttribute('class', `default`);
            })
        }
    }))
    
    document.getElementById('restartBtn').addEventListener('click', (event => {
        tdElements.forEach(element => {
                let actualState = element.getAttribute('currentState');
                let toggleCheck = element.getAttribute('canToggle');

                if ((toggleCheck === 'true') && actualState != 0){
                    element.setAttribute('currentState', '0')
                }
        });
    }));

    document.getElementById('newPuzzleBtn').addEventListener('click', (event => {
        location.reload();
    }));
    }

getData();