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
            - **atomicClause** (`str`) -- The unique clause of the document that the answer was extracted from.
            - **groupClause** (`str`) -- The grouping clause of the document that the answer was extracted from.
            - **similarityScore** (`float`) -- The similarity score between the query and the retrieved result.
            - **answerScore** (`float`) -- The probability of the correct answer extracted from the context.
            - **clauseContent** (`str`) -- The content of the clause that the answer was extracted from.
        """

        def create_answer_item(search_result) -> Dict:
            """Helper function to create the specified answer Dict specified in the docstring."""
            ans_obj = self.__answer_extraction_service.extract_answer(query, search_result['payload']['content'])
            return {
                'answer': ans_obj['answer'],
                'atomicClause': search_result['payload']['atomicClause'],
                'groupClause': search_result['payload']['groupClause'],
                'similarityScore': search_result['score'],
                'answerScore': ans_obj['score'],
                'clauseContent': search_result['payload']['content']
            }

        # Obtain the top k documents from the search service
        search_results = self.__search_service.search(query, top_k)

        if all_searched:
            # Extract the answers from each search result and sort (in-place) by similarity score descending
            answers = [create_answer_item(search_result) for search_result in search_results]
            answers.sort(key=lambda a: a['similarityScore'], reverse=True)
            return answers

        top_result = search_results[0]
        return create_answer_item(top_result)

    def search_similar_documents(self, query: str, top_k=DEFAULT_TOP_K) -> List[Dict]:
        return self.__search_service.search(query, top_k)
