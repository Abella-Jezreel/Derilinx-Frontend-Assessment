# 🧪 Survey App – Frontend Assessment

A modern, responsive survey application built with **React**, **TypeScript**, and **Vite**.  
This project was developed as part of the frontend technical assessment for **Derilinx**.

---

## 🎯 Features

- ✅ View a dynamic list of available surveys
- ✅ Answer survey questions (single & multiple choice)
- ✅ Submit survey responses via API
- ✅ View a user-friendly summary of all submitted answers
- ✅ Fully responsive, with smooth animations and error handling

---

## ⚙️ Tech Stack

| Tool               | Role & Functionality                                      |
|--------------------|-----------------------------------------------------------|
| **React + TypeScript** | Component-based architecture with strong type safety  |
| **Vite**            | Lightning-fast development server and build tool         |
| **React Router**    | Declarative single-page app (SPA) routing                |
| **React Query**     | Server state management with caching and background sync |
| **Axios**           | Promise-based HTTP client for API communication          |
| **Tailwind CSS**    | Utility-first styling for rapid UI development (`v3.3.5`)|
| **Framer Motion**   | Smooth animations for UI transitions and interactions    |


---

## 📁 Project Structure

src/
├── api/ # Axios instances and API methods
├── components/ # Reusable UI components (Card, Skeleton, Modal, etc.)
├── context/ # React Context (if applicable)
├── hooks/ # Custom hooks (e.g. useSurvey, useSurveys)
├── pages/ # Route components: SurveyList, SurveyDetail, SurveySummary
├── types/ # TypeScript type definitions
├── AnimatedRoutes.tsx # Handles route transitions with Framer Motion
└── main.tsx # Entry point: Providers and app bootstrap


---

## 📦 Getting Started

```bash
# 1. Install dependencies
npm install

# 2. Run the dev server
npm run dev

# 3. Visit
http://localhost:5173
