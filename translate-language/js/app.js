let fromText = document.querySelector(".translate-from");
let translateResult = document.querySelector(".translate-to");
let arrowLeftRight = document.querySelector(".arrow-left-right");
let selectTag = document.querySelectorAll("select");
let translateBtn = document.getElementById("translate-btn");

let speakFromBtn = document.querySelector(".speak-from-text");
let copyFromBtn = document.querySelector(".copy-from-text");
let speakToBtn = document.querySelector(".speak-to-text");
let copyToBtn = document.querySelector(".copy-to-text");

selectTag.forEach((tag, id) => {
  for (const country_code in countries) {
    let selected;
    if (id == 0 && country_code == "id-ID") {
      selected = "selected";
    } else if (id == 1 && country_code == "en-GB") {
      selected = "selected";
    }

    const options = `<option value=${country_code} ${selected} >${countries[country_code]}</option>`;
    tag.insertAdjacentHTML("beforeend", options);
  }
});

arrowLeftRight.addEventListener("click", () => {
  let tempFromText = fromText.value;
  fromText.value = translateResult.value;
  translateResult.value = tempFromText;

  let tempFromLang = selectTag[0].value;
  selectTag[0].value = selectTag[1].value;
  selectTag[1].value = tempFromLang;
});

translateBtn.addEventListener("click", () => {
  translateBtn.disabled = true;
  translateBtn.classList.add("active-btn");
  let sentence = fromText.value;
  const translateFrom = selectTag[0].value;
  const translateTo = selectTag[1].value;

  const apiURL = `https://api.mymemory.translated.net/get?q=${sentence}&langpair=${translateFrom}|${translateTo}`;

  fetch(apiURL)
    .then((res) => res.json())
    .then((data) => (translateResult.value = data.responseData.translatedText))
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      translateBtn.classList.remove("active-btn");
      translateBtn.disabled = false;
    });
});

speakFromBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(fromText.value);
  speechSynthesis.speak(utterance);
});

speakToBtn.addEventListener("click", () => {
  let utterance = new SpeechSynthesisUtterance(translateResult.value);
  speechSynthesis.speak(utterance);
});

copyFromBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(fromText.value).then(() => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Text copied to clipboard",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  });
});

copyToBtn.addEventListener("click", () => {
  navigator.clipboard.writeText(translateResult.value).then(() => {
    Swal.fire({
      toast: true,
      position: "top-end",
      icon: "success",
      title: "Text copied to clipboard",
      showConfirmButton: false,
      timer: 3000,
      timerProgressBar: true,
    });
  });
});
