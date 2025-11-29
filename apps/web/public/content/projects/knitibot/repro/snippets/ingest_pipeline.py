# ingest_pipeline.py
from kafka import KafkaProducer
import json

producer = KafkaProducer(bootstrap_servers=['localhost:9092'])

def ingest_document(doc):
    """Ingests document into Kafka topic for processing."""
    producer.send('doc-ingest', json.dumps(doc).encode('utf-8'))
    producer.flush()
