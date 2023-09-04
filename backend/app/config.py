import os

CODE_DIR = os.path.dirname(__file__)        # The directory where the script that is being executed is located.
ROOT_DIR = os.path.dirname(CODE_DIR)        # The directory where the backend directory is located.
DATA_DIR = os.path.join(ROOT_DIR, 'data')   # The directory where the data directory is located.

QDRANT_COLLECTION_NAME = 'clauses'
QDRANT_HOST = 'localhost'
QDRANT_PORT = 6333
QDRANT_LOCATION = f'http://{QDRANT_HOST}:{QDRANT_PORT}'
QDRANT_STORAGE_DIR = 'qdrant_storage'

SENTENCE_MODEL = 'multi-qa-MiniLM-L6-cos-v1'
QA_MODEL = 'deepset/tinyroberta-squad2'
