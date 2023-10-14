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
import Highlighter from 'react-highlight-words';

interface AnswerCardProps {
  question: string;
  answerDto: AnswerResultDTO;
}

export function AnswerCard({ question, answerDto }: AnswerCardProps) {
  // Surround with space so we can better ensure correct span is highlighted.
  const highlightedAnswer = ` ${answerDto.answer} `;

  return (
    <Paper withBorder p="md" pb="sm" radius="md">
      <Stack spacing="xl">
        <Box>
          <Title order={4}>Question</Title>
          <Text>{question}</Text>
        </Box>
        <Box>
          <Title order={4}>Answer</Title>
          <Text color="gray">{answerDto.answer}</Text>
        </Box>
        <Box>
          <Text fw="bold">From {answerDto.atomicClause}:</Text>
          <Text color="dimmed" size="sm" mb="xs">
            {answerDto.code} - {answerDto.groupClause}
          </Text>
          <Highlighter
            textToHighlight={answerDto.clauseContent}
            searchWords={[highlightedAnswer]}
          />
          <Text>{answerDto.clauseContent}</Text>
          <Group mt="xl">
            <Text size="sm" color="dimmed">
              Relevance: {formatScore(answerDto.similarityScore)}
            </Text>
            <Text size="sm" color="dimmed">
              Confidence: {formatScore(answerDto.answerScore)}
            </Text>
            <Popover width={300} shadow="xl">
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
                  <strong>Relevance</strong> measures how similar the retrieved
                  paragraph is to the question asked (similarity score).
                </Text>
                <Text size="sm" mt="xs">
                  <strong>Confidence</strong> measures the probability that the
                  extracted answer is correct given the retrieved paragraph and
                  the question asked.
                </Text>
              </Popover.Dropdown>
            </Popover>
          </Group>
        </Box>
      </Stack>
    </Paper>
  );
}
