
import React, { createContext, useContext, useState, ReactNode, useEffect } from 'react';
interface Message {
  _id: string;
  name: string;
  email: string;
  phone: string;
  message: string;
}

interface FormContextType {
  messages: Message[];
  addMessage: (message: Message) => void;
  deleteMessage: (id: string) => void;
}

const FormContext = createContext<FormContextType | undefined>(undefined);

export const useFormContext = (): FormContextType => {
  const context = useContext(FormContext);
  if (!context) {
    throw new Error('useFormContext must be used within a FormProvider');
  }
  return context;
};

interface FormProviderProps {
  children: ReactNode;
}

export const FormProvider: React.FC<FormProviderProps> = ({ children }) => {
  const [messages, setMessages] = useState<Message[]>(() => {
    const savedMessages = localStorage.getItem('messages');
    return savedMessages ? JSON.parse(savedMessages) : [];
  });

  useEffect(() => {
    localStorage.setItem('messages', JSON.stringify(messages));
  }, [messages]);

  const addMessage = (message: Message) => {
    setMessages([...messages, message]);
  };

  const deleteMessage = (id: string) => {
    setMessages(prevMessages => prevMessages.filter(message => message._id !== id));
  };

  return (
    <FormContext.Provider value={{ messages, addMessage, deleteMessage }}>
      {children}
    </FormContext.Provider>
  );
};
