import axios from "axios";

const API_URL = "http://127.0.0.1:8000"; // ou http://localhost:8000

export const sendMessageToGemini = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o backend:", error);
    throw error;
  }
};
