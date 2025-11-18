import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error("ERRO: NEXT_PUBLIC_API_URL não está definida!");
}

export const sendMessageToGemini = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/api/gemini`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

