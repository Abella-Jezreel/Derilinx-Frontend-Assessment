// --- FILE: src/pages/SurveySummary.tsx ---
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

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
      <div className="max-w-3xl mx-auto p-4 space-y-6">
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
      </div>
    );
  }
  
  if (surveyQuery.isError || !surveyQuery.data)
    return <div>Error loading summary.</div>;

  const survey = surveyQuery.data;

  console.log("SurveySummary data:", survey);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{survey.title} – Summary</h1>
      <p className="text-gray-600">{survey.description}</p>
      <p className="italic text-sm text-gray-500">
        Summary data not available yet.
      </p>
    </div>
  );
}
