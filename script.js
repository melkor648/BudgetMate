let expenses = JSON.parse(localStorage.getItem("expenses")) || [];

// DOM elements
const itemNameInput = document.getElementById("itemName");
const itemAmountInput = document.getElementById("itemAmount");
const addBtn = document.getElementById("addBtn");
const expenseList = document.getElementById("expenseList");
const totalAmount = document.getElementById("totalAmount");
const clearBtn = document.getElementById("clearBtn");

// Event listeners
addBtn.addEventListener("click", addExpense);
clearBtn.addEventListener("click", clearAll);

// Render stored data on load
renderExpenses();

// --- Functions ---
function addExpense() {
  const name = itemNameInput.value.trim();
  const amount = parseFloat(itemAmountInput.value);

  if (name === "" || isNaN(amount) || amount <= 0) {
    alert("Please enter a valid expense name and amount.");
    return;
  }

  const expense = { id: Date.now(), name, amount };
  expenses.push(expense);
  saveAndRender();

  itemNameInput.value = "";
  itemAmountInput.value = "";
}

function deleteExpense(id) {
  expenses = expenses.filter((exp) => exp.id !== id);
  saveAndRender();
}

function renderExpenses() {
  expenseList.innerHTML = "";
  let total = 0;

  expenses.forEach((exp) => {
    total += exp.amount;
    const li = document.createElement("li");
    li.className = "expense-item";
    li.innerHTML = `
      <span>${exp.name}</span>
      <span>$${exp.amount.toFixed(2)}</span>
      <button class="delete-btn" onclick="deleteExpense(${exp.id})">X</button>
    `;
    expenseList.appendChild(li);
  });

  totalAmount.textContent = total.toFixed(2);
}

function saveAndRender() {
  localStorage.setItem("expenses", JSON.stringify(expenses));
  renderExpenses();
}

function clearAll() {
  if (confirm("Are you sure you want to clear all expenses?")) {
    expenses = [];
    saveAndRender();
  }
}
