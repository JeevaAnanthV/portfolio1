"""
Inquiro Multimodal RAG API Demo
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="Inquiro Multimodal RAG API Demo", version="1.0.0")


class QueryRequest(BaseModel):
    query: str
    sources: Optional[List[str]] = None  # ["pdf", "web", "video"]


class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
    confidence: float
    content_types: List[str]


@app.get("/health")
async def health():
    return {"status": "healthy", "service": "inquiro-multimodal-rag"}


@app.post("/query", response_model=QueryResponse)
async def query_multimodal_rag(request: QueryRequest):
    """Query the multimodal RAG system"""
    return QueryResponse(
        answer=f"Multimodal response for: {request.query}. This demo shows how Inquiro processes queries across PDF, web, and video sources.",
        sources=["example.pdf", "example_web_page.html", "example_video.mp4"],
        confidence=0.90,
        content_types=["pdf", "web", "video"]
    )


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

