import { Link } from "react-router-dom";
import { FaPoll } from "react-icons/fa";

interface Props {
  id: string;
  title: string;
  description: string;
}

export default function SurveyCard({ id, title, description }: Props) {
  return (
    <Link to={`/survey/${id}`}>
      <div className="p-4 bg-white border border-gray-200 rounded-lg shadow transition-all duration-200 ease-in-out hover:shadow-md hover:scale-[1.01] hover:border-blue-300 hover:bg-blue-50 cursor-pointer">
        <h2 className="text-lg font-semibold flex items-center gap-2">
          <FaPoll className="text-blue-500" />
          {title}
        </h2>
        <p className="text-sm text-gray-600 mt-1">{description}</p>
      </div>
    </Link>
  );
}
