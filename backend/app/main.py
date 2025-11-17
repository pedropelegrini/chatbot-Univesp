from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os

# -----------------------------
# Carregar variáveis do .env
# -----------------------------
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")

if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    print("AVISO: GEMINI_API_KEY não encontrada.")


app = FastAPI()

# CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["https://chatbot-univesp.vercel.app"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelo
class Message(BaseModel):
    message: str


@app.get("/")
def root():
    return {"message": "Backend do Chat Amigo está rodando!"}


# Rota principal
@app.post("/api/gemini")
async def chat_endpoint(msg: Message):
    try:
        model = genai.GenerativeModel("gemini-flash-latest")
        response = model.generate_content(msg.message)
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Erro: {str(e)}"}


# Alias para compatibilidade com o frontend
@app.post("/api/chat")
async def chat_endpoint_alias(msg: Message):
    return await chat_endpoint(msg)
