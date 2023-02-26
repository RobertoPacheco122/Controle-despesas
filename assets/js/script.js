import Transaction from "./modules/Transaction.js";

const button = document.querySelector(".main__button--submit");

function clearInputs(...inputs) {
  inputs.forEach((input) => {
    input.value = "";
  });
}

function handleButton(event) {
  event.preventDefault();
  const nameInput = document.querySelector("#name");
  const valueInput = document.querySelector("#value");
  const transaction = new Transaction(nameInput.value, valueInput.value);
  transaction.init();

  clearInputs(nameInput, valueInput);
}

Transaction.retrieveTransactions();

button.addEventListener("click", handleButton);
