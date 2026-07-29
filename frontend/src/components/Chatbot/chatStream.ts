export interface ChatApiResponse {
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

export const parseChatStreamEvent = (line: string): ChatStreamEvent => {
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

export const consumeChatStream = async (
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
