import { Link } from "react-router-dom";
import { FaPoll } from "react-icons/fa";
import { motion } from "framer-motion";

interface Props {
  id: string;
  title: string;
  description: string;
  index?: number | undefined; // Optional index prop for animation delay
}

export default function SurveyCard({ id, title, description, index }: Props) {
  return (
    <Link to={`/survey/${id}`}>
      <motion.div
        initial={{ opacity: 0, y: 30 }}
        animate={{ opacity: 1, y: 0 }}
        whileHover={{ scale: 1.02 }}
        transition={{
          type: "tween",
          ease: "easeOut",
          duration: 0.8,
          delay: index ? index * 0.05 : 0,
        }}
        className="p-4 bg-white border border-gray-200 rounded-lg shadow-md hover:border-blue-400 hover:bg-blue-50 cursor-pointer"
      >
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaPoll className="text-blue-500" />
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </motion.div>
    </Link>
  );
}
