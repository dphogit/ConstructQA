from typing import List, Dict


def is_desc_score(documents: List[Dict]) -> bool:
    """Returns whether documents are ranked in descending order"""
    for i in range(1, len(documents)):
        if documents[i - 1]['score'] < documents[i]['score']:
            return False
    return True
