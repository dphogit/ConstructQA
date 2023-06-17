from typing import Optional

from flask import Flask, request
from flask_cors import CORS
from qdrant_client import QdrantClient
from sentence_transformers import SentenceTransformer

from app.config import SENTENCE_MODEL
from app.schema import validate_request_body, SearchReqBodySchema
from app.search import SearchRepository, SearchService, DEFAULT_TOP_K


def create_search_service(qdrant_location: Optional[str] = None) -> SearchService:
    qdrant_client = QdrantClient(qdrant_location)
    sentence_model = SentenceTransformer(SENTENCE_MODEL)
    search_repository = SearchRepository(qdrant_client, sentence_model)
    return SearchService(search_repository)


# Flask automatically detects `create_app` factory function and runs it.
def create_app(test_config=None) -> Flask:
    app = Flask(__name__)
    app.config.from_pyfile('config.py', silent=True)
    CORS(app, origins=['http://localhost:5173'])

    # Load testing configuration, if passed in.
    if test_config is not None:
        app.config.update(test_config)

    search_service = create_search_service(app.config['QDRANT_LOCATION'])

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
