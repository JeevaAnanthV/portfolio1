"""
KnitiBot RAG API Demo - Minimal FastAPI server
"""
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List, Optional

app = FastAPI(title="KnitiBot RAG API Demo", version="1.0.0")


class QueryRequest(BaseModel):
    query: str
    top_k: Optional[int] = 5


class QueryResponse(BaseModel):
    answer: str
    sources: List[str]
    confidence: float


@app.get("/health")
async def health():
    """Health check endpoint"""
    return {"status": "healthy", "service": "knitibot-rag-demo"}


@app.post("/query", response_model=QueryResponse)
async def query_rag(request: QueryRequest):
    """
    Query the RAG system with a natural language question.
    
    This is a demo endpoint that returns synthetic examples.
    In production, this would query the actual RAG pipeline.
    """
    # Synthetic response for demo purposes
    return QueryResponse(
        answer=f"Based on the knowledge base, here's information about: {request.query}. This is a demo response showing how the RAG system would process your query.",
        sources=[
            "internal_docs/knowledge_base.md",
            "internal_docs/technical_specs.pdf"
        ],
        confidence=0.85
    )


@app.get("/")
async def root():
    """Root endpoint with API information"""
    return {
        "service": "KnitiBot RAG API Demo",
        "version": "1.0.0",
        "endpoints": {
            "health": "/health",
            "query": "/query",
            "docs": "/docs"
        }
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(app, host="0.0.0.0", port=8000)

