import { describe, expect, it, vi } from 'vitest';
import { consumeChatStream, parseChatStreamEvent } from './chatStream';

const encoder = new TextEncoder();

const responseFromChunks = (
  chunks: Uint8Array[],
  onCancel?: () => void,
  close = true,
): Response => new Response(new ReadableStream<Uint8Array>({
  start(controller) {
    chunks.forEach((chunk) => controller.enqueue(chunk));
    if (close) controller.close();
  },
  cancel() {
    onCancel?.();
  },
}));

describe('consumeChatStream', () => {
  it('reassembles fragmented NDJSON and split UTF-8 characters', async () => {
    const payload = [
      JSON.stringify({ type: 'delta', text: 'Hello 👋 ' }),
      JSON.stringify({ type: 'delta', text: 'world' }),
      JSON.stringify({
        type: 'done',
        tokenInfo: { totalTokenCount: 42, finishReason: 'STOP' },
        contextInfo: { retrievedSections: ['profile'] },
      }),
      '',
    ].join('\n');
    const bytes = encoder.encode(payload);
    const emojiStart = bytes.indexOf(0xf0);
    const response = responseFromChunks([
      bytes.slice(0, emojiStart + 2),
      bytes.slice(emojiStart + 2, emojiStart + 9),
      bytes.slice(emojiStart + 9, bytes.length - 5),
      bytes.slice(bytes.length - 5),
    ]);
    const onDelta = vi.fn();

    const result = await consumeChatStream(response, onDelta);

    expect(result).toEqual({
      reply: 'Hello 👋 world',
      apiResponse: {
        tokenInfo: { totalTokenCount: 42, finishReason: 'STOP' },
        contextInfo: { retrievedSections: ['profile'] },
      },
    });
    expect(onDelta.mock.calls).toEqual([
      ['Hello 👋 ', 'Hello 👋 '],
      ['world', 'Hello 👋 world'],
    ]);
  });

  it('rejects a stream that closes without a done event', async () => {
    const response = responseFromChunks([
      encoder.encode(`${JSON.stringify({ type: 'delta', text: 'partial' })}\n`),
    ]);

    await expect(consumeChatStream(response, vi.fn())).rejects.toThrow(
      'The chat stream ended unexpectedly',
    );
  });

  it('propagates server errors and cancels the open response body', async () => {
    const onCancel = vi.fn();
    const onDelta = vi.fn();
    const response = responseFromChunks([
      encoder.encode([
        JSON.stringify({ type: 'delta', text: 'partial' }),
        JSON.stringify({ type: 'error', error: 'The response timed out.' }),
        '',
      ].join('\n')),
    ], onCancel, false);

    await expect(consumeChatStream(response, onDelta)).rejects.toThrow(
      'The response timed out.',
    );
    expect(onDelta).toHaveBeenCalledWith('partial', 'partial');
    expect(onCancel).toHaveBeenCalledOnce();
  });

  it('rejects unknown event shapes', () => {
    expect(() => parseChatStreamEvent('{"type":"delta","text":7}')).toThrow(
      'Received an invalid chat stream event',
    );
  });
});
