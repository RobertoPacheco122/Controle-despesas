import Transaction from "./modules/Transaction.js";

const button = document.querySelector(".main__button--submit");

function handleButton(event) {
  event.preventDefault();
  const nameInput = document.querySelector("#name").value;
  const valueInput = document.querySelector("#value").value;
  const transaction = new Transaction(nameInput, valueInput);
  transaction.init();
}

Transaction.retrieveTransactions();

button.addEventListener("click", handleButton);
