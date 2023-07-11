import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios.tsx';

export interface AnswerResultDTO {
  answer: string;
  atomicClause: string;
  groupClause: string;
  similarityScore: number;
  answerScore: number;
  clauseContent: string;
}

function askQuestion(query: string): Promise<AnswerResultDTO[]> {
  return axios.post('/query', { query, allAnswers: true });
}

export function useAskQuestionMutation() {
  return useMutation({
    mutationFn: askQuestion,
  });
}
