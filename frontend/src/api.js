import axios from "axios";

const API_URL = "https://chatbot-univesp-x3.onrender.com";

export const sendMessageToGemini = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o backend:", error);
    throw error;
  }
};
