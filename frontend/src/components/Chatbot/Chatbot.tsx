import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

// Function to format Gemini response with proper styling
const formatGeminiText = (text: string): string => {
  return text
    // Convert **bold** to <strong>
    .replace(/\*\*\*(.+?)\*\*\*/g, '<strong><em>$1</em></strong>')
    .replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>')
    // Convert *italic* to <em>
    .replace(/\*(.+?)\*/g, '<em>$1</em>')
    // Convert `code` to <code>
    .replace(/`([^`]+)`/g, '<code>$1</code>')
    // Convert ```code blocks``` to <pre><code>
    .replace(/```([\s\S]+?)```/g, '<pre><code>$1</code></pre>')
    // Convert line breaks to <br>
    .replace(/\n/g, '<br>');
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content: 'Hi! I\'m here to help you learn more about my portfolio. Feel free to ask me anything!'
    }
  ]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim()
    };

    const newMessages = [...messages, userMessage];
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);

    try {
      // Use localhost in development, production URL otherwise
      const apiUrl = import.meta.env.DEV 
        ? 'http://localhost:3000/api/chat'
        : 'https://myself-phi-opal.vercel.app/api/chat';
      
      const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          messages: newMessages
        })
      });

      if (!response.ok) {
        throw new Error('Failed to get response');
      }

      const data = await response.json();
      
      // Debug logging
      // console.log('📦 Full API Response:', data);
      // console.log('💬 Reply content:', data.reply);
      // console.log('📏 Reply length:', data.reply?.length);
      
      // Log token usage if available
      if (data.tokenInfo) {
        console.log('🤖 Token Usage:', {
          prompt: data.tokenInfo.promptTokenCount,
          response: data.tokenInfo.candidatesTokenCount,
          total: data.tokenInfo.totalTokenCount
        });
      }
      
      // Check if reply is empty
      const replyContent = data.reply || 'I apologize, but I couldn\'t generate a response. Please try asking your question differently.';
      
      setMessages([...newMessages, {
        role: 'assistant',
        content: replyContent
      }]);
    } catch (error) {
      console.error('Error sending message:', error);
      setMessages([...newMessages, {
        role: 'assistant',
        content: 'Sorry, I encountered an error. Please try again later.'
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  const toggleChat = () => {
    setIsOpen(!isOpen);
  };

  const resetChat = () => {
    setMessages([
      {
        role: 'assistant',
        content: 'Hi! I\'m here to help you learn more about my portfolio. Feel free to ask me anything!'
      }
    ]);
    setInputValue('');
  };

  return (
    <>
      {/* Floating Button */}
      <button
        className={`${styles.floatingButton} ${isOpen ? styles.open : ''}`}
        onClick={toggleChat}
        aria-label="Toggle chat"
      >
        {isOpen ? (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
          </svg>
        ) : (
          <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z" />
          </svg>
        )}
      </button>

      {/* Chat Interface */}
      {isOpen && (
        <div className={styles.chatContainer} ref={chatContainerRef}>
          <div className={styles.chatHeader}>
            <h3>Portfolio Assistant</h3>
            <div className={styles.headerButtons}>
              <button 
                className={styles.resetButton} 
                onClick={resetChat}
                aria-label="Reset chat"
                title="Reset chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <polyline points="1 4 1 10 7 10" />
                  <polyline points="23 20 23 14 17 14" />
                  <path d="M20.49 9A9 9 0 0 0 5.64 5.64L1 10m22 4l-4.64 4.36A9 9 0 0 1 3.51 15" />
                </svg>
              </button>
              <button 
                className={styles.closeButton} 
                onClick={toggleChat}
                aria-label="Close chat"
              >
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </div>

          <div className={styles.messagesContainer}>
            {messages.map((message, index) => (
              <div
                key={index}
                className={`${styles.message} ${
                  message.role === 'user' ? styles.userMessage : styles.assistantMessage
                }`}
              >
                {message.role === 'user' ? (
                  <div className={styles.messageContent}>
                    {message.content}
                  </div>
                ) : (
                  <div 
                    className={styles.messageContent}
                    dangerouslySetInnerHTML={{ 
                      __html: formatGeminiText(message.content || '')
                    }}
                  />
                )}
              </div>
            ))}
            {isLoading && (
              <div className={`${styles.message} ${styles.assistantMessage}`}>
                <div className={styles.messageContent}>
                  <div className={styles.typingIndicator}>
                    <span></span>
                    <span></span>
                    <span></span>
                  </div>
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className={styles.inputContainer}>
            <textarea
              className={styles.input}
              value={inputValue}
              onChange={(e) => setInputValue(e.target.value)}
              onKeyPress={handleKeyPress}
              placeholder="Ask me anything..."
              rows={1}
              disabled={isLoading}
            />
            <button
              className={styles.sendButton}
              onClick={handleSendMessage}
              disabled={!inputValue.trim() || isLoading}
              aria-label="Send message"
            >
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <line x1="22" y1="2" x2="11" y2="13" />
                <polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </div>
        </div>
      )}
    </>
  );
};

export default Chatbot;
