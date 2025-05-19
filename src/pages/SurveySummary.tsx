// --- FILE: src/pages/SurveySummary.tsx ---
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import Error from "../components/Error";
import { Link } from "react-router-dom";
import Skeleton from "react-loading-skeleton";

import "react-loading-skeleton/dist/skeleton.css";
import { motion } from "framer-motion";

interface Question {
  id: string;
  question: string;
  options: string[];
  type: "single_choice" | "multiple_choice";
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function SurveySummary() {
  const { id } = useParams();
  const surveyId = parseInt(id || "", 10);

  const surveyQuery = useQuery<Survey>({
    queryKey: ["survey", surveyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/surveys/${surveyId}`);
      return res.data;
    },
    enabled: !!surveyId,
  });

  if (surveyQuery.isLoading) {
    return (
      <motion.div
        className="max-w-3xl mx-auto p-4 space-y-6"
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
      >
        <h1 className="text-2xl font-bold">
          <Skeleton width={200} />
        </h1>
        <p className="text-gray-600">
          <Skeleton count={2} />
        </p>

        {Array.from({ length: 3 }).map((_, idx) => (
          <div key={idx} className="border-b pb-4 mb-4">
            <h2 className="font-semibold mb-2">
              <Skeleton width={`80%`} />
            </h2>
            <ul className="space-y-1">
              {Array.from({ length: 4 }).map((_, i) => (
                <li key={i} className="flex justify-between">
                  <Skeleton width="40%" />
                  <Skeleton width="20%" />
                </li>
              ))}
            </ul>
          </div>
        ))}
      </motion.div>
    );
  }

  if (surveyQuery.isError || !surveyQuery.data) return <Error />;

  const survey = surveyQuery.data;

  console.log("SurveySummary data:", survey);

  return (
    <motion.div
      className="mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ duration: 0.5, type: "spring", stiffness: 60 }}
    >
      <Link
        to="/surveys"
        className="inline-flex items-center text-blue-600 hover:text-blue-800 text-sm font-medium"
      >
        <svg
          className="w-4 h-4 mr-1"
          fill="none"
          stroke="currentColor"
          strokeWidth={2}
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15 19l-7-7 7-7"
          />
        </svg>
        Back to Survey List
      </Link>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">
          {survey.title} – Summary
        </h1>
        <p className="text-gray-500 mt-1">{survey.description}</p>
      </div>

      <div className="rounded-md bg-yellow-50 border border-yellow-300 text-yellow-800 p-4 text-sm">
        <strong>Note:</strong> Summary data not available yet. Please check
        again later.
      </div>
    </motion.div>
  );
}
