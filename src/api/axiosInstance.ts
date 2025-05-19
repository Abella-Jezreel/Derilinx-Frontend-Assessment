import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://interview.staging.derilinx.com",
  headers: {
    Authorization: "ZEWRupoZNjCRetys", // No 'Bearer'
    Accept: "application/json",
    "Content-Type": "application/json", // ✅ Ensure this is set
  },
});

export default axiosInstance;
