from sentence_transformers import SentenceTransformer
from transformers import AutoTokenizer, AutoModelForQuestionAnswering

from app.question_answer import QuestionAnsweringService, SearchService, SearchRepository, AnswerExtractionService


def create_search_service(model_name_or_path: str) -> SearchService:
    sentence_model = SentenceTransformer(model_name_or_path)
    search_repository = SearchRepository(sentence_model)
    return SearchService(search_repository)


def create_answer_extraction_service(pretrained_model_name_or_path) -> AnswerExtractionService:
    tokenizer = AutoTokenizer.from_pretrained(pretrained_model_name_or_path)
    qa_model = AutoModelForQuestionAnswering.from_pretrained(pretrained_model_name_or_path)
    return AnswerExtractionService(qa_model, tokenizer)


def create_qa_service(sentence_model_name_or_path, answer_extraction_model_name_or_path) -> QuestionAnsweringService:
    search_service = create_search_service(sentence_model_name_or_path)
    answer_extraction_service = create_answer_extraction_service(answer_extraction_model_name_or_path)
    return QuestionAnsweringService(search_service, answer_extraction_service)
