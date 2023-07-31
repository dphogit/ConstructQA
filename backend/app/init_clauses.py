"""
Script to populate the clause vector embeddings in the vector database.
NOTE: This will delete and recreate the collection so any existing data will be lost.
"""
import os

import numpy as np
import pandas as pd
from qdrant_client import QdrantClient
from qdrant_client.http.models import VectorParams, Distance

from config import QDRANT_HOST, QDRANT_PORT, DATA_DIR, QDRANT_COLLECTION_NAME

if __name__ == "__main__":
    # Create the Qdrant client to use for populating the database
    qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

    # Load all the clauses from the numpy file
    clauses_path = os.path.join(DATA_DIR, 'clause_vectors.npy')
    vectors = np.load(clauses_path)
    vector_dimension = vectors.shape[1]

    # Create the corresponding payload for the vectors.
    payload_path = os.path.join(DATA_DIR, 'clauses_df.csv')
    df = pd.read_csv(payload_path)
    df = df.rename(
        columns={'Atomic Clause': 'atomicClause', 'Code': 'code', 'Content': 'content', 'Group Clause': 'groupClause'}
    )
    payload = df.to_dict(orient='records')

    print(f"Recreating collection '{QDRANT_COLLECTION_NAME}'...")

    # Delete and recreate the collection
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors_config=VectorParams(size=vector_dimension, distance=Distance.COSINE)
    )

    print(f"Collection '{QDRANT_COLLECTION_NAME}' recreated")
    print(f"Uploading vectors to collection '{QDRANT_COLLECTION_NAME}'...")

    # Insert the vectors with corresponding payload (clause id's) into the collection
    qdrant_client.upload_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors=vectors,
        payload=payload
    )

    print(f"Vectors uploaded to collection '{QDRANT_COLLECTION_NAME}'")
    print('Database initialisation completed')
