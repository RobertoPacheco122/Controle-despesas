import Balance from "./Balance.js";

const transactionsList = document.querySelector(".main__list");

export default class Transaction {
  static transactionsAcc = 0;

  constructor(nameInput, amountInput, transactionID) {
    this.name = nameInput;
    this.amount = amountInput;
    this.balance = new Balance(
      ".main__balance",
      ".main__income",
      ".main__expenses"
    );

    if (transactionID === undefined) {
      this.id = Transaction.transactionsAcc;
      Transaction.transactionsAcc += 1;
    } else {
      this.id = transactionID;
    }
  }

  static retrieveTransactions() {
    const keys = Object.keys(localStorage);

    keys.forEach((key) => {
      const transactionData = JSON.parse(localStorage[key]);
      const { name, amount, id } = transactionData;
      const transaction = new Transaction(name, amount, id);
      transaction.init();
    });
  }

  static excludeTransactionFromLocal(transactionID) {
    localStorage.removeItem(transactionID);
  }

  getTransactionType() {
    if (this.amount.includes("-")) return "expense";
    return "income";
  }

  getFormatedAmount() {
    if (this.getTransactionType() === "income") return `+ R$${this.amount}`;
    return this.amount.replace("-", "- R$");
  }

  createTransactionCard() {
    const li = document.createElement("li");
    li.classList.add("main__transaction--card");
    li.innerHTML = `
      <div class="main--transaction--content">
        <p class="main__name--transaction">${this.name}</p>
        <span class="main__value--transaction">${this.getFormatedAmount(
          this.getTransactionType()
        )}</span>
      </div>
      <div class="main--transaction--color ${this.getTransactionType()}"></div>
    `;

    return li;
  }

  addTransactionCardEvent(card) {
    card.addEventListener("dblclick", (event) => {
      const target = event.currentTarget.querySelector(
        ".main__value--transaction"
      );
      const targetAmount = target.innerText;
      if (this.getTransactionType() === "income") {
        this.balance.updateIncomeAmount(targetAmount, "decrease");
      } else {
        this.balance.updateExpenseAmount(targetAmount, "decrease");
      }

      event.currentTarget.remove();
      Transaction.excludeTransactionFromLocal(this.id);
    });
  }

  addTransactionIntoDom() {
    const card = this.createTransactionCard();
    transactionsList.appendChild(card);
    if (this.getTransactionType() === "income") {
      this.balance.updateIncomeAmount(this.amount, "increase");
    } else {
      this.balance.updateExpenseAmount(this.amount, "increase");
    }
    this.addTransactionCardEvent(card);
  }

  addTransactionIntoLocal() {
    localStorage.setItem(this.id, JSON.stringify(this));
  }

  init() {
    if (this.name && this.amount) {
      this.addTransactionIntoDom();
      this.addTransactionIntoLocal();
    }
    return this;
  }
}
