// src/components/QuestionBlock.tsx
import { motion } from "framer-motion";

interface QuestionProps {
  q: {
    id: string;
    question: string;
    type: "single_choice" | "multiple_choice";
    options: string[];
  };
  answers: Record<string, string | string[]>;
  setAnswers: React.Dispatch<
    React.SetStateAction<Record<string, string | string[]>>
  >;
  handleCheckboxChange: (qId: string, opt: string, checked: boolean) => void;
  index: number;
}

export default function QuestionBlock({
  q,
  answers,
  setAnswers,
  handleCheckboxChange,
}: QuestionProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: 30 }}
      transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
      className="space-y-2 border-t pt-4"
    >
      <h2 className="font-semibold text-lg text-gray-700">{q.question}</h2>

      {(q.type === "single_choice" || q.type === "multiple_choice") && (
        <div className="space-y-1">
          {q.options.map((option) => (
            <motion.label
              key={option}
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ type: "tween", duration: 0.35, ease: "easeOut" }}
              className="flex items-center gap-2 cursor-pointer text-gray-600"
            >
              <input
                type={q.type === "single_choice" ? "radio" : "checkbox"}
                name={q.id}
                value={option}
                checked={
                  q.type === "single_choice"
                    ? answers[q.id] === option
                    : Array.isArray(answers[q.id]) &&
                      (answers[q.id] as string[]).includes(option)
                }
                onChange={(e) => {
                  if (q.type === "single_choice") {
                    setAnswers((prev) => ({ ...prev, [q.id]: e.target.value }));
                  } else {
                    handleCheckboxChange(q.id, option, e.target.checked);
                  }
                }}
                className="accent-blue-600 w-4 h-4"
              />
              {option}
            </motion.label>
          ))}
          <p className="text-sm text-gray-500 italic py-2">
            {q.type === "single_choice"
              ? "Select one option"
              : "You may select multiple options"}
          </p>
        </div>
      )}
    </motion.div>
  );
}
