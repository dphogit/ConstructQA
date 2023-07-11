import { useState } from 'react';
import { Box, Container, Loader, Stack, Text, Title } from '@mantine/core';
import { QuestionInput } from './QuestionInput';
import { AnswerCard } from './AnswerCard';
import { SearchResult } from './SearchResult';
import { useAskQuestionMutation } from '../api/question';

export function QuestionAnswer() {
  const [recentQuestion, setRecentQuestion] = useState<string | null>(null);

  const askQuestionMutation = useAskQuestionMutation();

  function sendQuestion(question: string) {
    setRecentQuestion(question);
    askQuestionMutation.mutate(question);
  }

  return (
    <Container pt="xs" pb={48}>
      <QuestionInput onSendQuestion={sendQuestion} />
      {askQuestionMutation.isLoading && (
        <Stack align="center" spacing="xs" mt="xl">
          <Loader size="xl" />
          <Text ta="center" size="sm">
            Answering Your Question...
          </Text>
        </Stack>
      )}
      {recentQuestion && askQuestionMutation.data && (
        <Box mt="xl">
          <AnswerCard
            question={recentQuestion}
            answerDto={askQuestionMutation.data[0]}
          />
          <Box mt={64}>
            <Title order={4} px="xs">
              Similar Clauses
            </Title>
            <Box mt="xs">
              {askQuestionMutation.data.slice(1).map((answerDto) => (
                <SearchResult
                  key={answerDto.atomicClause}
                  answerDto={answerDto}
                />
              ))}
            </Box>
          </Box>
        </Box>
      )}
    </Container>
  );
}
