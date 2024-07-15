const textArea = document.querySelector("textarea");
const selectVoice = document.querySelector("select");
const speechForm = document.getElementById("speech-form");
const speechBtn = document.getElementById("speech-btn");

let synth = speechSynthesis;
let speaking = false;

const voicesType = () => {
  for (let voice of synth.getVoices()) {
    let selected = voice.name === "Google Bahasa Indonesia" ? "selected" : "";
    let option = ` <option value="${voice.name}" ${selected}>${voice.name} (${voice.lang})</option>`;
    selectVoice.insertAdjacentHTML("beforeend", option);
  }
};
voicesType();
synth.addEventListener("voiceschanged", voicesType);

const textToSpeech = (text) => {
  const utternance = new SpeechSynthesisUtterance(text);

  for (let voice of synth.getVoices()) {
    if (voice.name === selectVoice.value) {
      utternance.voice = voice;
    }
  }
  speechSynthesis.speak(utternance);
};

speechForm.addEventListener("submit", (e) => {
  e.preventDefault();

  if (textArea.value !== "") {
    if (!synth.speaking) {
      speaking = true;
      textToSpeech(textArea.value);
    }

    if (speaking) {
      speechBtn.innerHTML = "Speaking process...";
      speechBtn.classList.add("speaking-process");
    }

    setInterval(() => {
      if (!synth.speaking && speaking) {
        console.log(synth.speaking);
        speaking = false;
        speechBtn.classList.remove("speaking-process");
        speechBtn.innerHTML = "Start speaking";
      }
    }, 400);
  }
});
