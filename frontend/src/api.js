import axios from "axios";

const BACKEND_URL = "http://127.0.0.1:8000";

export const getStatus = async () => {
  const response = await axios.get(`${BACKEND_URL}/health`);
  return response;
};
