from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel
import google.generativeai as genai
import os

# -----------------------------
# Carregar variáveis do .env
# -----------------------------
GEMINI_API_KEY = os.getenv("GEMINI_API_KEY")



# Configurar a API do Gemini
if GEMINI_API_KEY:
    genai.configure(api_key=GEMINI_API_KEY)
else:
    # Esta mensagem aparecerá nos logs do Render se a chave não for configurada.
    print("AVISO: GEMINI_API_KEY não encontrada. O endpoint /chat pode falhar.")

# -----------------------------
# Inicialização do FastAPI
# -----------------------------
app = FastAPI()

# Permitir requisições do frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",  # Permite o desenvolvimento local
        "https://chatbot-univesp-pedropelegrinis-projects.vercel.app", # Permite o frontend no Vercel
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
 )
# -----------------------------

# Modelo de entrada
# -----------------------------
class Message(BaseModel):
    message: str

# -----------------------------
# Rotas
# -----------------------------
@app.get("/")
def root():
    return {"message": "Backend do Chat Amigo está rodando!"}

@app.post("/api/gemini")
async def chat_endpoint(msg: Message):
    try:
        # Criar o modelo Gemini
        model = genai.GenerativeModel("gemini-flash-latest")

        # Gerar resposta
        response = model.generate_content(msg.message)

        # Retornar texto da resposta
        return {"response": response.text}
    except Exception as e:
        return {"response": f"Erro ao processar a mensagem: {str(e)}"}
