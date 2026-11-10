# LPU Faculty Feedback & Course Evaluation Portal

A modern, light, and minimal **Academic Feedback & Evaluation Portal** crafted for students of **Lovely Professional University (LPU)**. Designed with a clean aesthetic, intuitive rating metrics, and student privacy guarantees.

![License](https://img.shields.io/badge/license-MIT-blue.svg)
![React](https://img.shields.io/badge/React-18.3-61dafb.svg?logo=react)
![TypeScript](https://img.shields.io/badge/TypeScript-5.6-3178c6.svg?logo=typescript)
![TailwindCSS](https://img.shields.io/badge/TailwindCSS-3.4-38bdf8.svg?logo=tailwindcss)
![Vite](https://img.shields.io/badge/Vite-5.4-646cff.svg?logo=vite)

---

## 🌟 Key Features

* **Authentic LPU Student Context**:
  * Formatted with Registration Number (e.g. `12204892`), Section (`K22DF`), Roll Number (`RK22DFB32`), and School of Computer Science & Engineering (Block 34).
  * Direct linkage to End-Term Examination Hall Ticket clearance and Continuous Assessment (CA) grades.
* **Minimalist Light Design**:
  * Airy layout, soft slate backgrounds (`#f8fafc`), pure white cards, and accessible typography.
  * Subtle LPU university warm accents (`#ea580c` / `#f97316`) and emerald completion status badges.
* **Simple & Intuitive Evaluation**:
  * Discrete rating parameters for Faculty Teaching Quality and Course & Lab Infrastructure.
  * 1-to-5 star/pill interactive rating controls with instant textual descriptions.
  * Quick-tap impression tags (`⏰ Punctual`, `💡 Doubt Solver`, `📝 UMS Notes`, etc.).
* **100% Student Privacy & Anonymity**:
  * Decouples student identity from feedback to prevent retaliatory bias.
  * Aggregated scores are only compiled after end-term semester grades are sealed on UMS.
* **Autosave Drafts**:
  * Never lose responses—evaluations automatically save locally as drafts.
* **Printable Clearance Slip**:
  * Generates an official university-formatted Course Evaluation Clearance Slip with verification hash and print/PDF support.

---

## 🛠️ Tech Stack

* **Framework**: [React 18](https://react.dev/) + [TypeScript](https://www.typescriptlang.org/)
* **Build Tool**: [Vite 5](https://vitejs.dev/)
* **Styling**: [Tailwind CSS 3](https://tailwindcss.com/)
* **Icons**: [Lucide React](https://lucide.dev/)
* **Effects**: [Canvas Confetti](https://www.npmjs.com/package/canvas-confetti)

---

## 🚀 Getting Started

### Prerequisites

* [Node.js](https://nodejs.org/) (v18 or higher recommended)
* `npm` or `pnpm`

### Installation

1. Clone this repository:
   ```bash
   git clone https://github.com/akash-920/lpu-faculty-feedback-portal.git
   cd lpu-faculty-feedback-portal
   ```

2. Install dependencies:
   ```bash
   npm install
   ```

3. Launch the development server:
   ```bash
   npm run dev
   ```

4. Open your browser and navigate to:
   ```
   http://localhost:5173/
   ```

### Building for Production

```bash
npm run build
```
Generates production-ready static assets in the `dist/` directory.

---

## 📄 License

This project is licensed under the MIT License.
