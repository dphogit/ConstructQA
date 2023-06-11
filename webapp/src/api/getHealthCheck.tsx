import { useQuery } from '@tanstack/react-query';
import { axios } from '../lib/axios';

export interface HealthCheckDTO {
  status: 'OK';
}

function getHealthCheck(): Promise<HealthCheckDTO> {
  return axios.get('/health-check');
}

export function useGetHealthCheck() {
  return useQuery({
    queryKey: ['health-check'],
    queryFn: getHealthCheck,
    select: data => data.status,
  });
}
