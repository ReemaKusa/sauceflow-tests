# 🧪 SauceDemo QA Automation Project

This project is part of the **Software Testing and Quality Assurance** course (Second Semester 2024/2025), Homework Assignment #3.  
It demonstrates automated UI testing using **Playwright** and **TypeScript** for the [SauceDemo](https://www.saucedemo.com/) web application.

## 📌 Project Objectives

Automated testing of the following features:

- ✅ Login functionality  
- ✅ Add to Cart  
- ✅ Remove from Cart  
- ✅ Checkout Process  
- ✅ Product Sorting (A–Z and Price: High to Low)

---

## 🧱 Tech Stack

- [Playwright](https://playwright.dev/) with TypeScript  
- Node.js (v18+ recommended)  
- Page Object Model (POM) Design Pattern  
- Storage state for session reuse  
- Support for multiple browsers (Chromium, Firefox)

---

## 🗂 Project Structure

```
.
├── tests/                   # Test specs
│   ├── login.spec.ts
│   ├── cart.spec.ts
│   ├── checkout.spec.ts
│   └── sort.spec.ts
│
├── pages/                   # Page object models
│   ├── loginPage.ts
│   ├── productsPage.ts
│   ├── cartPage.ts
│   └── checkoutPage.ts
│
├── playwright.config.ts     # Playwright configuration
├── package.json
└── README.md
```

---

## ⚙️ Setup & Run

### 1. Install dependencies

```bash
npm install
```

### 2. Run tests in all configured browsers

```bash
npx playwright test
```

### 3. Run tests in a specific browser (e.g., Firefox)

```bash
npx playwright test --project=firefox
```

### 4. View the HTML report

```bash
npx playwright show-report
```

---

## 💡 Notes

- **Storage state** is reused to avoid logging in before every test.  
- Tests are grouped and organized by feature.  
- Hooks (`beforeEach`, etc.) are used to initialize states.  
- The `.env` file can be used for sensitive parameters like credentials (not included here for security).

---

## 📎 Author

Homework for:  
📚 **Software Testing and Quality Assurance**  
📅 Semester: 2nd – 2024/2025  
🎓 Student: *[Reema Kusa]

---

## ✅ Final Checklist

- [x] Feature coverage complete  
- [x] Separate files per feature  
- [x] Page Object Model used  
- [x] Multi-browser testing  
- [x] Hooks & storage state used  
- [x] GitHub-ready & clean  

---

## 🔗 GitHub Repository

📎 [GitHub Repo Link](https://github.com/your-username/saucedemo-qa-playwright) *(update with actual link)*
