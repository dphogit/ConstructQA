import React, { useState } from 'react';
import { createStyles, Stack, Textarea } from '@mantine/core';
import { SendQuestionButton } from './SendQuestionButton';

const useStyles = createStyles({
  wrapper: {
    backgroundColor: 'white',
    paddingTop: 8,
    paddingBottom: 8,
    paddingLeft: 16,
    paddingRight: 16,
    borderRadius: 16,
    boxShadow: '0 0 24px rgba(0, 0, 0, 0.1)',
  },
});

export function QuestionInput() {
  const { classes } = useStyles();

  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const isSendDisabled = textAreaValue.trim().length === 0;

  function sendQuestion() {
    console.log(textAreaValue);
    setTextAreaValue('');
  }

  function sendIfEnterPressed(event: React.KeyboardEvent<HTMLTextAreaElement>) {
    if (event.key === 'Enter' && !event.shiftKey && !isSendDisabled) {
      event.preventDefault();
      sendQuestion();
    }
  }

  return (
    <Textarea
      value={textAreaValue}
      onChange={(event) => setTextAreaValue(event.currentTarget.value)}
      onKeyDown={sendIfEnterPressed}
      classNames={{ wrapper: classes.wrapper }}
      variant="unstyled"
      size="md"
      autosize
      placeholder="Ask ConstructQA a question"
      aria-label="Textarea to ask ConstructQA a question"
      rightSection={
        <Stack h="100%" justify="flex-end" pb={12}>
          <SendQuestionButton disabled={isSendDisabled} />
        </Stack>
      }
      rightSectionWidth={64}
    />
  );
}
