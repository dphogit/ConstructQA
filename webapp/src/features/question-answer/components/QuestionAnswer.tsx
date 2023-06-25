import { FloatingBottomInteractiveArea } from './FloatingBottomInteractiveArea';
import { ChatLog } from './ChatLog';
import { QAProvider } from '../store/QuestionAnswerContext.tsx';

export function QuestionAnswer() {
  return (
    <QAProvider>
      <ChatLog />
      <FloatingBottomInteractiveArea />
    </QAProvider>
  );
}
