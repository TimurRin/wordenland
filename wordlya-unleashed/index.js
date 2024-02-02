/**
 * @typedef {object} GameState
 * @property {array} dictionary checklist
 * @property {string} word current word
 * @property {object} attempts list of attempts
 * @property {number} maxAttempts attempts number
 */

/**
 * @typedef {object} KeyboardState
 * @property {object} keys
 */

const LABELS = {
  default: "Guess the word",
  finishTheWord: "Finish the word",
  notInDict: "This word is not in the dictionary",
  won: "You've got the word right",
  lost: "What a retard, couldn't guess",
};

const INFO_LABEL_RESET = 3000;

const KEYBOARD_LAYOUT = [
  ["q", "w", "e", "r", "t", "y", "u", "i", "o", "p"],
  ["a", "s", "d", "f", "g", "h", "j", "k", "l"],
  ["enter", "z", "x", "c", "v", "b", "n", "m", "backspace"],
];

const COLORS = {
  background: "#161616",
  correct: "green",
  current: "#DDDDDD",
  misplaced: "#FFC90E",
  missed: "#808080",
};

/** @type {GameState} */
let gameState;

/** @type {KeyboardState} */
let keyboardState;

let infoLabelInterval;

function setInfoLabel(text, reset) {
  if (infoLabelInterval != null) {
    clearInterval(infoLabelInterval);
  }
  const infoElement = document.getElementById("info");
  infoElement.innerHTML = text;
  if (reset != null) {
    infoLabelInterval = setInterval(() => {
      infoElement.innerHTML = LABELS.default;
    }, reset);
  }
}

/**
 *
 */
function buildKeyboard() {
  let div = "</br></br>";
  let keys = 0;

  keyboardState = {
    keys: {},
  };

  KEYBOARD_LAYOUT.forEach((row) => {
    row.forEach((key) => {
      keyboardState.keys[key] = true;
      keys++;
      div +=
        "<button class='keyboard-key' data-key='" +
        key +
        "' id='keyboard-key-" +
        keys +
        "'>" +
        (key === "backspace" ? "<" : key) +
        "</button>";
    });

    div += "</br>";
  });

  const keyboardElement = document.getElementById("keyboard");
  keyboardElement.innerHTML = div;
  keyboardElement.addEventListener("click", (element) => {
    if (element.target.dataset.key != null) {
      keyPressed(element.target.dataset.key);
    }
  });
}

/**
 *
 */
function restartGame() {
  setInfoLabel(LABELS.default);
  const word = "marry";

  const gameLetters = {};
  for (let i = 0; i < word.length; i++) {
    gameLetters[word.charAt(i)] = (gameLetters[word.charAt(i)] || 0) + 1;
  }

  gameState = {
    attempts: [[]],
    maxAttempts: 6,
    word,
  };

  buildKeyboard();
  buildBoard();
}

/**
 *
 * @param keyId
 * @param type
 */
function setKey(keyId, type) {
  const key = document.getElementById("keyboard-key-" + keyId);

  if (type === "correct") {
    key.style.color = COLORS.current;
    key.style.backgroundColor = COLORS.correct;
  } else {
    if (type === "current") {
      key.style.color = COLORS.background;
      key.style.backgroundColor = COLORS.current;
    } else if (type === "misplaced") {
      key.style.color = COLORS.background;
      key.style.backgroundColor = COLORS.misplaced;
    } else {
      key.style.color = COLORS.missed;
      key.style.backgroundColor = COLORS.background;
      key.style.textDecoration = "line-through";
    }
  }
}

/**
 *
 * @param keyName
 */
function keyPressed(keyName) {
  if (keyName === "enter") {
    inputSubmit();
  } else if (keyName === "backspace") {
    inputErase();
  } else if (keyboardState.keys[keyName] != null) {
    inputKey(keyName);
  }
}

/**
 *
 * @param attempt
 * @param letter
 * @param type
 * @param text
 */
