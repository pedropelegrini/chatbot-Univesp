import axios from "axios";

const API_URL = process.env.NEXT_PUBLIC_API_URL;

if (!API_URL) {
  console.error("ERRO: NEXT_PUBLIC_API_URL não está definida!");
}

export const sendMessageToGemini = async (message) => {
  try {
    const response = await axios.post(`${API_URL}/sua-rota`, { message });
    return response.data;
  } catch (error) {
    console.error("Erro na requisição:", error);
    throw error;
  }
};

if __name__ == "__main__":
    port = int(os.environ.get("PORT", 8000))  # Render define PORT automaticamente
    uvicorn.run("main:app", host="0.0.0.0", port=port)