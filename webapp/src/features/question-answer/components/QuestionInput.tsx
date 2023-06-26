import React, { useState } from 'react';
import { createStyles, Stack, Textarea } from '@mantine/core';
import { SendQuestionButton } from './SendQuestionButton';
import { useQAContext } from '../store/QuestionAnswerContext';
import { useAskQuestionMutation } from '../api/question';

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

  const { addMessage } = useQAContext();

  const askQuestionMutation = useAskQuestionMutation();

  const [textAreaValue, setTextAreaValue] = useState<string>('');

  const isSendDisabled = textAreaValue.trim().length === 0;

  function sendQuestion() {
    const question = textAreaValue.trim();
    setTextAreaValue('');
    addMessage({ content: question, sender: 'user' });
    askQuestionMutation.mutate(question, {
      onSuccess: (answerData) => {
        addMessage({ content: answerData.answer, sender: 'ai' });
      },
    });
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
          <SendQuestionButton
            disabled={isSendDisabled}
            onClick={sendQuestion}
          />
        </Stack>
      }
      rightSectionWidth={64}
    />
  );
}
