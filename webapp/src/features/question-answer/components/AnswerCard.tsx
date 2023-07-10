import { Button, Center, Collapse, Paper, Text, Title } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { IconChevronDown, IconChevronUp } from '@tabler/icons-react';
import { AnswerResultDTO } from '../api/question';

interface AnswerCardProps {
  question: string;
  answerDto: AnswerResultDTO;
}

export function AnswerCard({ question, answerDto }: AnswerCardProps) {
  const [opened, { toggle }] = useDisclosure(false);

  const rightIcon = opened ? (
    <IconChevronUp size="1rem" />
  ) : (
    <IconChevronDown size="1rem" />
  );

  return (
    <Paper withBorder p="md" pb="xs">
      <Title order={5} mb="md">
        {question}
      </Title>
      <Text mb="xs">{answerDto.answer}</Text>
      <Collapse in={opened}>
        <Text>{answerDto.groupClause}</Text>
        <Text>{answerDto.atomicClause}</Text>
        <Text>{answerDto.clauseContent}</Text>
        <Text>{answerDto.similarityScore}</Text>
        <Text>{answerDto.answerScore}</Text>
      </Collapse>
      <Center>
        <Button
          onClick={toggle}
          variant="subtle"
          color="gray"
          size="xs"
          rightIcon={rightIcon}
        >
          {opened ? 'Hide Details' : 'Show Details'}
        </Button>
      </Center>
    </Paper>
  );
}
