from typing import List, Dict

from flask import current_app
from sentence_transformers import SentenceTransformer

from app.db import get_qdrant

DEFAULT_TOP_K = 5


class SearchRepository:
    """Data access layer logic for searching for similar documents.

    Args:
        model: Sentence transformer model to encode clauses into vectors.
    """

    def __init__(self, model: SentenceTransformer):
        self.__model = model

    def search(self, query: str, top_k: int = DEFAULT_TOP_K):
        """Searches for the most similar documents to the query in the database.

        Args:
            query: The query to search for.
            top_k: The number of results to return. Defaults to 5.
        """
        client = get_qdrant()
        query_vector = self.__model.encode(query).tolist()
        return client.search(
            collection_name=current_app.config['QDRANT_COLLECTION_NAME'],
            query_vector=query_vector,
            limit=top_k,
            with_payload=True
        )


class SearchService:
    """Service to handle searching for related documents.

    Args:
        repository (SearchRepository): The repository to perform the data access logic.
    """

    def __init__(self, repository: SearchRepository):
        self.__repository = repository

    def search(self, query: str, top_k: int = DEFAULT_TOP_K) -> List[Dict]:
        """Searches for the most semantically similar documents to the query.

        Args:
            query: The query to search for.
            top_k: The number of results to return. Defaults to 5.

        Return:
            A list of the top k hits ranked by similarity score descending.
            Each hit is a dictionary containing the following keys:

            - **payload** (`dict`) -- The payload of the hit (see below).
            - **score** (`float`) -- The similarity score of the hit.

            The payload is a dictionary containing:

            - **clause** (`str`) -- The id of the clause. e.g. C3.8
            - **content** (`str`) -- The actual content of the clause.
        """
        return [
            {"payload": hit.payload, "score": hit.score}
            for hit in self.__repository.search(query, top_k)
        ]
