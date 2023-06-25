import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios.tsx';

export interface AnswerResultDTO {
  answer: string;
  score: number;
}

function askQuestion(query: string): Promise<AnswerResultDTO> {
  return axios.post('/query', { query });
}

export function useAskQuestionMutation() {
  return useMutation({
    mutationFn: askQuestion,
  });
}
