import React, { useState } from "react";
import ReactMarkdown from "react-markdown";
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
      // data.response contém o texto retornado pelo backend
      setResponse(data.response || "Resposta vazia do servidor.");
    } catch (error) {
      console.error("Erro ao chamar a API:", error);
      setResponse("Erro ao conectar ao chatbot 😕");
    }

    setLoading(false);
  };

  return (
    <div
      style={{
        textAlign: "center",
        marginTop: "40px",
        padding: "20px",
        fontFamily: "Arial, sans-serif",
      }}
    >
      <h1 style={{ marginBottom: "20px" }}>Chat Amigo</h1>

      <textarea
        aria-label="Mensagem do usuário"
        placeholder="Digite sua mensagem..."
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        rows={4}
        cols={60}
        style={{
          padding: "12px",
          borderRadius: "8px",
          border: "1px solid #ccc",
          resize: "vertical",
          fontSize: "1rem",
        }}
      />
      <br />

      <button
        onClick={handleSend}
        disabled={loading}
        style={{
          marginTop: "12px",
          padding: "10px 22px",
          borderRadius: "8px",
          backgroundColor: loading ? "#6ea0ff" : "#007bff",
          color: "white",
          border: "none",
          cursor: loading ? "default" : "pointer",
          fontSize: "1rem",
        }}
      >
        {loading ? "Enviando..." : "Enviar"}
      </button>

      <div style={{ marginTop: "30px", fontSize: "18px" }}>
        {loading ? (
          <p>Processando...</p>
        ) : (
          response && (
            <div
              style={{
                maxWidth: "900px",
                margin: "0 auto",
                textAlign: "left",
                lineHeight: "1.6",
                background: "#ffffff",
                padding: "20px",
                borderRadius: "10px",
                boxShadow: "0 4px 14px rgba(0,0,0,0.08)",
                wordBreak: "break-word",
                fontSize: "1rem",
              }}
            >
              <ReactMarkdown>{response}</ReactMarkdown>
            </div>
          )
        )}
      </div>
    </div>
  );
}

export default App;
