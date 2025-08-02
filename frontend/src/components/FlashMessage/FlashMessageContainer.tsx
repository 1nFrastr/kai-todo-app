import React from 'react';
import { useFlashStore } from '../../stores/flashStore';
import FlashMessage from '../FlashMessage/FlashMessage';

const FlashMessageContainer: React.FC = () => {
  const { messages, removeMessage } = useFlashStore();

  return (
    <div className="flash-message-container">
      {messages.map((message) => (
        <FlashMessage
          key={message.id}
          message={message.message}
          type={message.type}
          onClose={() => removeMessage(message.id)}
          duration={message.duration}
        />
      ))}
    </div>
  );
};

export default FlashMessageContainer;
