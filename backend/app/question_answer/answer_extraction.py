from typing import Dict

from transformers import pipeline


class AnswerExtractionService:
    """Service for extracting answers from a given context and question.

    Args:
        model: The model to use for extracting answers.
        tokenizer: The tokenizer to use for tokenizing the context and question.
    """

    def __init__(self, model, tokenizer):
        self.__model = model
        self.__tokenizer = tokenizer
        self.__pipeline = pipeline(task='question-answering', model=model, tokenizer=tokenizer)

    def extract_answer(self, question: str, context: str) -> Dict:
        """Extracts an answer from the provided context according to a given question.

        Args:
            question: The question to answer.
            context: The context to extract the answer from.

        Returns:
            A `dict` containing the following keys:

            - **answer** (`str`) -- The answer to the question.
            - **score** (`float`) -- The probability associated with the answer.
        """

        result = self.__pipeline(question=question, context=context)
        return {'answer': result['answer'], 'score': result['score']}
