"""
Testing the application factory to familiarise and do the hello world for testing.
"""

from app import create_app
from flask.testing import FlaskClient


def test_config():
    """
    Create the application with the test configuration.
    """
    assert not create_app().testing
    assert create_app({'TESTING': True}).testing


def test_health_check(client: FlaskClient):
    """
    Test the health check endpoint.
    """
    response = client.get('/health-check')
    assert response.status_code == 200
    assert response.json == {'status': 'OK'}
