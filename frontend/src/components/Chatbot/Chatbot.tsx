import React, { useState, useRef, useEffect } from 'react';
import styles from './Chatbot.module.css';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatApiResponse {
  reply?: string;
  tokenInfo?: {
    promptTokenCount?: number;
    candidatesTokenCount?: number;
    totalTokenCount?: number;
    finishReason?: string;
  };
  contextInfo?: {
    dataUpdatedAt?: string;
    retrievedSections?: string[];
  };
}

type ChatStreamEvent =
  | { type: 'delta'; text: string }
  | {
      type: 'done';
      tokenInfo?: ChatApiResponse['tokenInfo'];
      contextInfo?: ChatApiResponse['contextInfo'];
    }
  | { type: 'error'; error: string };

const parseChatStreamEvent = (line: string): ChatStreamEvent => {
  const event = JSON.parse(line) as Partial<ChatStreamEvent>;

  if (event.type === 'delta' && typeof event.text === 'string') {
    return { type: 'delta', text: event.text };
  }

  if (event.type === 'done') {
    return {
      type: 'done',
      tokenInfo: event.tokenInfo,
      contextInfo: event.contextInfo,
    };
  }

  if (event.type === 'error' && typeof event.error === 'string') {
    return { type: 'error', error: event.error };
  }

  throw new Error('Received an invalid chat stream event');
};

const consumeChatStream = async (
  response: Response,
  onDelta: (text: string, fullReply: string) => void,
): Promise<{ reply: string; apiResponse: ChatApiResponse }> => {
  if (!response.body) {
    throw new Error('Streaming is not supported by this browser');
  }

  const reader = response.body.getReader();
  const decoder = new TextDecoder();
  let buffer = '';
  let reply = '';
  let apiResponse: ChatApiResponse = {};
  let receivedDoneEvent = false;

  const processLine = (line: string) => {
    const trimmedLine = line.trim();
    if (!trimmedLine) return;

    const event = parseChatStreamEvent(trimmedLine);

    if (event.type === 'delta') {
      reply += event.text;
      onDelta(event.text, reply);
      return;
    }

    if (event.type === 'error') {
      throw new Error(event.error);
    }

    receivedDoneEvent = true;
    apiResponse = {
      tokenInfo: event.tokenInfo,
      contextInfo: event.contextInfo,
    };
  };

  try {
    while (true) {
      const { value, done } = await reader.read();
      if (done) break;

      buffer += decoder.decode(value, { stream: true });
      const lines = buffer.split('\n');
      buffer = lines.pop() ?? '';
      lines.forEach(processLine);
    }

    buffer += decoder.decode();
    processLine(buffer);

    if (!receivedDoneEvent) {
      throw new Error('The chat stream ended unexpectedly');
    }

    return { reply, apiResponse };
  } catch (error) {
    await reader.cancel().catch(() => undefined);
    throw error;
  } finally {
    reader.releaseLock();
  }
};

const conversationStorageKey = 'portfolio-chat-conversation-id';

const createUuid = (): string => {
  if (typeof crypto !== 'undefined' && typeof crypto.randomUUID === 'function') {
    return crypto.randomUUID();
  }

  const bytes = new Uint8Array(16);
  if (typeof crypto !== 'undefined' && typeof crypto.getRandomValues === 'function') {
    crypto.getRandomValues(bytes);
  } else {
    for (let index = 0; index < bytes.length; index += 1) {
      bytes[index] = Math.floor(Math.random() * 256);
    }
  }

  bytes[6] = (bytes[6] & 0x0f) | 0x40;
  bytes[8] = (bytes[8] & 0x3f) | 0x80;
  const hex = Array.from(bytes, (byte) => byte.toString(16).padStart(2, '0')).join('');

  return `${hex.slice(0, 8)}-${hex.slice(8, 12)}-${hex.slice(12, 16)}-${hex.slice(16, 20)}-${hex.slice(20)}`;
};

const saveConversationId = (conversationId: string): void => {
  try {
    window.localStorage.setItem(conversationStorageKey, conversationId);
  } catch {
    // Storage can be unavailable in strict privacy modes. The in-memory ID
    // still groups all turns until the page is refreshed.
  }
};

const getConversationId = (): string => {
  try {
    const storedId = window.localStorage.getItem(conversationStorageKey);
    if (storedId) return storedId;
  } catch {
    // Fall through and create an in-memory conversation ID.
  }

  const conversationId = createUuid();
  saveConversationId(conversationId);
  return conversationId;
};

const chatHistoryApiUrl = import.meta.env.VITE_CHAT_HISTORY_API_URL?.trim()
  || (import.meta.env.DEV
    ? 'http://localhost:8000/api/chat-history'
    : `${import.meta.env.BASE_URL}api/chat-history`);

