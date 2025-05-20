import { useParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useSurvey } from "../hooks/useSurvey";
import { toast } from "react-toastify";
import QuestionBlock from "../components/feedback/QuestionBlock";
import SurveySkeleton from "../components/skeleton/SurveySkeleton";
import Error from "../components/feedback/Error";
import axiosInstance from "../api/axiosInstance";
import Modal from "../components/ui/Modal";

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
  const [showModal, setShowModal] = useState(false);

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
    const unanswered = Object.entries(answers).filter(([_, answer]) => {
      return Array.isArray(answer) ? answer.length === 0 : answer === "";
    });

    if (unanswered.length > 0) {
      setShowModal(true);
      return;
    }

    const payload = {
      responses: Object.entries(answers).map(([question_id, answer]) => ({
        question_id,
        selected_option: Array.isArray(answer) ? answer.join(", ") : answer,
      })),
    };

    try {
      await axiosInstance.post(`/surveys/${surveyId}/responses`, payload);
      toast.success("Survey submitted successfully!");
      navigate(`/summary/${surveyId}`);
    } catch (error) {
      console.error("Error submitting survey:", error);
      toast.error("Failed to submit. Try again.");
    }
  };

  if (isLoading) return <SurveySkeleton />;
  if (isError || !data) return <Error />;

  return (
    <>
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
          className="w-full py-3 px-6 text-white font-semibold rounded-lg bg-gradient-to-r from-blue-600 to-blue-500 shadow-md hover:shadow-xl hover:from-blue-700 hover:to-blue-600 transition-all duration-300 transform hover:-translate-y-0.5 focus:outline-none focus:ring-2 focus:ring-blue-300"
        >
          Submit Survey
        </button>
      </div>

      {/* Modal placed here inside the fragment */}
      {showModal && (
        <Modal
          isOpen={showModal}
          onClose={() => setShowModal(false)}
          title="Incomplete Survey"
          message="Please answer all questions before submitting."
        />
      )}
    </>
  );
}
