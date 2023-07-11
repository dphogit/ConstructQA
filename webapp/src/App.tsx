import { Box, Title } from '@mantine/core';
import { QuestionAnswer } from '@/features/question-answer';

function App() {
  return (
    <Box pt={48}>
      <Title order={1} ta="center">
        👷‍♂️ ConstructQA
      </Title>
      <QuestionAnswer />
    </Box>
  );
}

export default App;
