from typing import Dict, Union, List

from .answer_extraction import AnswerExtractionService
from .search import SearchService, SearchRepository, DEFAULT_TOP_K


class QuestionAnsweringService:
    def __init__(self, search_service: SearchService, answer_extraction_service: AnswerExtractionService):
        self.__search_service = search_service
        self.__answer_extraction_service = answer_extraction_service

    def answer_query(self, query: str, top_k=DEFAULT_TOP_K, all_searched=False) -> Union[Dict, List[Dict]]:
        def extract_answer(context: str) -> Dict:
            return self.__answer_extraction_service.extract_answer(query, context)

        # Obtain the top k documents from the search service
        search_results = self.__search_service.search(query, top_k)

        # Extract the answers from each search result and sort (in-place) by score descending
        answers = [extract_answer(r['payload']['content']) for r in search_results]
        answers.sort(key=lambda a: a['score'], reverse=True)

        return answers if all_searched else answers[0]
