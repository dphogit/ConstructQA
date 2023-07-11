from flask import Flask, request
from flask_cors import CORS

from .config import SENTENCE_MODEL, QA_MODEL
from .db import get_qdrant
from .question_answer.factory import create_qa_service
from .question_answer import DEFAULT_TOP_K, QuestionAnsweringService
from .schema import validate_request_body, SearchReqBodySchema, QueryReqBodySchema


# Flask automatically detects `create_app` factory function and runs it.
def create_app(test_config=None) -> Flask:
    app = Flask(__name__)
    app.config.from_pyfile('config.py', silent=True)
    CORS(app, origins=['http://localhost:5173'])

    # Load testing configuration, if passed in.
    if test_config is not None:
        app.config.update(test_config)

    # Main API service to perform question answering tasks that the request
    # handler layer will interact with.
    qa_service = create_qa_service(
        sentence_model_name_or_path=SENTENCE_MODEL,
        answer_extraction_model_name_or_path=QA_MODEL
    )

    # ----- REST API endpoints -----

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
        return qa_service.search_similar_documents(query, top_k)

    @app.post('/query')
    @validate_request_body(QueryReqBodySchema)
    def query_endpoint():
        """Query endpoint to provide an answer to a question."""
        data = request.get_json()
        query = data.get('query')
        top_k = data.get('topK', DEFAULT_TOP_K)
        all_answers = data.get('allAnswers', False)
        return qa_service.answer_query(query, top_k, all_answers)

    return app
