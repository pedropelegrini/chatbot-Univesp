# backend/app/main.py
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import Optional
from datetime import datetime
from rapidfuzz import process, fuzz
from fastapi.middleware.cors import CORSMiddleware

# Base de perguntas e respostas (FAQ)
FAQS = [
    {
        "id": 1,
        "question": "Como criar uma senha forte?",
        "answer": "Use 12+ caracteres, misture letras maiúsculas, minúsculas, números e símbolos. Não reutilize senhas."
    },
    {
        "id": 2,
        "question": "Recebi ligação pedindo meu banco, é golpe?",
        "answer": "Bancos nunca pedem senha por ligação. Desconfie e ligue para o número oficial do banco."
    },
    {
        "id": 3,
        "question": "Como eu atualizo o meu WhatsApp?",
        "answer": "Abra a loja de aplicativos (Google Play/App Store) e procure WhatsApp, toque em atualizar."
    },
]

# Função para encontrar a melhor correspondência de pergunta
def find_best_faq(query: str, limit: int = 1):
    choices = {f["question"]: f for f in FAQS}
    results = process.extract(query, choices.keys(), scorer=fuzz.WRatio, limit=limit)
    if not results:
        return None, 0
    best_question, score, _ = results[0]
    return choices[best_question], score

# Inicialização do app FastAPI
app = FastAPI(title="ChatBot Proteção (MVP)")

# Configuração do CORS para permitir o frontend React
app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://localhost:3000", "http://127.0.0.1:3000"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Modelos de requisição e resposta
class ChatRequest(BaseModel):
    message: str
    user_id: Optional[int] = None

class ChatResponse(BaseModel):
    reply: str
    source: str
    score: Optional[float] = None

# Endpoint de verificação de saúde
@app.get("/health")
def health():
    return {"status": "ok", "time": datetime.utcnow().isoformat()}

# Endpoint principal de chat
@app.post("/api/chat", response_model=ChatResponse)
def chat(req: ChatRequest):
    query = req.message.strip()
    if len(query) == 0:
        raise HTTPException(status_code=400, detail="Mensagem vazia")

    suspicious_keywords = [
        "senha", "código", "pix", "depósito", "transferência", "telegram", "instalar", "clique aqui"
    ]
    lowered = query.lower()

    if any(kw in lowered for kw in suspicious_keywords):
        faq, score = find_best_faq(query)
        reply = (
            faq["answer"]
            if faq
            else "Cuidado: isso pode ser um golpe. Nunca compartilhe senhas ou códigos. Contate um familiar ou o banco por canais oficiais."
        )
        source = "faq" if faq else "heuristic"
        return ChatResponse(reply=reply, source=source, score=score)

    faq, score = find_best_faq(query)
    if faq and score > 50:
        return ChatResponse(reply=faq["answer"], source="faq", score=score)

    fallback = (
        "Desculpe — não tenho uma resposta pronta. Aqui vão dicas gerais:\n"
        "1) Não clique em links inesperados.\n"
        "2) Nunca compartilhe senhas ou códigos.\n"
        "3) Se for sobre dinheiro, confirme com um familiar ou instituição por telefone oficial."
    )
    return ChatResponse(reply=fallback, source="fallback", score=score)
