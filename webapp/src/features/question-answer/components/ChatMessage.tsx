import { Avatar, Box, Container, Group, Text } from '@mantine/core';
import { Message } from '../types';

interface ChatMessageProps {
  message: Message;
}

export function ChatMessage({ message }: ChatMessageProps) {
  const isAI = message.sender === 'ai';

  return (
    <Box
      py="xl"
      sx={(theme) => ({
        borderBottom: '1px solid rgba(0, 0, 0, .1)',
        backgroundColor: isAI ? theme.colors.gray[0] : 'white',
      })}
    >
      <Container>
        <Group>
          {isAI ? (
            <Avatar radius="sm" color="green" size={32} alt="AI">
              👷‍♂️
            </Avatar>
          ) : (
            <Avatar radius="sm" color="blue" size={32} alt="User" />
          )}
          <Text>{message.content}</Text>
        </Group>
      </Container>
    </Box>
  );
}
