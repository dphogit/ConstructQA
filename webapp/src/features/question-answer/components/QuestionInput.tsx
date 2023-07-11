import React, { useState } from 'react';
import { Box, CloseButton, Group, TextInput } from '@mantine/core';
import { ExampleQuestions } from './ExampleQuestions';
import { SendQuestionButton } from './SendQuestionButton';
import { Disclaimer } from './Disclaimer';

interface QuestionInputProps {
  isDisabled?: boolean;
  onSendQuestion?: (question: string) => void;
}

export function QuestionInput({
  isDisabled,
  onSendQuestion,
}: QuestionInputProps) {
  const [query, setQuery] = useState<string>('');

  function sendQuery(q: string) {
    const validQuery = q.trim();
    if (!validQuery || isDisabled) return;

    onSendQuestion?.(validQuery);
  }

  function sendIfEnterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendQuery(query);
    }
  }

  function handleExampleQuestionClick(question: string) {
    if (question.trim() === query.trim()) return;

    setQuery(question);
    sendQuery(question);
  }

  const isEmptyQuery = !query.trim();

  const sendQuestionBtn = (
    <SendQuestionButton
      disabled={isEmptyQuery || isDisabled}
      onClick={() => sendQuery(query)}
    />
  );

  const rightSection = isEmptyQuery ? (
    sendQuestionBtn
  ) : (
    <Group>
      <CloseButton
        size="md"
        radius="xl"
        iconSize={16}
        onClick={() => setQuery('')}
        aria-label="Clear Input"
      />
      {sendQuestionBtn}
    </Group>
  );

  return (
    <>
      <ExampleQuestions onQuestionClick={handleExampleQuestionClick} />
      <Disclaimer />
      <Box pt={48}>
        <TextInput
          value={query}
          onChange={(event) => setQuery(event.currentTarget.value)}
          onKeyDown={sendIfEnterPressed}
          aria-label="Question Input"
          placeholder="Ask a question..."
          size="lg"
          disabled={isDisabled}
          rightSectionWidth={!isEmptyQuery ? 100 : undefined}
          rightSection={rightSection}
        />
      </Box>
    </>
  );
}
