import axios from "axios";

// O código verifica se a variável de ambiente está definida.
// Se estiver no Vercel, usa a URL do Render.
// Se estiver em desenvolvimento local, usa a URL local (http://localhost:8000 ).
const API_URL = "https://chatbot-univesp-x3.onrender.com";

export const sendMessageToGemini = async (message ) => {
  try {
    const response = await axios.post(`${API_URL}/chat`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o backend:", error);
    throw error;
  }
};
