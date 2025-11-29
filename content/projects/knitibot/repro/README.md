# KnitiBot Reproduction Demo

This directory contains a minimal reproducible demo of the KnitiBot RAG system architecture.

## Quick Start

```bash
# Build and run with Docker Compose
make reproduce

# Or manually:
docker-compose up --build
```

## Architecture

The demo includes:

- **Ingestion**: Kafka-based document ingestion pipeline
- **Vectorization**: pgvector embedding generation
- **Retriever**: PostgreSQL semantic search
- **RAG Engine**: LangChain-based context orchestration
- **API**: FastAPI endpoints for querying

## API Endpoints

Once running, access the API at `http://localhost:8000`:

- `GET /health` - Health check
- `POST /query` - Query the RAG system
- `GET /docs` - API documentation

## Requirements

- Docker & Docker Compose
- Make (optional, for convenience)

