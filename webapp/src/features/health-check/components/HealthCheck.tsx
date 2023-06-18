import { Box } from '@mantine/core';
import { useGetHealthCheck } from '../api/getHealthCheck';

export function HealthCheck() {
  const healthCheckQuery = useGetHealthCheck();

  function getHealthCheckStatus(): string {
    if (healthCheckQuery.isLoading) {
      return 'Loading...';
    }

    if (healthCheckQuery.isError) {
      return 'Error';
    }

    return healthCheckQuery.data;
  }

  return (
    <Box>
      <Box>Status: {getHealthCheckStatus()}</Box>
    </Box>
  );
}
