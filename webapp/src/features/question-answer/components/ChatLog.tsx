import { useQAContext } from '../store/QuestionAnswerContext';
import { ChatMessage } from './ChatMessage';

export function ChatLog() {
  const { messages } = useQAContext();

  return (
    <div>
      {messages.map((message, idx) => (
        // Using index as key is ok as order of messages is not going to change
        <ChatMessage message={message} key={idx} />
      ))}
    </div>
  );
}
