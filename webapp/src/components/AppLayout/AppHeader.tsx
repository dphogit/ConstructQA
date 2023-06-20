import { Container, Header, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';

export function AppHeader() {
  return (
    <Header height={60}>
      <Container
        sx={{
          display: 'flex',
          alignItems: 'center',
          height: '100%',
          justifyContent: 'space-between',
        }}
      >
        <Title order={1} size="h2">
          ConstructQA
        </Title>
        <HealthCheck />
      </Container>
    </Header>
  );
}
