import { Box } from '@mantine/core';
import { HEADER_HEIGHT } from '@/components/AppLayout';
import { FloatingBottomInteractiveArea } from './FloatingBottomInteractiveArea';
import { ChatLog } from './ChatLog';
import { QAProvider } from '../store/QuestionAnswerContext.tsx';

export function QuestionAnswer() {
  return (
    <QAProvider>
      <Box pos="relative" h={`calc(100vh - ${HEADER_HEIGHT})`} pb="160px">
        <ChatLog />
        <FloatingBottomInteractiveArea />
      </Box>
    </QAProvider>
  );
}
