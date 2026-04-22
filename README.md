# Invoice Management Application

A fully responsive, full-stack Invoice Management Application built with React. This application allows users to create, read, update, and delete invoices, filter by status, and toggle between light and dark modes, all while persisting data locally.

## 🚀 Setup Instructions

### Prerequisites
Make sure you have [Node.js](https://nodejs.org/) installed on your machine.

### Installation
1. Clone the repository:
   ```bash
   git clone <your-repository-url>
   cd <repository-folder>
   ```
2. Install the dependencies:
   ```bash
   npm install
   ```
3. Start the development server:
   ```bash
   npm run dev
   ```
4. Open your browser and navigate to `http://localhost:5173` (or the port specified in your terminal).

## 🏗 Architecture Explanation

This application is built as a modern React Single Page Application (SPA) using the following stack:

* **Framework:** React (with TypeScript for type safety)
* **Routing:** `react-router-dom` for seamless client-side navigation between the Invoice List and Invoice Detail pages.
* **State Management & Persistence:** `zustand` is used for global state management. The `persist` middleware is implemented to automatically sync the invoice data and theme preferences with the browser's `localStorage` or `IndexedDB`.
* **Form Handling:** `react-hook-form` combined with `useFieldArray` is used for highly performant, accessible form validation, specifically handling the dynamic "Item List" generation without unnecessary component re-renders.
* **Styling:** Tailwind CSS is used for utility-first styling, enabling rapid implementation of the responsive design and the global Light/Dark mode toggle.

**Component Structure:**
The UI is broken down into modular, reusable pieces:
* `components/invoices/`: Contains domain-specific components (`InvoiceForm`, `InvoiceCard`, `InvoiceDetails`, `EmptyState`, `Header`).
* `components/ui/`: Contains reusable atomic UI elements (`InputField`, `CustomSelect`, `CustomDatePicker`, `StatusBadge`).
* `store/`: Contains the Zustand store logic (`useInvoiceStore`).

## ⚖️ Trade-offs

* **LocalStorage vs. Backend Database:** To meet the requirements without adding unnecessary latency or backend configuration complexity, data is persisted using `localStorage` via Zustand. *Trade-off:* User data is locked to the specific browser/device they are using. In a production environment, this would be swapped for a database (like PostgreSQL or MongoDB) via an API layer.
* **Custom Form Elements vs. Native Inputs:** To achieve pixel-perfect fidelity with the Figma design, native `<input type="date">` and `<select>` elements were replaced with custom-built React components. *Trade-off:* Custom components require manual state management for open/close states and value selections, slightly increasing code complexity in exchange for complete design control.

## ♿ Accessibility Notes

Accessibility (a11y) was a core focus during development:
* **Semantic HTML:** Strict usage of semantic tags (`<form>`, `<button>`, `<label>`) ensuring screen readers can correctly interpret the DOM structure.
* **Native Dialogs:** The Delete Confirmation modal utilizes the native HTML5 `<dialog>` element combined with the `.showModal()` API. This natively enforces keyboard focus trapping, background dimming, and allows users to dismiss the modal using the `ESC` key without requiring bulky third-party accessibility libraries.
* **Color Contrast:** Both Light and Dark modes strictly adhere to WCAG AA color contrast guidelines.
* **Visual Error States:** Form validation errors are explicitly rendered as text below the respective inputs, ensuring users not relying on color alone can identify errors.

## ✨ Improvements Beyond Requirements

1. **Dynamic Form Item Generation:** Implemented a robust dynamic form array allowing users to infinitely add or remove specific items from their invoice list with real-time total calculations.
2. **Custom Date Picker:** Built a custom date picker dropdown that fully replaces the browser's default calendar input to maintain strict design consistency across all browsers (Safari, Chrome, Firefox).
3. **Optimized Renders:** By utilizing `react-hook-form` over controlled React states (`useState`), the complex invoice form avoids re-rendering the entire DOM tree on every single keystroke, resulting in a highly performant user experience.
   
## 🚀 Setup Instructions

### Prerequisites
- Install Node.js → https://nodejs.org/

### Installation

```bash
# Clone the repository
git clone <your-repository-url>

# Navigate into the project
cd <repository-folder>

# Install dependencies
npm install

# Start development server
npm run dev

# React + Vite

This template provides a minimal setup to get React working in Vite with HMR and some ESLint rules.

Currently, two official plugins are available:

- [@vitejs/plugin-react](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react) uses [Oxc](https://oxc.rs)
- [@vitejs/plugin-react-swc](https://github.com/vitejs/vite-plugin-react/blob/main/packages/plugin-react-swc) uses [SWC](https://swc.rs/)

## React Compiler

The React Compiler is not enabled on this template because of its impact on dev & build performances. To add it, see [this documentation](https://react.dev/learn/react-compiler/installation).

## Expanding the ESLint configuration

If you are developing a production application, we recommend using TypeScript with type-aware lint rules enabled. Check out the [TS template](https://github.com/vitejs/vite/tree/main/packages/create-vite/template-react-ts) for information on how to integrate TypeScript and [`typescript-eslint`](https://typescript-eslint.io) in your project.
