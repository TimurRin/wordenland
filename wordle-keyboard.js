const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"]
];

let keyboardCheck = {};
let keyboardStatus = {};


function resetKeyboard() {
    if (keyboardCheck) {
        keyboardCheck.forEach(keyId => {
            setKey(keyId, "current");
        });
    }
}

function redrawKeyboard() {
    keyboardCheck = {};
    let div = "</br></br>";
    let keys = 0;
    keyboardLayout.forEach(row => {
        row.forEach(key => {
            keys++;
            div += "<button class='wordle-keyboard-key' id='wordle-keyboard-key-" + keys + "' onclick='keyPressed(\"" + key + "\")'>" +
                (key === "enter" ? "enter" : (key === "backspace" ? "<" : key)) +
                "</button>";
            keyboardCheck[key] = keys;
        });
        div += "</br>"
    });
    document.getElementById("wordle-keyboard").innerHTML = div;
}

function setKey(keyId, type) {
    let key = document.getElementById("wordle-keyboard-key-" + keyId);

    if (type === "correct") {
        key.style.color = COLOR_CURRENT;
        key.style.backgroundColor = COLOR_CORRECT;
    } else if (!keyboardStatus[keyId]) {
        if (type === "current") {
            key.style.color = COLOR_BACKGROUND;
            key.style.backgroundColor = COLOR_CURRENT;
        } else if (type === "misplaced") {
            key.style.color = COLOR_BACKGROUND;
            key.style.backgroundColor = COLOR_MISPLACED;
        } else {
            key.style.color = COLOR_MISSED;
            key.style.backgroundColor = COLOR_BACKGROUND;
            key.style.textDecoration = "line-through";
        }
    }

    keyboardStatus[keyId] = type;
}

function keyPressed(keyName) {
    if (keyName === "enter") {
        inputSubmit();
    } else if (keyName === "backspace") {
        inputErase();
    } else {
        inputKey(keyName);
    }
}
