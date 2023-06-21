import { Box } from '@mantine/core';
import { FloatingBottomInteractiveArea } from './FloatingBottomInteractiveArea';
import { HEADER_HEIGHT } from '@/components/AppLayout';

export function QuestionAnswer() {
  return (
    <Box pos="relative" h={`calc(100vh - ${HEADER_HEIGHT})`}>
      <FloatingBottomInteractiveArea />
    </Box>
  );
}
