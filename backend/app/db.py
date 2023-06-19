from flask import current_app, g
from qdrant_client import QdrantClient


def get_qdrant() -> QdrantClient:
    """Create a Qdrant client if it doesn't exist yet and return it.
    note: only use this in an application context as it uses the `g` object."""
    if 'qdrant' not in g:
        g.qdrant = QdrantClient(current_app.config['QDRANT_LOCATION'])

    return g.qdrant
