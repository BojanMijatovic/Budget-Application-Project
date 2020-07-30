class UI {
  constructor() {
    this.budgetFeedback = document.querySelector(".budget-feedback");
    this.expenseFeedback = document.querySelector(".expense-feedback");
    this.budgetForm = document.getElementById("budget-form");
    this.budgetInput = document.getElementById("budget-input");
    this.budgetAmount = document.getElementById("budget-amount");
    this.expenseAmount = document.getElementById("expense-amount");
    this.balance = document.getElementById("balance");
    this.balanceAmount = document.getElementById("balance-amount");
    this.expenseForm = document.getElementById("expense-form");
    this.expenseInput = document.getElementById("expense-input");
    this.amountInput = document.getElementById("amount-input");
    this.expenseList = document.getElementById("expense-list");
    this.itemList = [];
    this.itemID = 0;
  };

  //  add methods to class

  // submit budget form
  submitBudgetForm() {

  }
}

function eventListeners() {
  const budgetForm = document.getElementById('budget-form');
  const expensesForm = document.getElementById('expense-form');
  const expensesList = document.getElementById('expense-list');


  // create new instance of UI Class
  const ui = new UI();


  // budget form 
  budgetForm.addEventListener('submit', function (e) {
    e.preventDefault();
    ui.submitBudgetForm();
  })

  // expense form 
  expensesForm.addEventListener('submit', function (e) {
    e.preventDefault();
  })

  // expense form 
  expensesList.addEventListener('click', function (e) {

  })

}

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
})