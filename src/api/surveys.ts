import axiosInstance from "./axiosInstance";

export const fetchSurveys = async (offset = 0, limit = 300) => {
  const response = await axiosInstance.get("/surveys", {
    params: { offset, limit },
  });
  return response.data;
};
