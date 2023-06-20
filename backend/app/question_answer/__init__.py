from typing import Dict, Union, List

from .answer_extraction import AnswerExtractionService
from .search import SearchService, SearchRepository, DEFAULT_TOP_K


class QuestionAnsweringService:
    """Service that the request handlers use to interact with to perform question answering services.

    Args:
        search_service (SearchService): The search service to use to search for similar documents.
        answer_extraction_service (AnswerExtractionService): The answer extraction service to use to extract answers
    """

    def __init__(self, search_service: SearchService, answer_extraction_service: AnswerExtractionService):
        self.__search_service = search_service
        self.__answer_extraction_service = answer_extraction_service

    def answer_query(self, query: str, top_k=DEFAULT_TOP_K, all_searched=False) -> Union[Dict, List[Dict]]:
        """Answers a provided query by first performing a search for similar documents and then using these documents
        to extract the answer from.

        Args:
            query: The query to answer.
            top_k: The number of documents to search for and extract answers from. Defaults to 5.
            all_searched: Whether to return all the answers from the top k documents or just the top answer.
                If `True`, returns the list of answer results in descending score order. Defaults to `False`.

        Returns:
            A `dict` or `list` of `dict`s which are the answer results. The `dict`s contain the following keys:

            - **answer** (`str`) -- The answer to the query.
            - **score** (`float`) -- The probability associated with the answer.
        """

        def extract_answer(context: str) -> Dict:
            return self.__answer_extraction_service.extract_answer(query, context)

        # Obtain the top k documents from the search service
        search_results = self.__search_service.search(query, top_k)

        # Extract the answers from each search result and sort (in-place) by score descending
        answers = [extract_answer(r['payload']['content']) for r in search_results]
        answers.sort(key=lambda a: a['score'], reverse=True)

        return answers if all_searched else answers[0]

    def search_similar_documents(self, query: str, top_k=DEFAULT_TOP_K) -> List[Dict]:
        return self.__search_service.search(query, top_k)
