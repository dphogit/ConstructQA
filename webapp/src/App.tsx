import { Button, Container, Flex, Textarea, Title } from '@mantine/core';
import { ThemeProvider } from './providers';

function App() {
  // TODO Implement functionality
  return (
    <ThemeProvider>
      <Container py="xl" size="xs">
        <Title order={1} align="center">ConstructQA 👷‍♂️</Title>
        <Textarea
          py="md"
          placeholder="Ask the ConstructQA bot a question!"
          minRows={2}
          maxRows={5}
          autosize
        />
        <Flex justify="flex-end">
          <Button>
            Ask
          </Button>
        </Flex>
      </Container>
    </ThemeProvider>
  );
}

export default App;
