import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSurvey } from "../hooks/useSurvey";
import SummarySkeleton from "../components/SummarySkeleton";
import BackToListLink from "../components/BackToListLink";
import Error from "../components/Error";

export default function SurveySummary() {
  const { id } = useParams();
  const surveyId = parseInt(id || "", 10);
  const { data, isLoading, isError } = useSurvey(surveyId);

  if (isLoading) return <SummarySkeleton />;
  if (isError || !data) return <Error />;

  return (
    <motion.div
      className="mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
    >
      <BackToListLink />
      <h1 className="text-2xl font-bold">{data.title} – Summary</h1>
      <p className="text-gray-600">{data.description}</p>
      <p className="text-sm text-yellow-800 bg-yellow-50 border border-yellow-300 p-4 rounded">
        <strong>Note:</strong> Summary data not available yet.
      </p>
    </motion.div>
  );
}
