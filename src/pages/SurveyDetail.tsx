import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSurvey } from "../hooks/useSurvey";
import QuestionBlock from "../components/QuestionBlock";
import SurveySkeleton from "../components/SurveySkeleton";
import Error from "../components/Error";
import axiosInstance from "../api/axiosInstance";

type Question = {
  id: string;
  question: string;
  type: "single_choice" | "multiple_choice";
  options: string[];
};

type Survey = {
  id: number;
  title: string;
  description: string;
  questions: Question[];
};

export default function SurveyDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const surveyId = parseInt(id || "", 10);
  const { data, isLoading, isError } = useSurvey(surveyId) as {
    data?: Survey;
    isLoading: boolean;
    isError: boolean;
  };
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
        .filter(([val]) =>
          Array.isArray(val) ? val.length > 0 : val !== ""
        )
        .map(([question_id, answer]) => ({
          question_id,
          selected_option: Array.isArray(answer) ? answer.join(", ") : answer,
        })),
    };

    try {
      await axiosInstance.post(`/surveys/${surveyId}/responses`, payload);
      navigate(`/summary/${surveyId}`);
    } catch (error) {
      console.error("Error submitting survey:", error);
      alert("Failed to submit. Try again.");
    }
  };

  if (isLoading) return <SurveySkeleton />;
  if (isError || !data) return <Error />;

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={() => navigate("/surveys")}
        className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
      >
        ← Back to Survey List
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
        <p className="text-gray-500 mt-1">{data.description}</p>
      </div>

      <AnimatePresence>
        {data.questions.map((q, idx) => (
          <QuestionBlock
            key={q.id}
            q={q}
            index={idx}
            answers={answers}
            setAnswers={setAnswers}
            handleCheckboxChange={handleCheckboxChange}
          />
        ))}
      </AnimatePresence>

      <button
        onClick={handleSubmit}
        className="w-full mt-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 transition font-semibold"
      >
        Submit Survey
      </button>
    </div>
  );
}
