let textParagraph = document.querySelector(".typing-text-box p");
let tryAgainBtn = document.getElementById("try-again-btn");
let inputField = document.getElementById("input-field");

let mistakeTag = document.querySelector(".mistake span");
let wpmTag = document.querySelector(".wpm span");
let cpmTag = document.querySelector(".cpm span");
let timeLeftTag = document.querySelector(".time b");

let CHARACTER_INDEX = 0;
let mistakeTotal = 0;

let timer;
let maxTime = 60;
let timeLeft = maxTime;
let isTyping = false;

const getParagraph = () => {
  let randomIndex = Math.floor(Math.random() * paragraphs.length);

  paragraphs[randomIndex].split("").forEach((char) => {
    const spanTag = `<span>${char}</span>`;
    textParagraph.innerHTML += spanTag;
  });

  textParagraph.querySelectorAll("span")[0].classList.add("active");
  document.addEventListener("keydown", () => inputField.focus());
  textParagraph.addEventListener("click", () => inputField.focus());
};

const typingHandler = () => {
  const characters = textParagraph.querySelectorAll("span");
  let typeCharacter = inputField.value.split("")[CHARACTER_INDEX];

  if (CHARACTER_INDEX < characters.length - 1 && timeLeft > 0) {
    if (!isTyping) {
      timer = setInterval(timerCountdown, 1000);
      isTyping = true;
    }

    if (typeCharacter == null) {
      CHARACTER_INDEX--;

      if (characters[CHARACTER_INDEX].classList.contains("incorrect")) {
        mistakeTotal--;
      }

      characters[CHARACTER_INDEX].classList.remove("correct", "incorrect");
    } else {
      if (characters[CHARACTER_INDEX].innerText === typeCharacter) {
        characters[CHARACTER_INDEX].classList.add("correct");
      } else {
        mistakeTotal++;
        characters[CHARACTER_INDEX].classList.add("incorrect");
      }
      CHARACTER_INDEX++;
    }

    characters.forEach((span) => span.classList.remove("active"));
    characters[CHARACTER_INDEX].classList.add("active");

    let wpm = Math.round(
      ((CHARACTER_INDEX - mistakeTotal) / 5 / (maxTime - timeLeft)) * 60
    );
    wpm = wpm < 0 || !wpm || wpm === Infinity ? 0 : wpm;

    wpmTag.innerText = wpm;
    mistakeTag.innerText = mistakeTotal;
    cpmTag.innerText = CHARACTER_INDEX - mistakeTotal;
  } else {
    inputField.value = "";
    clearInterval(timer);
  }
};

const timerCountdown = () => {
  if (timeLeft > 0) {
    timeLeft--;
    timeLeftTag.innerText = timeLeft;
  } else {
    clearInterval(timer);
  }
};

const resetGame = () => {
  textParagraph.innerHTML = "";
  getParagraph();
  // reset all
  clearInterval(timer);
  CHARACTER_INDEX = 0;
  isTyping = false;
  mistakeTotal = 0;
  timeLeft = maxTime;
  timeLeftTag.innerText = timeLeft;
  mistakeTag.innerText = mistakeTotal;
  inputField.value = "";
  wpmTag.innerText = 0;
  cpmTag.innerText = 0;
};

getParagraph();

tryAgainBtn.addEventListener("click", () => resetGame());

inputField.addEventListener("input", typingHandler);
