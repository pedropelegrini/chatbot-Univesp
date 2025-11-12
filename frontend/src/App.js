import React, { useEffect, useState } from "react";
import { getStatus } from "./api";

function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    getStatus()
      .then(response => {
        setMessage(response.data.message);
      })
      .catch(error => {
        console.error("Erro ao conectar com o backend:", error);
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
