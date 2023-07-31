import os

import numpy as np
import pandas as pd
import pytest
from flask import Flask
from qdrant_client.http.models import VectorParams, Distance

from app import create_app
from app.config import DATA_DIR
from app.db import get_qdrant


def load_vectors_and_payload():
    """Helper function to load the vectors and payload for testing."""

    # Load the fire clauses with numpy
    fire_clauses_path = os.path.join(DATA_DIR, 'test-clauses.npy')
    vectors = np.load(fire_clauses_path)

    # Create the corresponding payload for the vectors.
    payload_path = os.path.join(DATA_DIR, 'test-clauses.json')
    df = pd.read_json(payload_path)
    df['limitOnApplication'].fillna('', inplace=True)
    payload = [
        {'content': f"{rec['content']} {rec['limitOnApplication']}",
         'code': f"Protection of Fire",
         'groupClause': f"Fire affecting areas beyond the fire source",
         'atomicClause': rec['clause']}
        for rec in df.to_dict(orient='records')
    ]

    return vectors, payload


def init_test_db(app: Flask):
    """Pre-populates an in-memory Qdrant database with test data (fire clauses).
    See `with_test_db` for a convenient wrapper for this function.

    Examples
    --------
    >>> def test_endpoint(app: Flask):
    ...     with app.app_context():
    ...         init_test_db(app)
    ...         # Testing logic
    """
    vectors, payload = load_vectors_and_payload()
    qdrant_client = get_qdrant()
    qdrant_client.recreate_collection(
        collection_name=app.config['QDRANT_COLLECTION_NAME'],
        vectors_config=VectorParams(size=vectors.shape[1], distance=Distance.COSINE)
    )
    qdrant_client.upload_collection(
        collection_name=app.config['QDRANT_COLLECTION_NAME'],
        vectors=vectors,
        payload=payload
    )


@pytest.fixture
def app():
    app = create_app({
        'TESTING': True,
        'QDRANT_LOCATION': ':memory:',
        'QDRANT_COLLECTION_NAME': 'test',
    })

    yield app


@pytest.fixture
def client(app: Flask):
    return app.test_client()


@pytest.fixture
def runner(app: Flask):
    return app.test_cli_runner()
