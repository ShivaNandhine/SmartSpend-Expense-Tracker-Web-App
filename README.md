# 💸 SmartSpend - Expense Tracker Web App

A modern, interactive, and responsive web application to manage and track your daily expenses and income. Built using **HTML**, **CSS**, and **JavaScript**, this project allows users to record transactions, categorize expenses, view summaries, filter data, and toggle between light/dark themes — all with clean UI/UX and local storage support.

---

## 📌 Features

- ✅ Add income and expense transactions with date, amount, and category
- 🗂️ Category selection with icons (🛒 Food, 💼 Salary, 🎮 Entertainment, etc.)
- 📊 Dynamic summary of total balance, income, and expense
- 🔎 Filter transactions by category
- 🌙 Toggle Dark/Light Mode
- 📁 Persistent data using `localStorage`
- 🔔 Toast messages on successful actions
- 🧹 Custom dropdowns and smooth animations
- 🗑️ Confirm before deleting transactions with a styled popup modal

---



## 🛠️ Technologies Used

| Tech         | Description                     |
|--------------|---------------------------------|
| HTML5        | Structure and layout            |
| CSS3         | Styling, animations, responsive |
| JavaScript   | Logic, interactivity, storage   |
| LocalStorage | For persisting data locally     |

---

## 🚀 How It Works

1. **Add Transactions**  
   Fill in description, amount, date, and choose a category from the dropdown.

2. **Category Logic**  
   - If category is **Salary**, it’s treated as **Income**  
   - All other categories are treated as **Expenses**

3. **Summary Calculation**  
   Automatically updates **Total Balance**, **Income**, and **Expenses**.

4. **Dark Mode**  
   Click toggle button to switch between light and dark themes. Stored in `localStorage`.

5. **Delete with Confirmation**  
   On clicking delete, a popup asks for confirmation. On acceptance, the transaction is removed and toast appears.

---

## 📂 Project Structure

```
SmartSpend/
├── index.html
├── style.css
├── script.js
├── logo.png
└── README.md
```

