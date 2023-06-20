import { Badge } from '@mantine/core';
import { useGetHealthCheck } from '../api/getHealthCheck';

export function HealthCheck() {
  const healthCheckQuery = useGetHealthCheck();

  if (healthCheckQuery.isLoading) {
    return (
      <Badge color="gray" variant="dot">
        Loading status...
      </Badge>
    );
  }

  if (healthCheckQuery.isError) {
    return (
      <Badge color="red" variant="dot">
        System Down
      </Badge>
    );
  }

  return (
    <Badge color="green" variant="dot">
      Connected
    </Badge>
  );
}
