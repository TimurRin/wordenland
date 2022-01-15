let word = "xxxxx";

let attempt;
let attempts;
let letter;
let wordSize;

let letters = [];

let gameLetters = {};

function restartGame() {
    word = WORD_LIST[Math.floor(Math.random() * (WORD_LIST.length - 1))];

    gameLetters = {};
    for (let i = 0; i < word.length; i++){
        gameLetters[word.charAt(i)] = (gameLetters[word.charAt(i)] || 0) + 1;
    }

    attempt = 0;
    attempts = ATTEPMTS;
    letter = 0;
    wordSize = WORD_SIZE;

    document.getElementById("wordle-mode-name").innerHTML = MODE_NAME;
    document.getElementById("wordle-mode-name").title = "Guess " + wordSize + "-letter word in " + attempts + " attempt(s)";

    letters = [];

    redrawKeyboard();

    rebuildBoard();
}

function setCell(attempt, letter, type, text) {
    let cell = document.getElementById("wordle-cell-" + attempt + "-" + letter);
    if (type === "current") {
        cell.style.color = "#DDDDDD";
    } else if (type === "correct") {
        cell.style.color = "green";
    } else if (type === "wrong_position") {
        cell.style.color = "#EEEA62";
    } else {
        cell.style.color = "#808080";
    }
    if (text) {
        letters[attempt][letter] = text;
        cell.innerHTML = text;
    }
}

function setAttemptStyle(attempt, style, text) {
    for (let l = 0; l < wordSize; l++) {
        setCell(attempt, l, style, text);
    }
}

function rebuildBoard() {
    let div = "";

    for (let a = 0; a < attempts; a++) {
        letters[a] = [];
        div += "<div>";
        for (let l = 0; l < wordSize; l++) {
            letters[a][l] = "_";
            div += ("<span class='wordle-cell' id='wordle-cell-" + a + "-" + l + "' style='color=#641278'>" + letters[a][l] + "</span>");
        }
        div += "</div>";
    }

    document.getElementById("wordle-table").innerHTML = div;

    setAttemptStyle(attempt, "current");
}

function inputSubmit() {
    if (letter >= wordSize) {

        let myWord = "";
        letters[attempt].forEach(element => {
            myWord += element;
        });

        if (myWord === word) {
            alert("lol noice");
            restartGame();
        } else {
            if (wordListCheck[myWord]) {
                for (let l = 0; l < wordSize; l++) {
                    let style;
                    let char = myWord.charAt(l);
                    if (char === word.charAt(l)) {
                        style = "correct";
                    } else if (gameLetters[char] > 0) {
                        style = "wrong_position";
                    }
                    setCell(attempt, l, style);
                    setKey(keyboardCheck[char], style);
                }
                for (let l = 0; l < wordSize; l++) {
                    let char = myWord.charAt(l);
                    if (char === word.charAt(l)) {
                        gameLetters[char]--;
                    }
                }
            } else {
                alert("'" + myWord + "' is not in the dictionary");
                setAttemptStyle(attempt, "current", "_");
                letter = 0;
                return;
            }
            attempt++;
            if (attempt < attempts){
            setAttemptStyle(attempt, "current");
            }
            letter = 0;
            if (attempt >= attempts) {
                alert("what a retard, couldn't guess '" + word + "'");
                restartGame();
            }
        }
    } else {
        alert("finish the word");
    }
}

function inputErase() {
    letter--;
    if (letter < 0) {
        letter = 0;
    } else {
        setCell(attempt, letter, "current", "_");
    }
}

function inputKey(keyName) {
    let cell = document.getElementById("wordle-cell-" + attempt + "-" + letter);
    if (cell && letter < wordSize) {
        letters[attempt][letter] = keyName;
        cell.innerHTML = letters[attempt][letter];
        letter++;
    }
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyboardCheck[keyName]) {
        if (keyName === "Enter") {
            inputSubmit();
        } else if (keyName === "Backspace") {
            inputErase();
        } else {
            inputKey(keyName);
        }
    }
}, false);
