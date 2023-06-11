import {
  Box,
  Button,
  Container,
  Flex,
  Text,
  Textarea,
  Title,
} from '@mantine/core';
import { useGetHealthCheck } from './api/getHealthCheck';

// TODO This is just starting code - do actual app dev in future PR
function App() {
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
      <Flex justify="space-between">
        <Box>
          <Text>Status: {getHealthCheckStatus()}</Text>
        </Box>
        <Button disabled>Ask (Coming Soon)</Button>
      </Flex>
    </Container>
  );
}

export default App;
