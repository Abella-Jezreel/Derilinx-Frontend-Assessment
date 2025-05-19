import { useQuery } from "@tanstack/react-query";
import axiosInstance from "../api/axiosInstance";

export const useSurvey = (surveyId: number) =>
  useQuery({
    queryKey: ["survey", surveyId],
    queryFn: async () => {
      const res = await axiosInstance.get(`/surveys/${surveyId}`);
      return res.data;
    },
    enabled: !!surveyId,
  });
