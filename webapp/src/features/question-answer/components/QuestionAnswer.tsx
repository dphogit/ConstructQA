import { Container } from '@mantine/core';
import { Disclaimer } from './Disclaimer';
import { QuestionInput } from './QuestionInput';

export function QuestionAnswer() {
  return (
    <Container pt={64}>
      <QuestionInput onSendQuestion={console.log} />
      <Disclaimer />
    </Container>
  );
}
