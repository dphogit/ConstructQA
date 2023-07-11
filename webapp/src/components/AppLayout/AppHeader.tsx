import { Group, Header, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';

export function AppHeader() {
  return (
    <Header height={64} px="xl">
      <Group h="100%" position="apart">
        <Title order={1}>👷‍♂️ ConstructQA</Title>
        <HealthCheck />
      </Group>
    </Header>
  );
}
