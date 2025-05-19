// App.tsx or main routing file
import { Route, Routes } from "react-router-dom";
import AppLayout from "./AppLayout";
import AnimatedRoutes from "./AnimatedRoutes";

export default function App() {
  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/*" element={<AnimatedRoutes />} />
      </Route>
    </Routes>
  );
}
