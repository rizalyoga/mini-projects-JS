let quoteText = document.querySelector(".quote-text");
let quoteAuthor = document.querySelector(".author");
let getQuoteBtn = document.querySelector(".new-quote-btn");

let soundBtn = document.getElementById("sound-btn");
let twitterBtn = document.getElementById("twitter-btn");
let copyBtn = document.getElementById("copy-btn");

let quote =
  "Genius is one percent inspiration and ninety-nine percent perspiration.";
let author = "Thomas Edison";

const getQuote = () => {
  getQuoteBtn.innerText = `Loading Quote...`;
  getQuoteBtn.style.background = "grey";
  getQuoteBtn.style.cursor = "progress";
  getQuoteBtn.disabled = true;
  fetch("https://api.quotable.io/random")
    .then((response) => response.json())
    .then((data) => {
      if (data) {
        quoteText.innerText = data?.content;
        quote = data?.content;
        quoteAuthor.innerText = `- ${data?.author} -`;
        author = data?.author;
      }
    })
    .catch((error) => {
      console.error(error);
    })
    .finally(() => {
      getQuoteBtn.innerText = `New Quote`;
      getQuoteBtn.style.cursor = "pointer";
      getQuoteBtn.style.backgroundColor = "";
      getQuoteBtn.disabled = false;
    });
};

const soundAction = () => {
  let utterance = new SpeechSynthesisUtterance(`${quote} from ${author}`);
  speechSynthesis.speak(utterance);
};

const copyAction = () => {
  navigator.clipboard.writeText(`${quote} from ${author}`);
};

const twitterAction = () => {
  let tweetUrl = `https://twitter.com/intent/tweet?url=${quote} from ${author}`;
  window.open(tweetUrl, "_black");
};
