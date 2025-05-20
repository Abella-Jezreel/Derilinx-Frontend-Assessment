// hooks/useSurveySummaries.ts
import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useSurveySummaries = (surveyId: number, questionIds: string[]) => {
  return useQuery({
    queryKey: ["summary", surveyId],
    queryFn: async () => {
      const results = await Promise.all(
        questionIds.map(async (question_id) => {
          const res = await axiosInstance.get(`/surveys/${surveyId}/responses`, {
            params: { question_id },
          });
          return { question_id, ...res.data };
        })
      );
      return results;
    },
    enabled: !!surveyId && questionIds.length > 0,
  });
};
