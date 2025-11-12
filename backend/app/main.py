from fastapi import FastAPI
from pydantic import BaseModel
from fastapi.middleware.cors import CORSMiddleware
from datetime import datetime

app = FastAPI()

# Permitir que o React se conecte
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Message(BaseModel):
    text: str

@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}

@app.post("/chat")
def chat(message: Message):
    user_text = message.text.lower()

    # Lógica simples do chatbot (você pode expandir isso depois)
    if "oi" in user_text or "olá" in user_text:
        response = "Olá! 😊 Eu sou o Chat Protec. Como posso te ajudar hoje?"
    elif "Como sei se um site é confiável?" in user_text:
        response = "Envolve verificar cadeado do navegador (HTTPS), endereço correto, reputação da loja e avaliações."
    elif "ajuda" in user_text:
        response = "Claro! Posso te ajudar a entender como funciona o Chat Protec."
    elif "quem é você" in user_text:
        response = "Sou um chatbot desenvolvido para o seu projeto de faculdade usando IA!"
    else:
        response = "Desculpe, ainda estou aprendendo... tente reformular sua pergunta."

    return {"reply": response}
