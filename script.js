// === Select DOM Elements ===
const form = document.getElementById('transaction-form');
const descriptionInput = document.getElementById('description');
const amountInput = document.getElementById('amount');
const dateInput = document.getElementById('date');
const transactionList = document.getElementById('transaction-list');
const filterSelect = document.getElementById('filter-category');
const totalBalance = document.getElementById('total-balance');
const totalIncome = document.getElementById('total-income');
const totalExpense = document.getElementById('total-expense');
const darkToggle = document.getElementById('darkModeToggle');

const categorySelect = document.getElementById("categorySelect");
const optionsList = document.querySelector(".select-options");
const selected = categorySelect.querySelector(".selected");
const hiddenInput = document.getElementById("category");

categorySelect.addEventListener("click", () => {
  categorySelect.classList.toggle("open");
});

optionsList.querySelectorAll("li").forEach(option => {
  option.addEventListener("click", () => {
    selected.textContent = option.textContent;
    hiddenInput.value = option.dataset.value;
    categorySelect.classList.remove("open");
  });
});

// Close dropdown on outside click
window.addEventListener("click", e => {
  if (!categorySelect.contains(e.target)) {
    categorySelect.classList.remove("open");
  }
});

// === Icon Map ===
const categoryIcons = {
  food: "🛒",
  travel: "⛽",
  salary: "💼",
  entertainment: "🎮",
  rent: "🏠",
  education: "📚",
  bills: "🧾",
  shopping: "🛍️",
  health: "💊",
  pets: "🐾",
  vacation: "✈️",
  subscriptions: "📱",
};

// === Load Transactions from localStorage ===
let transactions = JSON.parse(localStorage.getItem('transactions')) || [];

// === Render Transactions ===
function renderTransactions(list = transactions) {
  transactionList.innerHTML = '';
  list.forEach((t, index) => {
    const li = document.createElement('li');

    const icon = categoryIcons[t.category] || "💸";
    const sign = t.category === "salary" ? "+" : "-";
    const amountClass = t.category === "salary" ? 'income' : 'expense';

    li.innerHTML = `
      <span class="category-icon">${icon}</span>
      <span class="description">${t.description} (${t.category})</span>
      <span class="amount ${amountClass}">${sign} ₹${Math.abs(t.amount)}</span>
      <span class="date">${t.date}</span>
      <button class="delete-btn" onclick="deleteTransaction(${index})" title="Delete">🗑️</button>
    `;

    transactionList.appendChild(li);
  });

  updateTotals();
}

// === Add Transaction ===
form.addEventListener('submit', (e) => {
  e.preventDefault();

  const description = descriptionInput.value.trim();
  const inputAmount = parseFloat(amountInput.value.trim());
  const category = hiddenInput.value;
  const date = dateInput.value;

  if (!description || isNaN(inputAmount) || !category || !date) {
    alert("Please fill all fields correctly.");
    return;
  }

  // Automatically treat "salary" as income, others as expense
  const amount = category === 'salary' ? inputAmount : -Math.abs(inputAmount);

  const transaction = { description, amount, category, date };
  transactions.push(transaction);
  localStorage.setItem('transactions', JSON.stringify(transactions));

  form.reset();
  selected.textContent = "Select category";
  hiddenInput.value = "";
  categorySelect.classList.remove("open");

  renderTransactions();
  showToast("Expense Added!");
});

// === Delete Transaction ===
let deleteIndex = null; // store which transaction to delete

function deleteTransaction(index) {
  deleteIndex = index;
  document.getElementById('confirm-modal').style.display = 'flex';
}

// Modal buttons
document.getElementById('confirm-yes').addEventListener('click', () => {
  if (deleteIndex !== null) {
    transactions.splice(deleteIndex, 1);
    localStorage.setItem('transactions', JSON.stringify(transactions));
    renderTransactions();
    showToast("Transaction deleted!");
    deleteIndex = null;
  }
  document.getElementById('confirm-modal').style.display = 'none';
});

document.getElementById('confirm-no').addEventListener('click', () => {
  deleteIndex = null;
  document.getElementById('confirm-modal').style.display = 'none';
});

// === Update Totals ===
function updateTotals() {
  let income = 0;
  let expense = 0;

  transactions.forEach(t => {
    if (t.category === "salary") income += t.amount;
    else expense += Math.abs(t.amount);
  });

  totalIncome.textContent = `₹${income.toFixed(2)}`;
  totalExpense.textContent = `₹${expense.toFixed(2)}`;
  totalBalance.textContent = `₹${(income - expense).toFixed(2)}`;
}

// === Filter by Category ===
const filterDropdown = document.getElementById("filterSelect");
const selectedFilter = filterDropdown.querySelector(".selected-filter");
const optionsFilter = filterDropdown.querySelectorAll(".filter-options li");

filterDropdown.addEventListener("click", () => {
  filterDropdown.classList.toggle("open");
});

// Handle option click
optionsFilter.forEach(option => {
  option.addEventListener("click", () => {
    const selectedValue = option.dataset.value;
    selectedFilter.textContent = option.textContent;

    optionsFilter.forEach(opt => opt.classList.remove("active"));
    option.classList.add("active");

    filterDropdown.classList.remove("open");

    if (selectedValue === "all") {
      renderTransactions();
    } else {
      const filtered = transactions.filter(t => t.category === selectedValue);
      renderTransactions(filtered);
    }
  });
});

// Close on outside click
window.addEventListener("click", (e) => {
  if (!filterDropdown.contains(e.target)) {
    filterDropdown.classList.remove("open");
  }
});


const darkToggleBtn = document.getElementById('darkModeToggleBtn');

// === Toggle Dark Mode Button ===
darkToggleBtn.addEventListener('click', () => {
  document.body.classList.toggle('dark');
  const isDark = document.body.classList.contains('dark');
  localStorage.setItem('darkMode', isDark);
  updateDarkModeButton(isDark);
});

// === Set Button Text Based on Mode ===
function updateDarkModeButton(isDark) {
  darkToggleBtn.textContent = isDark ? '☀️ Light Mode' : '🌙 Dark Mode';
}

// === Load Dark Mode State on Page Load ===
window.addEventListener('DOMContentLoaded', () => {
  const isDark = JSON.parse(localStorage.getItem('darkMode'));
  if (isDark) {
    document.body.classList.add('dark');
  }
  updateDarkModeButton(isDark);
  renderTransactions();
});

// === Toast Notification ===
function showToast(message) {
  const toast = document.getElementById('toast-message');
  toast.textContent = message;
  toast.classList.add('show');

  setTimeout(() => {
    toast.classList.remove('show');
  }, 1500);
}
