import { Box, createStyles, Modal, Text } from '@mantine/core';
import { useDisclosure } from '@mantine/hooks';
import { AnswerResultDTO } from '../api/question';
import { formatScore } from '../utils';

const useStyles = createStyles((theme) => ({
  root: {
    transition: 'all 100ms ease-out',
    cursor: 'pointer',
    borderBottom: `1px solid ${theme.colors.gray[3]}`,

    '&:first-child': {
      borderTop: `1px solid ${theme.colors.gray[3]}`,
    },

    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

interface SearchResultProps {
  answerDto: AnswerResultDTO;
}

export function SearchResult({ answerDto }: SearchResultProps) {
  const { classes } = useStyles();

  const [opened, { open, close }] = useDisclosure(false);

  const title = `Clause ${answerDto.atomicClause}`;

  return (
    <>
      <Box py="sm" px="xs" className={classes.root} onClick={open}>
        <Text fw="bold">{title}</Text>
        <Text color="dimmed" size="sm" mb="xs">
          {answerDto.code} - {answerDto.groupClause}
        </Text>
        <Text size="sm" lineClamp={2}>
          {answerDto.clauseContent}
        </Text>
        <Text color="dimmed" size="sm" mt="sm">
          Similarity: {formatScore(answerDto.similarityScore)}
        </Text>
      </Box>
      <Modal
        opened={opened}
        onClose={close}
        title={<Text fw="bold">{title}</Text>}
        size="lg"
      >
        <Text size="sm">{answerDto.clauseContent}</Text>
        <Text color="dimmed" size="sm" mt="md">
          Sentence Similarity: {formatScore(answerDto.similarityScore)}
        </Text>
      </Modal>
    </>
  );
}
