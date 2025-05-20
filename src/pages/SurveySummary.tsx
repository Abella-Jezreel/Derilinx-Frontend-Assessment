// --- FILE: src/pages/SurveySummary.tsx ---
import { useParams } from "react-router-dom";
import { motion } from "framer-motion";
import { useSurvey } from "../hooks/useSurvey";
import SummarySkeleton from "../components/skeleton/SummarySkeleton";
import BackToListLink from "../components/layout/BackToListLink";
import Error from "../components/feedback/Error";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { useSurveySummaries } from "../hooks/useSurveySummaries";

export default function SurveySummary() {
  const { id } = useParams();
  const surveyId = parseInt(id || "", 10);
  const { data, isLoading, isError } = useSurvey(surveyId);

const questionIds = data?.questions?.map((q) => q.id) ?? [];

const { data: summaries, isLoading: loadingSummaries } = useSurveySummaries(
  surveyId,
  questionIds
);
  if (isLoading) return <SummarySkeleton />;
  if (isError || !data) return <Error />;

  return (
    <motion.div
      className="mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "tween", duration: 0.7, ease: "easeOut" }}
    >
      <BackToListLink />
      <h1 className="text-2xl font-bold">{data.title} – Summary</h1>
      <p className="text-gray-600">{data.description}</p>

      {data.questions.map((q) => {
        const stats = summaries?.find((s) => s.question_id === q.id);

        return (
          <div key={q.id} className="border-t pt-4">
            <h3 className="font-semibold text-lg text-gray-800">
              {q.question}
            </h3>
            {loadingSummaries ? (
              <p className="text-sm text-gray-500">
                <Skeleton width={140} height={14} />
              </p>
            ) : stats?.total_votes === 0 ? (
              <p className="text-sm italic text-gray-400">No responses yet.</p>
            ) : (
              <div className="mt-2 space-y-4">
                {Object.entries(stats.option_totals).map(([option, count]) => {
                  const percentage = stats.percentages[option];

                  if (!option?.trim()) return null;

                  return (
                    <div key={option}>
                      <div className="flex justify-between text-sm font-medium mb-1">
                        <span>{option}</span>
                        <span className="text-gray-600">
                          {count} votes ({percentage}%)
                        </span>
                      </div>
                      <div className="w-full bg-gray-200 rounded-full h-2">
                        <motion.div
                          className="bg-blue-500 h-2 rounded-full"
                          initial={{ width: 0 }}
                          animate={{ width: `${percentage}%` }}
                          transition={{ duration: 0.8, ease: "easeOut" }}
                        />
                      </div>
                    </div>
                  );
                })}
              </div>
            )}
          </div>
        );
      })}
    </motion.div>
  );
}
