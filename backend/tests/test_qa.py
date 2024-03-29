from flask import Flask
from flask.testing import FlaskClient

from tests.conftest import init_test_db
from tests.helpers import is_desc_score


def is_answer_shape(answer) -> bool:
    """Helper to see an answer item has the correct shape"""
    is_dict = isinstance(answer, dict)
    has_answer = 'answer' in answer and isinstance(answer['answer'], str)
    has_atomic_clause = 'atomicClause' in answer and isinstance(answer['atomicClause'], str)
    has_similarity_score = 'similarityScore' in answer and isinstance(answer['similarityScore'], float)
    has_answer_score = 'answerScore' in answer and isinstance(answer['answerScore'], float)
    has_clause_content = 'clauseContent' in answer and isinstance(answer['clauseContent'], str)
    has_code = 'code' in answer and isinstance(answer['code'], str)
    return is_dict and has_answer and has_similarity_score and has_answer_score and has_atomic_clause and \
        has_clause_content and has_code


def test_default_qa(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?'
        })

        assert response.status_code == 200
        assert is_answer_shape(response.json)


def test_all_answers(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'allAnswers': True
        })

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 5
        assert all(is_answer_shape(item) for item in response.json)
        assert is_desc_score(response.json, score_key='similarityScore')


def test_all_answers_with_top_k(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'allAnswers': True,
            'topK': 2
        })

        assert response.status_code == 200
        assert isinstance(response.json, list)
        assert len(response.json) == 2
        assert all(is_answer_shape(item) for item in response.json)
        assert is_desc_score(response.json, score_key='similarityScore')


def test_top_k_below_min(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'topK': 0
        })

        assert response.status_code == 400
        assert 'error' in response.json


def test_top_k_above_max(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'topK': 16
        })

        assert response.status_code == 400
        assert 'error' in response.json


def test_no_query(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={})

        assert response.status_code == 400
        assert 'error' in response.json


def test_empty_query(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/query', json={'query': ''})

        assert response.status_code == 400
        assert 'error' in response.json
