export default class Balance {
  constructor(actual, income, expense) {
    this.actual = document.querySelector(actual);
    this.income = document.querySelector(income);
    this.expense = document.querySelector(expense);
  }

  static cleanAmount(amount) {
    return +amount.replace(/([\sR$]+)/g, "");
  }

  getBalanceInfo() {
    return {
      actual: Balance.cleanAmount(this.actual.innerText),
      income: Balance.cleanAmount(this.income.innerText),
      expense: Balance.cleanAmount(this.expense.innerText),
    };
  }

  updateIncomeAmount(value, option) {
    const amount = Balance.cleanAmount(value);
    const balances = this.getBalanceInfo();
    let newIncomeTotal;
    let newActualTotal;

    if (option === "increase") {
      newIncomeTotal = (amount + balances.income).toFixed(2);
      newActualTotal = (amount + balances.actual).toFixed(2);
    } else if (option === "decrease") {
      newIncomeTotal = (balances.income - amount).toFixed(2);
      newActualTotal = (balances.actual - amount).toFixed(2);
    }

    this.income.innerText = `R$ ${newIncomeTotal}`;
    this.actual.innerText = `R$ ${newActualTotal}`;
  }

  updateExpenseAmount(value, option) {
    const amount = Balance.cleanAmount(value);
    const balances = this.getBalanceInfo();
    let newExpenseTotal;
    let newActualTotal;

    if (option === "increase") {
      newExpenseTotal = (amount + -balances.expense).toFixed(2);
      newActualTotal = (amount + balances.actual).toFixed(2);
    } else if (option === "decrease") {
      newExpenseTotal = balances.expense + amount;
      newActualTotal = (balances.actual - amount).toFixed(2);
    }

    this.expense.innerText = `R$ ${Math.abs(newExpenseTotal).toFixed(2)}`;
    this.actual.innerText = `R$ ${newActualTotal}`;
  }
}
