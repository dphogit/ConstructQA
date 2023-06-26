import React, {
  createContext,
  useCallback,
  useContext,
  useMemo,
  useState,
} from 'react';
import { Message } from '../types.ts';

interface IQAContext {
  messages: Message[];
  addMessage: (message: Message) => void;
}

const QAContext = createContext<IQAContext>({
  messages: [],
  addMessage: () => {},
});

interface QAProviderProps {
  children: React.ReactNode;
}

export const QAProvider = ({ children }: QAProviderProps) => {
  const [messages, setMessage] = useState<Message[]>([]);

  const addMessage = useCallback((message: Message) => {
    setMessage((prevMessages) => [...prevMessages, message]);
  }, []);

  const ctxValue: IQAContext = useMemo(
    () => ({ messages, addMessage }),
    [messages]
  );

  return <QAContext.Provider value={ctxValue}>{children}</QAContext.Provider>;
};

export function useQAContext() {
  const ctx = useContext(QAContext);
  if (!ctx) {
    throw new Error('useQAContext must be used within a QAProvider');
  }
  return ctx;
}
