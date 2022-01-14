const keyboardLayout = [
    ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
    ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
    ["z", "x", "c", "v", "b", "n", "m"],
    ["Backspace", "Enter"]
];

let keyboardCheck = {};

function redrawKeyboard() {
    keyboardCheck = {};
    let div = "";
    keyboardLayout.forEach(row => {
        row.forEach(key => {
            // div += "<button>" + key.toLowerCase() + "</button>"
            keyboardCheck[key] = true
        });
        // div += "<br>"
    });
    document.getElementById("wordle-keyboard").innerHTML = div
}
