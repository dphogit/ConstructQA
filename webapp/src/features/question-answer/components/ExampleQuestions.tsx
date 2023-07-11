import { createStyles, Grid, Paper, Title } from '@mantine/core';

const useStyles = createStyles((theme) => ({
  paper: {
    cursor: 'pointer',
    transition: 'all 150ms ease-out',
    lineHeight: 1.375,
    fontSize: '0.875rem',
    color: theme.colors.gray[7],

    '&:hover': {
      backgroundColor: theme.colors.gray[1],
    },
  },
}));

interface ExampleQuestionsProps {
  onQuestionClick?: (question: string) => void;
}

const EXAMPLE_QUESTIONS: string[] = [
  'How high must the smoke be above the floor when firefighters put out a fire with water?',
  'How many escape routes should an occupied space in a building have?',
  'Given a column is partly embedded in firm soil, what is the minimum depth of the end restraint?',
];

export function ExampleQuestions({ onQuestionClick }: ExampleQuestionsProps) {
  const { classes } = useStyles();

  function handleQuestionClick(i: number) {
    return () => {
      onQuestionClick?.(EXAMPLE_QUESTIONS[i]);
    };
  }

  return (
    <>
      <Title order={3} pb="sm" ta="center">
        ⚡ Examples
      </Title>
      <Grid>
        {EXAMPLE_QUESTIONS.map((question, i) => (
          <Grid.Col sm={4} xs={12}>
            <Paper
              className={classes.paper}
              component="button"
              onClick={handleQuestionClick(i)}
              radius="sm"
              p="md"
              withBorder
              h="100%"
            >
              {question}
            </Paper>
          </Grid.Col>
        ))}
      </Grid>
    </>
  );
}
