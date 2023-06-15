"""
Script to populate the clause vector embeddings in the vector database.
NOTE: This will delete and recreate the collection so any existing data will be lost.

TODO This will obviously need to adapt when we have the full dataset.
Currently, only the fire clauses are being used.
"""
import os

import numpy as np
import pandas as pd
from qdrant_client import QdrantClient
from qdrant_client.http.models import VectorParams, Distance

from config import QDRANT_STORAGE_DIR, QDRANT_COLLECTION_NAME, QDRANT_HOST, QDRANT_PORT, DATA_DIR, ROOT_DIR

if __name__ == "__main__":
    # Create the Qdrant client and provide the path location to persist changes to disk
    qdrant_storage_path = os.path.join(ROOT_DIR, QDRANT_STORAGE_DIR)
    qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)

    # Load the fire clauses with numpy
    fire_clauses_path = os.path.join(DATA_DIR, 'fire-clauses.npy')
    vectors = np.load(fire_clauses_path)
    vector_dimension = vectors.shape[1]

    # Read in the corresponding fire clause ids
    payload_path = os.path.join(DATA_DIR, 'fire-clauses.json')
    clause_ids = [{'clause': cid} for cid in pd.read_json(payload_path)['clause']]

    # Delete and recreate the collection
    qdrant_client.recreate_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors_config=VectorParams(size=vector_dimension, distance=Distance.COSINE)
    )

    # Insert the vectors with corresponding payload (clause id's) into the collection
    qdrant_client.upload_collection(
        collection_name=QDRANT_COLLECTION_NAME,
        vectors=vectors,
        payload=clause_ids
    )

    print(f"Uploaded vectors to Local Qdrant in the {QDRANT_STORAGE_DIR} directory successfully")
