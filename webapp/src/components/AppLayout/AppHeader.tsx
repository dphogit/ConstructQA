import { Container, Header, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';

export const HEADER_HEIGHT = '60px';

export function AppHeader() {
  return (
    <Header height={HEADER_HEIGHT}>
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
