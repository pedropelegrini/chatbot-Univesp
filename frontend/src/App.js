import React, { useEffect, useState } from "react";
import { getStatus } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getStatus()
      .then(response => {
        console.log("Backend conectado:", response.data);
        setMessage(`Backend conectado: ${response.data.status} (${response.data.time})`);
      })
      .catch(error => {
        console.error("Erro ao conectar com o backend:", error);
        setMessage("Erro ao conectar com o backend");
      });
  }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Chat Protec</h1>
      <p>{message ? message : "Conectando ao backend..."}</p>
    </div>
  );
}

export default App;
