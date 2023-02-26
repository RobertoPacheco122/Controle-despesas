const transactionsList = document.querySelector(".main__list");
const button = document.querySelector(".main__button--submit");
const actual = document.querySelector(".main__balance");
const income = document.querySelector(".main__income");
const expense = document.querySelector(".main__expenses");

class Transaction {
  static transactionsAcc = 0;

  constructor(nameInput, amountInput) {
    this.name = document.querySelector(nameInput).value;
    this.amount = document.querySelector(amountInput).value;
    this.id = Transaction.transactionsAcc;

    Transaction.transactionsAcc += 1;
  }

  static getBalanceInfo() {
    return {
      actual: Transaction.cleanAmount(actual.innerText),
      income: Transaction.cleanAmount(income.innerText),
      expense: Transaction.cleanAmount(expense.innerText),
    };
  }

  static cleanAmount(amount) {
    return +amount.replace(/([\sR$]+)/g, "");
  }

  static updateIncomeAmount(value, option) {
    const amount = Transaction.cleanAmount(value);
    const balances = Transaction.getBalanceInfo();
    let newIncomeTotal;
    let newActualTotal;

    if (option === "increase") {
      newIncomeTotal = (amount + balances.income).toFixed(2);
      newActualTotal = (amount + balances.actual).toFixed(2);
    } else if (option === "decrease") {
      newIncomeTotal = (balances.income - amount).toFixed(2);
      newActualTotal = (balances.actual - amount).toFixed(2);
    }

    income.innerText = `R$ ${newIncomeTotal}`;
    actual.innerText = `R$ ${newActualTotal}`;
  }

  static updateExpenseAmount(value, option) {
    const amount = Transaction.cleanAmount(value);
    const balances = Transaction.getBalanceInfo();
    let newExpenseTotal;
    let newActualTotal;

    if (option === "increase") {
      newExpenseTotal = (amount + -balances.expense).toFixed(2);
      newActualTotal = (amount + balances.actual).toFixed(2);
    } else if (option === "decrease") {
      newExpenseTotal = balances.expense + amount;
      newActualTotal = (balances.actual - amount).toFixed(2);
    }

    expense.innerText = `R$ ${Math.abs(newExpenseTotal).toFixed(2)}`;
    actual.innerText = `R$ ${newActualTotal}`;
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
        Transaction.updateIncomeAmount(targetAmount, "decrease");
      } else {
        Transaction.updateExpenseAmount(targetAmount, "decrease");
      }

      event.currentTarget.remove();
    });
  }

  addTransactionIntoDom() {
    const card = this.createTransactionCard();
    transactionsList.appendChild(card);
    if (this.getTransactionType() === "income") {
      Transaction.updateIncomeAmount(this.amount, "increase");
    } else {
      Transaction.updateExpenseAmount(this.amount, "increase");
    }
    this.addTransactionCardEvent(card);
  }

  init() {
    if (this.name && this.amount) {
      this.addTransactionIntoDom();
    }

    return this;
  }
}

function handleButton(event) {
  event.preventDefault();
  const transaction = new Transaction("#name", "#value");
  transaction.init();
}

button.addEventListener("click", handleButton);
