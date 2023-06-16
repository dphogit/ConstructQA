from functools import wraps
from typing import Type

from flask import request, jsonify
from marshmallow import Schema, fields, validate


def validate_request_body(schema_class: Type[Schema]):
    def decorator(func):

        @wraps(func)
        def wrapper(*args, **kwargs):
            data = request.get_json()
            schema = schema_class()
            errors = schema.validate(data)

            if len(errors) > 0:
                return jsonify({'error': 'invalid request body', 'messages': errors}), 400
            return func(*args, **kwargs)

        return wrapper

    return decorator


class SearchReqBodySchema(Schema):
    query = fields.Str(required=True)
    topK = fields.Int(strict=True, validate=validate.Range(min=1, max=15))
