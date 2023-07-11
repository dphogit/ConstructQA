import {
  Box,
  Button,
  Group,
  Paper,
  Popover,
  Stack,
  Text,
  Title,
} from '@mantine/core';
import { AnswerResultDTO } from '../api/question';
import { formatScore } from '../utils';

interface AnswerCardProps {
  question: string;
  answerDto: AnswerResultDTO;
}

export function AnswerCard({ question, answerDto }: AnswerCardProps) {
  return (
    <Paper withBorder p="md" pb="sm" radius="md">
      <Stack spacing="xl">
        <Box>
          <Title order={4}>Question</Title>
          <Text>{question}</Text>
        </Box>
        <Box>
          <Title order={4}>Answer</Title>
          <Text>{answerDto.answer}</Text>
        </Box>
        <Box>
          <Text fw="bold">From Clause {answerDto.atomicClause}:</Text>
          <Text>{answerDto.clauseContent}</Text>
          <Group mt="xl">
            <Text size="sm" color="dimmed">
              Similarity: {formatScore(answerDto.similarityScore)}
            </Text>
            <Text size="sm" color="dimmed">
              Confidence: {formatScore(answerDto.answerScore)}
            </Text>
            <Popover width={300} withArrow>
              <Popover.Target>
                <Button
                  compact
                  variant="subtle"
                  color="gray"
                  fw={400}
                  td="underline"
                  size="xs"
                >
                  What do these scores mean?
                </Button>
              </Popover.Target>
              <Popover.Dropdown>
                <Text size="sm">
                  Similarity measures how similar the found clause is to the
                  question asked.
                </Text>
                <Text size="sm" mt="xs">
                  Confidence measures the probability that the extracted answer
                  is correct given the found clause and the question asked.
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
