import { Container } from '@mantine/core';
import { QuestionAnswer } from '@/features/question-answer';
import { AppLayout } from '@/components/AppLayout';

function App() {
  return (
    <AppLayout>
      <Container>
        <QuestionAnswer />
      </Container>
    </AppLayout>
  );
}

export default App;
