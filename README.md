# 🧪 Survey App – Frontend Assessment

This is a lightweight, responsive survey application built with **React**, **TypeScript**, and **Vite** as part of a frontend technical assessment for Derilinx.

The app allows users to:
- View a list of surveys
- Answer surveys dynamically (single or multiple choice)
- Submit responses
- View a clear summary of submitted answers

---

## 🚀 Tech Stack

- **React + TypeScript** – UI and type safety
- **Vite** – Fast build tool and dev server
- **React Router** – Client-side routing
- **React Query** – Data fetching and caching
- **Axios** – API calls
- **Tailwind CSS** – Utility-first styling (v3.3.5 for stability)
<!-- OR -->
<!-- - **MUI (Material UI)** – Component-based styling -->

---

## 📂 Project Structure

src/
│
├── api/            # Handles API requests using Axios
├── components/     # Shared, reusable UI components (e.g. Card, Loader, QuestionForm)
├── context/        # React Contexts for shared state (e.g. survey answers)
├── hooks/          # Custom React Query hooks and other reusable hooks
├── pages/          # Top-level route components (Survey List, Survey Detail, Summary)
├── types/          # TypeScript interfaces and type definitions
│
├── AnimatedRoutes.tsx         # Main app with all route definitions
└── main.tsx        # Application entry point with React Query & Router providers
