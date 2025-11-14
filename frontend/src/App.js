import React, { useState } from "react";
import { sendMessageToGemini } from "./api";

function App() {
  const [message, setMessage] = useState("");
  const [response, setResponse] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSend = async () => {
    if (!message.trim()) return;
    setLoading(true);
    setResponse("");

    try {
      const data = await sendMessageToGemini(message);
      setResponse(data.response);
    } catch (error) {
      setResponse("Erro ao conectar ao chatbot 😕");
    }

    setLoading(false);
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chat Amigo</h1>
      <textarea
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={40}
        style={{ padding: "10px", borderRadius: "8px" }}
      />
      <br />
      <button
        onClick={handleSend}
        style={{
          marginTop: "10px",
          padding: "10px 20px",
          borderRadius: "8px",
          backgroundColor: "#007bff",
          color: "white",
          border: "none",
          cursor: "pointer",
        }}
      >
        Enviar
      </button>
      <div style={{ marginTop: "30px", fontSize: "18px" }}>
        {loading ? <p>Processando...</p> : <p>{response}</p>}
      </div>
    </div>
  );
}

export default App;
