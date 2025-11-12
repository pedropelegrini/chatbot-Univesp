import axios from "axios";

const API_URL = `http://${window.location.hostname}:8000`; // usa o host do navegador

export const getStatus = async () => {
  try {
    const response = await axios.get(`${API_URL}/health`);
    console.log("Backend conectado:", response.data);
    return response;
  } catch (error) {
    console.error("Erro ao conectar com o backend:", error);
    throw error;
  }
};

