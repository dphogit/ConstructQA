import React, { useRef } from 'react';
import { IconSearch } from '@tabler/icons-react';
import { TextInput } from '@mantine/core';

interface QuestionInputProps {
  isDisabled?: boolean;
  onSendQuestion?: (question: string) => void;
}

export function QuestionInput({
  isDisabled,
  onSendQuestion,
}: QuestionInputProps) {
  const ref = useRef<HTMLInputElement | null>(null);

  function sendQuestion() {
    const query = ref.current?.value;
    if (!query) return;

    onSendQuestion?.(query);
  }

  function sendIfEnterPressed(event: React.KeyboardEvent<HTMLInputElement>) {
    if (event.key === 'Enter') {
      sendQuestion();
    }
  }

  return (
    <TextInput
      ref={ref}
      onKeyDown={sendIfEnterPressed}
      aria-label="Question Input"
      placeholder="Ask a question..."
      size="xl"
      icon={<IconSearch />}
      disabled={isDisabled}
    />
  );
}
