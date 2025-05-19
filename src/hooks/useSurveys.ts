import { useQuery } from "@tanstack/react-query";
import { fetchSurveys } from "../api/surveys";

export const useSurveys = (offset = 0, limit = 300) => {
  return useQuery({
    queryKey: ["surveys", offset, limit],
    queryFn: () => fetchSurveys(offset, limit),
  });
};
