from typing import Dict

from transformers import pipeline


class AnswerExtractionService:
    def __init__(self, model, tokenizer):
        self.__model = model
        self.__tokenizer = tokenizer
        self.__pipeline = pipeline(task='question-answering', model=model, tokenizer=tokenizer)

    def extract_answer(self, question: str, context: str) -> Dict:
        result = self.__pipeline(question=question, context=context)
        return {'answer': result['answer'], 'score': result['score']}
