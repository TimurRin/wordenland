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

restartGame();
