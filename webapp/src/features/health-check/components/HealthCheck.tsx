import { Badge } from '@mantine/core';
import { useGetHealthCheck } from '../api/getHealthCheck';

export function HealthCheck() {
  const healthCheckQuery = useGetHealthCheck();

  const commonProps = {
    variant: 'dot',
    size: 'lg',
  };

  // Just don't show anything if it's loading.
  if (healthCheckQuery.isLoading) {
    return null;
  }

  if (healthCheckQuery.isError) {
    return (
      <Badge color="red" {...commonProps}>
        System Down
      </Badge>
    );
  }

  return (
    <Badge color="green" {...commonProps}>
      Connected
    </Badge>
  );
}
