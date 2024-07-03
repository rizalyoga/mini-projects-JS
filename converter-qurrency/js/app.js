let amountInput = document.getElementById("amount-input");
let select = document.querySelectorAll("select");
let changeValueBtn = document.querySelector(".left-right-arrow");
let convertBtn = document.getElementById("convert-btn");

let flagFrom = document.querySelector(".flag-from");
let flagTo = document.querySelector(".flag-to");
let textResult = document.querySelector(".result-convert");

select.forEach((tag, idx) => {
  for (const currency_code in country_list) {
    let selected;
    if (idx == 0 && currency_code == "IDR") {
      selected = "selected";
    } else if (idx == 1 && currency_code == "USD") {
      selected = "selected";
    }

    const option = `<option value=${currency_code} ${selected} >${currency_code}</option>`;
    tag.insertAdjacentHTML("beforeend", option);

    select[0].addEventListener("change", () => {
      flagFrom.src = `https://flagsapi.com/${
        country_list[select[0].value]
      }/flat/64.png`;
    });

    select[1].addEventListener("change", () => {
      flagTo.src = `https://flagsapi.com/${
        country_list[select[1].value]
      }/flat/64.png`;
    });
  }
});

changeValueBtn.addEventListener("click", () => {
  let tempValue = select[0].value;
  select[0].value = select[1].value;
  select[1].value = tempValue;

  let tempFlagFromSrc = flagFrom.src;
  flagFrom.src = flagTo.src;
  flagTo.src = tempFlagFromSrc;
});

const currencyFormat = (amount, currency_format) => {
  const result = new Intl.NumberFormat("en", {
    style: "currency",
    currency: currency_format,
  }).format(amount);

  return result;
};

convertBtn.addEventListener("click", () => {
  let API_URL = `https://v6.exchangerate-api.com/v6/${API_KEY}/latest`;

  if (amountInput.value == 0 || amountInput.value == "") {
    alert("Please enter the currency amount!");
  } else {
    textResult.innerText = "Please wait...";
    convertBtn.disabled = true;
    convertBtn.style.background = "grey";
    convertBtn.style.cursor = "progress";
    fetch(`${API_URL}/${select[0].value}`)
      .then((res) => res.json())
      .then((data) => {
        textResult.innerText = `${currencyFormat(
          Number(amountInput.value),
          select[0].value
        )}  =  ${currencyFormat(
          Number(amountInput.value) * data.conversion_rates[select[1].value],
          select[1].value
        )} `;
      })
      .catch((error) => console.log(error))
      .finally(() => {
        convertBtn.disabled = false;
        convertBtn.style.background = "";
        convertBtn.style.cursor = "pointer";
      });
  }
});
