# Inquiro Reproduction Demo

This directory contains a minimal reproducible demo of the Inquiro multimodal RAG system.

## Quick Start

```bash
make reproduce
```

## Architecture

The demo includes:

- **Ingestion**: PDF, Web, Video source processing
- **Vectorization**: Multimodal embeddings using Google GenAI
- **Retriever**: ChromaDB vector search
- **RAG Engine**: Generative response with Google GenAI

## API Endpoints

- `GET /health` - Health check
- `POST /query` - Query the multimodal RAG system
- `GET /docs` - API documentation

