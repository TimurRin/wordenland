const MODE_NAME = "powerlanguage's classic"
const WORD_SIZE = 5;
const ATTEPMTS = 6;

const WORD_LIST = [
    "slave",
    "color",
    "burst",
    "worry",
    "queer",
    "dumbo",
    "vigro"
];

let wordListCheck = [];
WORD_LIST.forEach(element => {
    wordListCheck[element] = true;
});

const COLOR_BACKGROUND = "#161616";
const COLOR_CURRENT = "#DDDDDD";
const COLOR_CORRECT = "green";
const COLOR_MISPLACED = "#FFC90E";
const COLOR_MISSED = "#808080";

restartGame();
