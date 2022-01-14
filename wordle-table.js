let word = "xxxxx";

let attempt;
let attempts;
let letter;
let wordSize;

let letters = [];

function restartGame() {
    word = WORD_LIST[Math.floor(Math.random() * (WORD_LIST.length - 1))];

    attempt = 0;
    attempts = ATTEPMTS;
    letter = 0;
    wordSize = WORD_SIZE;

    document.getElementById("wordle-mode-name").innerHTML = MODE_NAME;
    document.getElementById("wordle-mode-name").title = "Guess " + wordSize + "-letter word in " + attempts + " attempt(s)";

    letters = [];

    redrawBoard();
}

function redrawBoard() {
    let div = "";

    for (let a = 0; a < attempts; a++) {
        letters[a] = [];
        div += "<div>";
        for (let l = 0; l < wordSize; l++) {
            div += ("<span class='wordle-cell' id='wordle-cell-" + a + "-" + l + "'>" + (letters[a][l] || "_") + "</span>");
        }
        div += "</div>";
    }

    document.getElementById("wordle-table").innerHTML = div;
}

document.addEventListener('keydown', (event) => {
    const keyName = event.key;
    if (keyboardCheck[keyName]) {
        if (keyName === "Enter") {
            if (letter >= wordSize) {
                
                let myWord = "";
                for (let i = 0; i < letters[attempt]; i++) {
                    myWord += letters[attempt][i];
                }

                if (myWord === word) {
                    alert("lol noice");
                    restartGame();
                } else {
                    if (wordListCheck[myWord]) {
                        for (let l = 0; l < letters[attempt]; l++) {
                            let cell = document.getElementById("wordle-cell-" + attempt + "-" + l);
                            cell.style.color = "#808080";
                        }
                    } else {

                    }
                    attempt++;
                    for (let l = 0; l < letters[attempt]; l++) {
                        let cell = document.getElementById("wordle-cell-" + attempt + "-" + l);
                        cell.style.color = "#AAAAAA";
                    }
                    letter = 0;
                    if (attempt >= attempts) {
                        alert("what a retard");
                        restartGame();
                    }
                }
            } else {
                alert("finish the word");
            }
        } else if (keyName === "Backspace") {
            letter--;
            if (letter < 0) {
                letter = 0;
            }
            let cell = document.getElementById("wordle-cell-" + attempt + "-" + letter);
            if (cell) {
                letters[attempt][letter] = null;
                cell.innerHTML = (letters[attempt][letter] || "_");
            }
        } else {
            let cell = document.getElementById("wordle-cell-" + attempt + "-" + letter);
            if (cell && letter < wordSize) {
                letters[attempt][letter] = keyName;
                cell.innerHTML = (letters[attempt][letter] || "_");
                letter++;
            }
        }
    }
}, false);