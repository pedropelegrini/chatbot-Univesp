import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL?.replace(/\/$/, "");

export const sendMessageToGemini = async (message) => {
  if (!API_URL) {
    console.error("ERRO: NEXT_PUBLIC_API_URL não está definida!");
    return { response: "Erro de configuração: API_URL não definida." };
  }

  try {
    const response = await axios.post(`${API_URL}/api/chat`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro ao enviar mensagem para o backend:", error);
    throw error;
  }
};
