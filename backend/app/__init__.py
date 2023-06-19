from flask import Flask, request
from flask_cors import CORS
from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForQuestionAnswering

from .config import SENTENCE_MODEL, QA_MODEL
from .db import get_qdrant
from .question_answer import AnswerExtractionService, SearchRepository, SearchService, DEFAULT_TOP_K, \
    QuestionAnsweringService
from .schema import validate_request_body, SearchReqBodySchema


def create_search_service() -> SearchService:
    sentence_model = SentenceTransformer(SENTENCE_MODEL)
    search_repository = SearchRepository(sentence_model)
    return SearchService(search_repository)


def create_answer_extraction_service() -> AnswerExtractionService:
    tokenizer = AutoTokenizer.from_pretrained(QA_MODEL)
    qa_model = AutoModelForQuestionAnswering.from_pretrained(QA_MODEL)
    return AnswerExtractionService(qa_model, tokenizer)


# Flask automatically detects `create_app` factory function and runs it.
def create_app(test_config=None) -> Flask:
    app = Flask(__name__)
    app.config.from_pyfile('config.py', silent=True)
    CORS(app, origins=['http://localhost:5173'])

    # Load testing configuration, if passed in.
    if test_config is not None:
        app.config.update(test_config)

    search_service = create_search_service()
    answer_extraction_service = create_answer_extraction_service()
    qa_service = QuestionAnsweringService(search_service, answer_extraction_service)

    @app.get('/health-check')
    def health_check_endpoint():
        """Health check endpoint to ensure the service is running."""
        return {'status': 'OK'}

    @app.post('/search')
    @validate_request_body(SearchReqBodySchema)
    def search_endpoint():
        """Search endpoint to find the most similar clauses to a query."""
        data = request.get_json()
        query = data.get('query')
        top_k = data.get('topK', DEFAULT_TOP_K)
        return search_service.search(query, top_k)

    @app.post('/query')
    def query_endpoint():
        """Query endpoint to provide an answer to a question."""
        data = request.get_json()
        query = data.get('query')
        top_k = data.get('topK', DEFAULT_TOP_K)
        all_searched = data.get('allSearched', False)
        return qa_service.answer_query(query, top_k, all_searched)

    return app
