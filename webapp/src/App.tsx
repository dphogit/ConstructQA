import { Button, Container, Flex, Textarea, Title } from '@mantine/core';
import { HealthCheck } from '@/features/health-check';

function App() {
  return (
    <Container py="xl" size="xs">
      <Title order={1} align="center">
        ConstructQA 👷‍♂️
      </Title>
      <Textarea
        py="md"
        placeholder="Ask the ConstructQA bot a question!"
        minRows={2}
        maxRows={5}
        autosize
      />
      <Flex justify="space-between" align="center">
        <HealthCheck />
        <Button disabled>Ask (Coming Soon)</Button>
      </Flex>
    </Container>
  );
}

export default App;
