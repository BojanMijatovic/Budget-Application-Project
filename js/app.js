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
    const value = this.budgetInput.value;
    if (value === '' || value < 0) {
      this.budgetFeedback.textContent = 'Please insert real values';
      this.budgetFeedback.classList.add('showItem');
      let setTime = this.budgetFeedback;
      // remove alert for invalid values
      setTimeout(function () {
        setTime.classList.remove('showItem');
      }, 2000);
    }
    else {
      this.budgetAmount.textContent = value;
      this.budgetInput.value = '';
      this.showBalance();
    };
  }

  // show balance
  showBalance() {
    const expense = this.totalExpense();
    const total = parseInt(this.budgetAmount.textContent) - expense;
    this.balanceAmount.textContent = total;
    if (total < 0) {
      this.balance.classList.remove('showGreen', 'showBlack');
      this.balance.classList.add('showRed');
    } else if (total > 0) {
      this.balance.classList.remove('showBlack', 'showRed');
      this.balance.classList.add('showGreen');
    } else {
      this.balance.classList.remove('showGreen', 'showRed');
      this.balance.classList.add('showBlack');
    }
  }

  // submit expense form 
  submitExpenseForm() {
    const expenseValue = this.expenseInput.value;
    const amountValue = this.amountInput.value;

    if (expenseValue.trim() === '' || amountValue.trim() === '' || amountValue < 0) {
      this.expenseFeedback.textContent = 'Insert real values';
      this.expenseFeedback.classList.add('showItem');

      let setTime = this.expenseFeedback;
      setTimeout(function () {
        setTime.classList.remove('showItem');
      }, 2000);
    }
    else {
      let amount = parseInt(amountValue);
      this.expenseInput = '';
      this.amountInput = '';

      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
    }
  }

  // add expense
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">- title</h6>
         <h5 class="expense-amount mb-0 list-item">amount</h5>

         <div class="expense-icons list-item">

          <a href="#" class="edit-icon mx-2" data-id="${expense.id}">
           <i class="fas fa-edit"></i>
          </a>
          <a href="#" class="delete-icon" data-id="${expense.id}">
           <i class="fas fa-trash"></i>
          </a>
         </div>
        </div>
    `;
  }

  //total expenses
  totalExpense() {
    let total = 10;
    return total;
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
  });

  // expense form 
  expensesForm.addEventListener('submit', function (e) {
    e.preventDefault();
    ui.submitExpenseForm();
  })

  // expense form 
  expensesList.addEventListener('click', function (e) {

  });
}

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
})