import { useMutation } from '@tanstack/react-query';
import { axios } from '@/lib/axios.tsx';

export interface SearchResultDTO {
  payload: {
    clause: string;
    content: string;
  };
  score: string;
}

function search(query: string): Promise<SearchResultDTO[]> {
  return axios.post('/search', { query });
}

export function useSearch() {
  return useMutation({
    mutationFn: search,
  });
}
