// App.tsx or main routing file
import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import AnimatedRoutes from "./AnimatedRoutes";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export default function App() {
  return (
    <>
      <Routes>
        <Route element={<AppLayout />}>
          <Route path="/*" element={<AnimatedRoutes />} />
        </Route>
      </Routes>
      <ToastContainer position="top-right" autoClose={3000} />
    </>
  );
}