const recordChatTurn = async ({
  conversationId,
  turnId,
  userMessage,
  assistantMessage,
  status,
  apiResponse,
}: {
  conversationId: string;
  turnId: string;
  userMessage: string;
  assistantMessage: string;
  status: 'completed' | 'error';
  apiResponse?: ChatApiResponse;
}): Promise<void> => {
  const response = await fetch(chatHistoryApiUrl, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    keepalive: true,
    body: JSON.stringify({
      conversationId,
      turnId,
      userMessage,
      assistantMessage,
      status,
      metadata: {
        tokenInfo: apiResponse?.tokenInfo ?? {},
        contextInfo: apiResponse?.contextInfo ?? {},
      },
    }),
  });

  if (!response.ok) {
    throw new Error(`Chat history API returned ${response.status}`);
  }
};

const welcomeMessage: Message = {
  role: 'assistant',
  content: 'Hi! Ask me about Koh Wei Zhen\'s experience and projects, or tell me about an opportunity—a role, client project, product idea, or collaboration. I\'ll connect it with relevant work and help you find a practical next step.'
};

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
    // Convert URLs to clickable links (must be before line breaks)
    .replace(/(https?:\/\/[^\s<]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>')
    // Convert line breaks to <br>
    .replace(/\n/g, '<br>');
};

const Chatbot: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([welcomeMessage]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [isStreaming, setIsStreaming] = useState(false);
  const conversationIdRef = useRef(getConversationId());
  const activeRequestRef = useRef<AbortController | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const chatContainerRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => () => {
    activeRequestRef.current?.abort();
  }, []);

  const handleSendMessage = async () => {
    if (!inputValue.trim() || isLoading) return;

    const userMessage: Message = {
      role: 'user',
      content: inputValue.trim()
    };

    const newMessages = [...messages, userMessage];
    const conversationId = conversationIdRef.current;
    const turnId = createUuid();
    const requestController = new AbortController();
    activeRequestRef.current = requestController;
    setMessages(newMessages);
    setInputValue('');
    setIsLoading(true);
    setIsStreaming(false);

    let streamedReply = '';

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
        }),
        signal: requestController.signal,
      });

      if (!response.ok) {
        let errorMessage = 'Failed to get response';

        try {
          const errorData = await response.json() as { error?: string };
          errorMessage = errorData.error || errorMessage;
        } catch {
          // Keep the generic message when the server did not return JSON.
        }

        throw new Error(errorMessage);
      }

      const contentType = response.headers.get('Content-Type') || '';
      let data: ChatApiResponse;
      let replyContent: string;

      if (contentType.includes('application/x-ndjson')) {
        const streamedResponse = await consumeChatStream(
          response,
          (_text, fullReply) => {
            streamedReply = fullReply;
            setIsStreaming(true);
            setMessages([...newMessages, {
              role: 'assistant',
              content: fullReply,
            }]);
          },
        );
        data = streamedResponse.apiResponse;
        replyContent = streamedResponse.reply;
      } else {
        // Keep compatibility with a backend deployment that still returns JSON.
        data = await response.json() as ChatApiResponse;
        replyContent = data.reply || '';
      }
      
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
      
      if (!replyContent.trim()) {
        replyContent = 'I apologize, but I couldn\'t generate a response. Please try asking your question differently.';
      }
      
      setMessages([...newMessages, {
        role: 'assistant',
        content: replyContent
      }]);

      void recordChatTurn({
        conversationId,
        turnId,
        userMessage: userMessage.content,
        assistantMessage: replyContent,
        status: 'completed',
        apiResponse: data,
      }).catch((historyError) => {
        console.warn('Unable to record chat history:', historyError);
      });
    } catch (error) {
      if (requestController.signal.aborted) {
        return;
      }

      console.error('Error sending message:', error);
      const errorReply = streamedReply
        ? `${streamedReply}\n\nSorry, the response was interrupted. Please try again.`
        : 'Sorry, I encountered an error. Please try again later.';
      setMessages([...newMessages, {
        role: 'assistant',
        content: errorReply
      }]);

      void recordChatTurn({
        conversationId,
        turnId,
        userMessage: userMessage.content,
        assistantMessage: errorReply,
        status: 'error',
      }).catch((historyError) => {
        console.warn('Unable to record failed chat turn:', historyError);
      });
    } finally {
      if (activeRequestRef.current === requestController) {
        activeRequestRef.current = null;
        setIsLoading(false);
        setIsStreaming(false);
      }
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
    activeRequestRef.current?.abort();
    activeRequestRef.current = null;
    const conversationId = createUuid();
    conversationIdRef.current = conversationId;
    saveConversationId(conversationId);
    setMessages([welcomeMessage]);
    setInputValue('');
    setIsLoading(false);
    setIsStreaming(false);
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
            {isLoading && !isStreaming && (
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
              placeholder="Ask about his work or explore an opportunity..."
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
