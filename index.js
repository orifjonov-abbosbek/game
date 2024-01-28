const questionAnswerPairs = [
  { question: "Capital of France", answer: "Paris" },
  { question: "Largest mammal", answer: "BlueWhale" },
  { answer: "moonlight", question: "The light from the moon." },
  {
    answer: "illusion",
    question:
      "A false perception or belief; a deceptive appearance or impression.",
  },
  {
    answer: "secret",
    question: "Something kept hidden or unknown to others.",
  },
  {
    answer: "puzzle",
    question:
      "A game, toy, or problem designed to test ingenuity or knowledge.",
  },
  { question: "Country known for its tulips", answer: "Netherlands" },
  { question: "Largest desert in the world", answer: "Antarctica" },
  { answer: "adventure", question: "An exciting or daring experience." },
  {
    answer: "technology",
    question: "The application of scientific knowledge for practical purposes.",
  },
  {
    answer: "harmony",
    question: "A consistent, orderly, or pleasing arrangement of parts.",
  },
  { answer: "enigma", question: "A mysterious or puzzling person or thing." },
];

const Wrapper = document.createElement("div");
Wrapper.id = "wrapper";
document.body.appendChild(Wrapper);

const parentDiv = document.createElement("div");
parentDiv.id = "hangmanContainer";
document.body.appendChild(parentDiv);

const wordDisplayElement = document.createElement("p");
wordDisplayElement.id = "wordDisplay";
parentDiv.appendChild(wordDisplayElement);

const questionElement = document.createElement("p");
questionElement.id = "question";
parentDiv.appendChild(questionElement);

const incorrectGuessesElement = document.createElement("p");
incorrectGuessesElement.id = "incorrectGuesses";
parentDiv.appendChild(incorrectGuessesElement);

const imageBox = document.createElement("div");
imageBox.id = "image_box";
const hangmanImage = document.createElement("img");
hangmanImage.id = "image1";
hangmanImage.src = "./assets/hangman-0.svg";

imageBox.appendChild(hangmanImage);

const alphabetElement = document.createElement("div");
alphabetElement.id = "alphabet";
parentDiv.appendChild(alphabetElement);
Wrapper.appendChild(imageBox);
Wrapper.appendChild(parentDiv);

let currentPair =
  questionAnswerPairs[Math.floor(Math.random() * questionAnswerPairs.length)];

let selectedWord = currentPair.answer.toUpperCase();
let correctGuesses = Array(selectedWord.length).fill(false);
let incorrectGuesses = [];
let incorrectGuessLimit = 6;
let alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

function guessLetter(guessedLetter) {
  if (selectedWord.includes(guessedLetter)) {
    for (let i = 0; i < selectedWord.length; i++) {
      if (selectedWord[i] === guessedLetter) {
        correctGuesses[i] = true;
      }
    }
  } else {
    incorrectGuesses.push(guessedLetter);
  }

  alphabet = alphabet.replace(guessedLetter, "_");

  updateDisplay();
}

function resetGame() {
  currentPair =
    questionAnswerPairs[Math.floor(Math.random() * questionAnswerPairs.length)];

  selectedWord = currentPair.answer.toUpperCase();
  correctGuesses = Array(selectedWord.length).fill(false);
  incorrectGuesses = [];
  alphabet = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";

  updateDisplay();
}

const modalWrapper = document.createElement("div");
modalWrapper.id = "modalWrapper";
modalWrapper.style.display = "none";
document.body.appendChild(modalWrapper);

function showModal(message) {
  const modalContent = document.createElement("div");
  modalContent.id = "modal-content";
  modalContent.innerHTML = `<p>${message}</p><button id="modal-btn" onclick="hideModal()">Play Again</button>`;
  modalWrapper.appendChild(modalContent);

  modalWrapper.style.display = "block";
}

function hideModal() {
  modalWrapper.innerHTML = "";
  modalWrapper.style.display = "none";
}

function updateDisplay() {
  const wordDisplay = document.getElementById("wordDisplay");
  const incorrectGuessesDisplay = document.getElementById("incorrectGuesses");
  const alphabetDisplay = document.getElementById("alphabet");
  const hangmanImageNumber = Math.min(
    incorrectGuesses.length,
    incorrectGuessLimit
  );
  hangmanImage.src = `./assets/hangman-${hangmanImageNumber}.svg`;
  document.getElementById(
    "question"
  ).textContent = `Hint:  ${currentPair.question}`;
  wordDisplay.textContent = selectedWord
    .split("")
    .map((letter, index) => (correctGuesses[index] ? letter : "_"))
    .join(" ");
  incorrectGuessesDisplay.textContent =
    "Incorrect Guesses: " + incorrectGuesses.length + "/" + incorrectGuessLimit;

  alphabetDisplay.innerHTML = "";
  alphabet.split("").forEach((letter) => {
    const button = document.createElement("button");
    button.textContent = letter;
    button.classList.add("a-btn");
    button.onclick = function () {
      guessLetter(letter);
    };
    alphabetDisplay.appendChild(button);
  });

  if (!wordDisplay.textContent.includes("_")) {
    showModal("Congratulations! You guessed the word: " + selectedWord);
    resetGame();
  }

  if (incorrectGuesses.length === incorrectGuessLimit) {
    showModal("Sorry, you ran out of attempts. The word was: " + selectedWord);
    resetGame();
  }
}


updateDisplay();
