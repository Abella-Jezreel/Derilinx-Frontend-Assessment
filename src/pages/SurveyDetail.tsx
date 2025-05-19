// --- FILE: src/pages/SurveyDetail.tsx ---
import { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";
import Error from "../components/Error";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import { AnimatePresence, motion } from "framer-motion";

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

  if (isLoading)
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
  if (isError || !data) return <Error />;

  return (
    <div className="mx-auto p-6 bg-white shadow-lg rounded-lg space-y-6">
      <button
        onClick={() => navigate("/surveys")}
        className="text-blue-600 hover:underline flex items-center gap-1 text-sm"
      >
        <svg
          className="w-4 h-4"
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
      </button>

      <div>
        <h1 className="text-2xl font-bold text-gray-800">{data.title}</h1>
        <p className="text-gray-500 mt-1">{data.description}</p>
      </div>

      <AnimatePresence>
        {data.questions.map((q, idx) => (
          <motion.div
            key={q.id}
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: 30 }}
            transition={{
              duration: 0.4,
              delay: idx * 0.08,
              type: "spring",
              stiffness: 60,
            }}
            className="space-y-2 border-t pt-4"
          >
            <h2 className="font-semibold text-lg text-gray-700">
              {q.question}
            </h2>
            {q.type === "single_choice" && (
              <div className="space-y-1">
                {q.options.map((option, oidx) => (
                  <motion.label
                    key={option}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + oidx * 0.05 }}
                    className="flex items-center gap-2 cursor-pointer text-gray-600"
                  >
                    <input
                      type="radio"
                      name={q.id}
                      value={option}
                      checked={answers[q.id] === option}
                      onChange={(e) =>
                        setAnswers((prev) => ({
                          ...prev,
                          [q.id]: e.target.value,
                        }))
                      }
                      className="accent-blue-600 w-4 h-4"
                    />
                    {option}
                  </motion.label>
                ))}
              </div>
            )}

            {q.type === "multiple_choice" && (
              <div className="space-y-1">
                {q.options.map((option, oidx) => (
                  <motion.label
                    key={option}
                    initial={{ opacity: 0, x: 20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3, delay: 0.1 + oidx * 0.05 }}
                    className="flex items-center gap-2 cursor-pointer text-gray-600"
                  >
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
                      className="accent-blue-600 w-4 h-4"
                    />
                    {option}
                  </motion.label>
                ))}
              </div>
            )}
          </motion.div>
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
