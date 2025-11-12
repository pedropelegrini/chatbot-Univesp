import React, { useState } from "react";
import axios from "axios";

const API_URL = "http://127.0.0.1:8000";

function App() {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Olá! Eu sou o Chat Protec. Como posso te ajudar hoje?" }
  ]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMsg = { sender: "user", text: input };
    setMessages([...messages, userMsg]);
    setInput("");

    try {
      const response = await axios.post(`${API_URL}/chat`, { text: input });
      const botMsg = { sender: "bot", text: response.data.reply };
      setMessages(prev => [...prev, botMsg]);
    } catch (error) {
      setMessages(prev => [...prev, { sender: "bot", text: "Erro ao conectar com o servidor." }]);
      console.error(error);
    }
  };

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chat Protec</h1>
      <div
        style={{
          margin: "20px auto",
          width: "400px",
          height: "300px",
          border: "1px solid #ccc",
          borderRadius: "10px",
          padding: "10px",
          overflowY: "auto",
          textAlign: "left"
        }}
      >
        {messages.map((msg, i) => (
          <p key={i} style={{ textAlign: msg.sender === "user" ? "right" : "left" }}>
            <b>{msg.sender === "user" ? "Você: " : "Chat Protec: "}</b>
            {msg.text}
          </p>
        ))}
      </div>
      <input
        type="text"
        value={input}
        onChange={e => setInput(e.target.value)}
        placeholder="Digite sua mensagem..."
        style={{ width: "300px", padding: "10px", borderRadius: "5px" }}
      />
      <button onClick={sendMessage} style={{ marginLeft: "10px", padding: "10px" }}>
        Enviar
      </button>
    </div>
  );
}

export default App;
