const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    ["Enter", "Backspace"]
];

let keyboardCheck = {};
let keyboardStatus = {};

function redrawKeyboard() {
    keyboardCheck = {};
    let div = "</br></br>";
    let keys = 0;
    keyboardLayout.forEach(row => {
        row.forEach(key => {
            keys++;
            div += "<button class='wordle-keyboard-key' id='wordle-keyboard-key-" + keys + "' onclick='keyPressed(\"" + key + "\")'>" + key.toLowerCase() + "</button>"
            keyboardCheck[key] = keys;
        });
        div += "</br>"
    });
    document.getElementById("wordle-keyboard").innerHTML = div
}

function setKey(keyId, type) {
    let key = document.getElementById("wordle-keyboard-key-" + keyId);

    if (type === "correct") {
        key.style.color = "green";
        key.style.backgroundColor = "#161616";
    } else if (!keyboardStatus[keyId]) {
        if (type === "current") {
            key.style.color = "#161616";
            key.style.backgroundColor = "#AFAFAF";
        } else if (type === "wrong_position") {
            key.style.color = "#EEEA62";
            key.style.backgroundColor = "#161616";
        } else {
            key.style.color = "#808080";
            key.style.backgroundColor = "#161616";
            key.style.textDecoration = "line-through";
        }
    }

    keyboardStatus[keyId] = type;
}

function keyPressed(keyName) {
    if (keyName === "Enter") {
        inputSubmit();
    } else if (keyName === "Backspace") {
        inputErase();
    } else {
        inputKey(keyName);
    }
}
