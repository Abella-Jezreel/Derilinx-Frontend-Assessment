// --- FILE: src/pages/SurveyDetail.tsx ---
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

interface Question {
  id: string;
  question: string;
  type: "single_choice" | "multiple_choice";
  options: string[];
}

interface Survey {
  id: number;
  title: string;
  description: string;
  questions: Question[];
}

export default function SurveyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const surveyId = parseInt(id || "", 10);

  const { data, isLoading, isError } = useQuery<Survey>({
    queryKey: ["survey", surveyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/surveys/${surveyId}`);
      return res.data;
    },
    enabled: !!surveyId,
  });

  const [answers, setAnswers] = useState<Record<string, string | string[]>>({});

  useEffect(() => {
    if (data) {
      const init: Record<string, string | string[]> = {};
      data.questions.forEach((q) => {
        init[q.id] = q.type === "multiple_choice" ? [] : "";
      });
      setAnswers(init);
    }
  }, [data]);

  const handleCheckboxChange = (
    questionId: string,
    option: string,
    isChecked: boolean
  ) => {
    const current = (answers[questionId] as string[]) || [];
    const updated = isChecked
      ? [...current, option]
      : current.filter((item) => item !== option);
    setAnswers((prev) => ({ ...prev, [questionId]: updated }));
  };

  const handleSubmit = async () => {
    const payload = {
      responses: Object.entries(answers)
        .filter(([value]) =>
          Array.isArray(value) ? value.length > 0 : value !== ""
        )
        .map(([question_id, answer]) => ({
          question_id,
          selected_option: Array.isArray(answer) ? answer.join(", ") : answer,
        })),
    };

    console.log("Submitting:", payload); // optional
    console.log("Payload being submitted:", JSON.stringify(payload, null, 2));

    try {
      await axiosInstance.post(`/surveys/${surveyId}/responses`, payload);
      navigate(`/summary/${surveyId}`);
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit. Try again.");
    }
  };

  if (isLoading) return <div>Loading survey...</div>;
  if (isError || !data) return <div>Error loading survey.</div>;

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <h1 className="text-2xl font-bold">{data.title}</h1>
      <p className="text-gray-600">{data.description}</p>

      {data.questions.map((q) => (
        <div key={q.id} className="space-y-2">
          <h2 className="font-semibold">{q.question}</h2>
          {q.type === "single_choice" && (
            <div className="space-y-1">
              {q.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="radio"
                    name={q.id}
                    value={option}
                    checked={answers[q.id] === option}
                    onChange={(e) =>
                      setAnswers((prev) => ({
                        ...prev,
                        [q.id]: e.target.value, // this will exactly match the string
                      }))
                    }
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}

          {q.type === "multiple_choice" && (
            <div className="space-y-1">
              {q.options.map((option) => (
                <label key={option} className="block">
                  <input
                    type="checkbox"
                    value={option}
                    checked={(Array.isArray(answers[q.id])
                      ? answers[q.id]
                      : []
                    ).includes(option)}
                    onChange={(e) =>
                      handleCheckboxChange(q.id, option, e.target.checked)
                    }
                    className="mr-2"
                  />
                  {option}
                </label>
              ))}
            </div>
          )}
        </div>
      ))}

      <button
        onClick={handleSubmit}
        className="px-6 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
      >
        Submit
      </button>
    </div>
  );
}
