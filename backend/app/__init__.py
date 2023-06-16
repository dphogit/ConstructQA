from flask import Flask, request
from flask_cors import CORS
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

from .config import QDRANT_HOST, QDRANT_PORT, SENTENCE_MODEL
from .schema import validate_request_body, SearchReqBodySchema
from .search import SearchRepository, SearchService, DEFAULT_TOP_K


def create_search_service():
    qdrant_client = QdrantClient(host=QDRANT_HOST, port=QDRANT_PORT)
    sentence_model = SentenceTransformer(SENTENCE_MODEL)
    search_repository = SearchRepository(qdrant_client, sentence_model)
    return SearchService(search_repository)


def create_app():
    app = Flask(__name__)
    CORS(app, origins=['http://localhost:5173'])

    search_service = create_search_service()

    @app.get('/health-check')
    def health_check_endpoint():
        return {'status': 'OK'}

    @app.post('/search')
    @validate_request_body(SearchReqBodySchema)
    def search_endpoint():
        data = request.get_json()
        query = data.get('query')
        top_k = data.get('topK', DEFAULT_TOP_K)
        return search_service.search(query, top_k)

    return app
