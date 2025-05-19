import { Link } from "react-router-dom";
import { useSurveys } from "../hooks/useSurveys";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";

type Survey = {
  id: string;
  title: string;
  description: string;
};

export default function SurveyList() {
  const { data, isLoading, isError } = useSurveys();

  console.log("SurveyList data:", data);

  if (isLoading) {
    return (
      <div className="grid gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div
            key={i}
            className="p-4 border rounded shadow hover:bg-gray-50 transition"
          >
            <h2 className="text-xl font-semibold">
              <Skeleton width={150} />
            </h2>
            <p className="text-gray-600">
              <Skeleton count={2} />
            </p>
          </div>
        ))}
      </div>
    );
  }
  if (isError) return <div>Error loading surveys.</div>;

  return (
    <div className="grid gap-4">
      {data.map((survey: Survey) => (
        <Link to={`/survey/${survey.id}`} key={survey.id}>
          <div className="p-4 border rounded shadow hover:bg-gray-50 transition">
            <h2 className="text-xl font-semibold">{survey.title}</h2>
            <p className="text-gray-600">{survey.description}</p>
          </div>
        </Link>
      ))}
    </div>
  );
}
