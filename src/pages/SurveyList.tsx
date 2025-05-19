import { Link } from "react-router-dom";
import { useSurveys } from "../hooks/useSurveys";

type Survey = {
  id: string;
  title: string;
  description: string;
};

export default function SurveyList() {
  const { data, isLoading, isError } = useSurveys();

  console.log("SurveyList data:", data);

  if (isLoading) return <div>Loading surveys...</div>;
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