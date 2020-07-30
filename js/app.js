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
      this.expenseInput.value = '';
      this.amountInput.value = '';

      // create expense obj
      let expense = {
        id: this.itemID,
        title: expenseValue,
        amount: amount
      }
      this.itemID++;
      this.itemList.push(expense);
      this.addExpense(expense);
      this.showBalance();
    }
  }

  // add expense method
  addExpense(expense) {
    const div = document.createElement('div');
    div.classList.add('expense');
    div.innerHTML = `
      <div class="expense-item d-flex justify-content-between align-items-baseline">
         <h6 class="expense-title mb-0 text-uppercase list-item">${expense.title}</h6>
         <h5 class="expense-amount mb-0 list-item">${expense.amount}</h5>

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
    this.expenseList.append(div);
  }

  //total expenses
  totalExpense() {
    let total = 0;
    if (this.itemList.length > 0) {
      total = this.itemList.reduce(function (acc, current) {
        acc += current.amount;
        return acc;
      }, 0);
    }
    this.expenseAmount.textContent = total;
    return total;
  }

  //edit expense
  editExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove element from dom
    this.expenseList.removeChild(parent);

    let expense = this.itemList.filter(function (item) {
      return item.id === id;
    });

    this.expenseInput.value = expense[0].title;
    this.amountInput.value = expense[0].amount;

    // remove from list
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
  }
  // delete expense
  deleteExpense(element) {
    let id = parseInt(element.dataset.id);
    let parent = element.parentElement.parentElement.parentElement;
    // remove element from dom
    this.expenseList.removeChild(parent);

    // remove from list
    let tempList = this.itemList.filter(function (item) {
      return item.id !== id;
    });
    this.itemList = tempList;
    this.showBalance();
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
    // edit element
    if (e.target.parentElement.classList.contains('edit-icon')) {
      ui.editExpense(e.target.parentElement);
      // remove element
    } else if (e.target.parentElement.classList.contains('delete-icon')) {
      ui.deleteExpense(e.target.parentElement);
    }
  });
}

document.addEventListener('DOMContentLoaded', function () {
  eventListeners();
})