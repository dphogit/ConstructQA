import { Box } from '@mantine/core';
import { useQAContext } from '../store/QuestionAnswerContext';
import { ChatMessage } from './ChatMessage';

export function ChatLog() {
  const { messages } = useQAContext();

  return (
    <Box pb="160px">
      {messages.map((message, idx) => (
        <ChatMessage message={message} key={idx} />
      ))}
    </Box>
  );
}
