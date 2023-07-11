from typing import List, Dict


def is_desc_score(documents: List[Dict], score_key: str = 'score') -> bool:
    """Returns whether documents are ranked in descending order. Use `score_key` to specify the key to use to compare
    between the retrieved documents."""
    for i in range(1, len(documents)):
        if documents[i - 1][score_key] < documents[i][score_key]:
            return False
    return True
