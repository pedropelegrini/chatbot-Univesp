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
    allow_origins=[
        "http://localhost:3000",
        "https://chatbot-univesp.vercel.app",
        "https://chatbot-univesp-pedropelegrinis-projects.vercel.app",
        "https://chatbot-univesp-x3.onrender.com"
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
 )

# Modelo
class Message(BaseModel):
    message: str

# ROTA OPTIONS GENÉRICA
@app.options("/{full_path:path}")
async def options_handler(full_path: str):
    return {}

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



