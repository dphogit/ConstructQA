import { useState } from 'react';
import { Box, Container, Loader, Stack, Text } from '@mantine/core';
import { Disclaimer } from './Disclaimer';
import { QuestionInput } from './QuestionInput';
import { AnswerCard } from './AnswerCard';
import { useAskQuestionMutation } from '../api/question';

export function QuestionAnswer() {
  const [recentQuestion, setRecentQuestion] = useState<string | null>(null);

  const askQuestionMutation = useAskQuestionMutation();

  function sendQuestion(question: string) {
    setRecentQuestion(question);
    askQuestionMutation.mutate(question);
  }

  return (
    <Container pt={16}>
      <Box mb={32}>
        <QuestionInput onSendQuestion={sendQuestion} />
        <Disclaimer />
      </Box>
      {askQuestionMutation.isLoading && (
        <Stack align="center" spacing="xs">
          <Loader size="xl" />
          <Text ta="center" size="sm">
            Answering Your Question...
          </Text>
        </Stack>
      )}
      {recentQuestion && askQuestionMutation.data && (
        <AnswerCard
          question={recentQuestion}
          answerDto={askQuestionMutation.data}
        />
      )}
    </Container>
  );
}
