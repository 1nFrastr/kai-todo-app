import React from 'react';
import './FlashMessage.scss';

export interface FlashMessageProps {
  message: string;
  type: 'success' | 'error' | 'warning' | 'info';
  onClose: () => void;
  autoClose?: boolean;
  duration?: number;
}

const FlashMessage: React.FC<FlashMessageProps> = ({
  message,
  type,
  onClose,
  autoClose = true,
  duration = 5000
}) => {
  React.useEffect(() => {
    if (autoClose) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [autoClose, duration, onClose]);

  const getIcon = () => {
    switch (type) {
      case 'success':
        return '✅';
      case 'error':
        return '❌';
      case 'warning':
        return '⚠️';
      case 'info':
        return 'ℹ️';
      default:
        return '';
    }
  };

  return (
    <div className={`flash-message flash-message--${type}`}>
      <div className="flash-message__content">
        <span className="flash-message__icon">{getIcon()}</span>
        <span className="flash-message__text">{message}</span>
      </div>
      <button
        className="flash-message__close"
        onClick={onClose}
        type="button"
        aria-label="Close message"
      >
        ×
      </button>
    </div>
  );
};

export default FlashMessage;
