// --- FILE: src/pages/SurveySummary.tsx ---
import React from "react";
import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";


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

  if (surveyQuery.isLoading) return <div>Loading summary...</div>;
  if (surveyQuery.isError || !surveyQuery.data) return <div>Error loading summary.</div>;

  const survey = surveyQuery.data;

  console.log("SurveySummary data:", survey);

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{survey.title} – Summary</h1>
      <p className="text-gray-600">{survey.description}</p>
      <p className="italic text-sm text-gray-500">Summary data not available yet.</p>
    </div>
  );
}
