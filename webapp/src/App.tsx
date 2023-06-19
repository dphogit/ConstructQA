import { Box, Center, Container, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';
import { QuestionAnswer } from '@/features/question-answer';

function App() {
  return (
    <Container py="xl" size="xs">
      <Box mb="xl">
        <Title order={1} align="center">
          👷‍♀️ ConstructQA 👷‍♂️
        </Title>
        <Center>
          <HealthCheck />
        </Center>
      </Box>
      <QuestionAnswer />
    </Container>
  );
}

export default App;
