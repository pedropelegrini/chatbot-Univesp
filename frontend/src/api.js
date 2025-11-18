// api.js
import axios from "axios";

// REMOVA O process.env.NEXT_PUBLIC_API_URL E USE A URL DO RENDER DIRETAMENTE
const API_URL = "https://chatbot-univesp-x3.onrender.com";

export const sendMessageToGemini = async (message  ) => {
  try {
    const response = await axios.post(`${API_URL}/api/gemini`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o backend:", error);
    throw error;
  }
};