function setCell(attempt, letter, type, text) {
  if (gameState.attempts[attempt] == null) {
    gameState.attempts[attempt] = [];
  }
  const cell = document.getElementById(
    "wordlya-cell-" + attempt + "-" + letter
  );
  if (type === "current") {
    cell.style.color = COLORS.current;
  } else if (type === "correct") {
    cell.style.color = COLORS.correct;
  } else if (type === "misplaced") {
    cell.style.color = COLORS.misplaced;
  } else {
    cell.style.color = COLORS.missed;
  }
  if (text) {
    gameState.attempts[attempt][letter] = text;
    cell.innerHTML = text;
  }
}

/**
 *
 * @param attempt
 * @param style
 * @param text
 */
function setAttemptStyle(attempt, style, text) {
  for (let l = 0; l < gameState.word.length; l++) {
    setCell(attempt, l, style, text);
  }
}

/**
 *
 */
function buildBoard() {
  let div = "";

  for (let a = 0; a < gameState.maxAttempts; a++) {
    div += "<div>";
    for (let l = 0; l < gameState.word.length; l++) {
      div +=
        "<span class='wordlya-cell' id='wordlya-cell-" +
        a +
        "-" +
        l +
        "' style='color=#641278'>" +
        "_" +
        "</span>";
    }
    div += "</div>";
  }

  document.getElementById("letters").innerHTML = div;
}

/**
 *
 */
function inputSubmit() {
  const attempt = gameState.attempts.length - 1;
  const attemptedWord = gameState.attempts[attempt].join("");

  if (attemptedWord.length === gameState.word.length) {
    if (attemptedWord === gameState.word) {
      setInfoLabel(LABELS.won);
      setAttemptStyle(attempt, "correct");
      // restartGame();
    } else {
      if (WORD_LIST.includes(attemptedWord)) {
        for (let l = 0; l < gameState.word.length; l++) {
          let style;
          let char = attemptedWord.charAt(l);
          if (char === gameState.word.charAt(l)) {
            style = "correct";
          } else if (gameLetters[char] > 0) {
            style = "misplaced";
          }
          setCell(attempt, l, style);
          setKey(keyboardCheck[char], style);
        }
        for (let l = 0; l < gameState.word.length; l++) {
          let char = attemptedWord.charAt(l);
          if (char === word.charAt(l)) {
            gameLetters[char]--;
          }
        }
      } else {
        setInfoLabel(`${LABELS.notInDict}: ${attemptedWord}`);
        setAttemptStyle(attempt, "current", "_");
        letter = 0;
        return;
      }
      attempt++;
      if (attempt < attempts) {
        setAttemptStyle(attempt, "current");
      }
      letter = 0;
      if (attempt >= attempts) {
        setInfoLabel(`${LABELS.lost} '${gameState.word}'`);
        // restartGame();
      }
    }
  } else {
    setInfoLabel(LABELS.finishTheWord, INFO_LABEL_RESET);
  }
}

/**
 *
 */
function inputErase() {
  const attempt = gameState.attempts.length - 1;
  const letter = gameState.attempts[attempt].length - 1;
  if (gameState.attempts[attempt] == null || letter < 0) {
    return;
  }
  setCell(attempt, letter, "missed", "_");
  gameState.attempts[attempt].pop();
}

/**
 *
 * @param keyName
 */
function inputKey(keyName) {
  const attempt = gameState.attempts.length - 1;
  const letter =
    gameState.attempts[attempt] != null
      ? gameState.attempts[attempt].length
      : 0;
  if (letter >= gameState.word.length) {
    return;
  }
  setCell(attempt, letter, "current", keyName);
}

document.addEventListener(
  "keydown",
  (event) => {
    const keyName = event.key.toLowerCase();
    keyPressed(keyName);
  },
  false
);

document.addEventListener("DOMContentLoaded", restartGame, false);
