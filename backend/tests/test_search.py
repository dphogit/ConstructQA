from flask import Flask
from flask.testing import FlaskClient

from tests.conftest import init_test_db
from tests.helpers import is_desc_score


def test_default_search(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?'
        })

        assert response.status_code == 200
        assert len(response.json) == 5
        assert is_desc_score(response.json)


def test_top_k(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'topK': 2
        })

        assert response.status_code == 200
        assert len(response.json) == 2
        assert is_desc_score(response.json)


def test_top_k_below_min(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'topK': 0
        })

        assert response.status_code == 400
        assert 'error' in response.json


def test_top_k_above_max(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={
            'query': 'How high must the smoke be above the floor when firefighters put out a fire with water?',
            'topK': 16
        })

        assert response.status_code == 400
        assert 'error' in response.json


def test_no_query(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={})

        assert response.status_code == 400
        assert 'error' in response.json


def test_empty_query(app: Flask, client: FlaskClient):
    with app.app_context():
        init_test_db(app)

        response = client.post('/search', json={
            'query': ''
        })

        assert response.status_code == 400
        assert 'error' in response.json
