import { Suspense, lazy } from "react";
import { Route, Routes, Navigate, useLocation } from "react-router-dom";
import { AnimatePresence } from "framer-motion";
import RouteFallback from "./components/RouteFallback";

const SurveyList = lazy(() => import("./pages/SurveyList"));
const SurveyDetail = lazy(() => import("./pages/SurveyDetail"));
const SurveySummary = lazy(() => import("./pages/SurveySummary"));

const AnimatedRoutes = () => {
  const location = useLocation();

  return (
    <AnimatePresence mode="wait">
      <div className="max-w-3xl mx-auto px-4 py-6">
        <Routes location={location} key={location.pathname}>
          <Route path="/" element={<Navigate to="/surveys" replace />} />
          <Route
            path="/surveys"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SurveyList />
              </Suspense>
            }
          />
          <Route
            path="/survey/:id"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SurveyDetail />
              </Suspense>
            }
          />
          <Route
            path="/summary/:id"
            element={
              <Suspense fallback={<RouteFallback />}>
                <SurveySummary />
              </Suspense>
            }
          />
        </Routes>
      </div>
    </AnimatePresence>
  );
};

export default AnimatedRoutes;
