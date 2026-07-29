import assert from "node:assert/strict";
import type { AddressInfo } from "node:net";
import http from "node:http";
import test from "node:test";
import express from "express";
import {
  handleChat,
  resolveGeminiRequestTimeoutMs,
} from "./chatController.js";

interface TestHttpResponse {
  status: number;
  headers: http.IncomingHttpHeaders;
  body: string;
}

const encoder = new TextEncoder();

function restoreEnvironmentValue(name: string, value: string | undefined) {
  if (value === undefined) {
    delete process.env[name];
  } else {
    process.env[name] = value;
  }
}

async function closeServer(server: http.Server) {
  await new Promise<void>((resolve, reject) => {
    server.close((error) => error ? reject(error) : resolve());
  });
}

async function withChatServer<T>(
  upstreamFetch: typeof fetch,
  timeoutMs: number,
  run: (port: number) => Promise<T>,
): Promise<T> {
  const originalFetch = globalThis.fetch;
  const originalApiKey = process.env.GEMINI_API_KEY;
  const originalTimeout = process.env.GEMINI_REQUEST_TIMEOUT_MS;
  const originalNodeEnv = process.env.NODE_ENV;
  const app = express();

  globalThis.fetch = upstreamFetch;
  process.env.GEMINI_API_KEY = "test-api-key";
  process.env.GEMINI_REQUEST_TIMEOUT_MS = String(timeoutMs);
  process.env.NODE_ENV = "production";
  app.use(express.json());
  app.post("/chat", handleChat);

  const server = await new Promise<http.Server>((resolve) => {
    const listeningServer = app.listen(0, () => resolve(listeningServer));
  });
  const { port } = server.address() as AddressInfo;

  try {
    return await run(port);
  } finally {
    await closeServer(server);
    globalThis.fetch = originalFetch;
    restoreEnvironmentValue("GEMINI_API_KEY", originalApiKey);
    restoreEnvironmentValue("GEMINI_REQUEST_TIMEOUT_MS", originalTimeout);
    restoreEnvironmentValue("NODE_ENV", originalNodeEnv);
  }
}

function postChat(port: number): Promise<TestHttpResponse> {
  const body = JSON.stringify({
    messages: [{ role: "user", content: "Hello" }],
  });

  return new Promise((resolve, reject) => {
    const request = http.request({
      hostname: "127.0.0.1",
      port,
      path: "/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (response) => {
      const chunks: Buffer[] = [];
      response.on("data", (chunk: Buffer) => chunks.push(chunk));
      response.on("end", () => resolve({
        status: response.statusCode ?? 0,
        headers: response.headers,
        body: Buffer.concat(chunks).toString("utf8"),
      }));
    });

    request.on("error", reject);
    request.end(body);
  });
}

function disconnectChatAfterFirstChunk(port: number): Promise<void> {
  const body = JSON.stringify({
    messages: [{ role: "user", content: "Hello" }],
  });

  return new Promise((resolve, reject) => {
    const request = http.request({
      hostname: "127.0.0.1",
      port,
      path: "/chat",
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Content-Length": Buffer.byteLength(body),
      },
    }, (response) => {
      let receivedData = false;

      response.once("data", () => {
        receivedData = true;
        response.destroy();
        resolve();
      });
      response.on("error", (error) => {
        if (!receivedData) reject(error);
      });
    });

    request.on("error", reject);
    request.end(body);
  });
}

async function expectPromptResolution(promise: Promise<void>) {
  let deadline: ReturnType<typeof setTimeout> | undefined;
  const timeout = new Promise<never>((_resolve, reject) => {
    deadline = setTimeout(() => reject(new Error("Timed out waiting for cancellation")), 500);
  });

  try {
    await Promise.race([promise, timeout]);
  } finally {
    if (deadline !== undefined) clearTimeout(deadline);
  }
}

function geminiSseEvent(
  text: string,
  options: {
    finishReason?: string;
    usageMetadata?: {
      promptTokenCount: number;
      candidatesTokenCount: number;
      totalTokenCount: number;
    };
  } = {},
) {
  return `data: ${JSON.stringify({
    candidates: [{
      index: 0,
      content: { role: "model", parts: [{ text }] },
      ...(options.finishReason ? { finishReason: options.finishReason } : {}),
    }],
    ...(options.usageMetadata ? { usageMetadata: options.usageMetadata } : {}),
  })}\n\n`;
}

test("resolveGeminiRequestTimeoutMs uses a bounded positive timeout", () => {
  assert.equal(resolveGeminiRequestTimeoutMs(undefined), 30_000);
  assert.equal(resolveGeminiRequestTimeoutMs(""), 30_000);
  assert.equal(resolveGeminiRequestTimeoutMs("invalid"), 30_000);
  assert.equal(resolveGeminiRequestTimeoutMs("-1"), 30_000);
  assert.equal(resolveGeminiRequestTimeoutMs("0.5"), 30_000);
  assert.equal(resolveGeminiRequestTimeoutMs("2500.9"), 2_500);
  assert.equal(resolveGeminiRequestTimeoutMs("999999"), 120_000);
});

test("handleChat streams deltas followed by completion metadata", async () => {
  const firstEvent = geminiSseEvent("Hello ");
  const secondEvent = geminiSseEvent("world", {
    finishReason: "STOP",
    usageMetadata: {
      promptTokenCount: 10,
      candidatesTokenCount: 2,
      totalTokenCount: 12,
    },
  });
  const bytes = encoder.encode(firstEvent + secondEvent);
  const upstreamFetch: typeof fetch = async () => new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(bytes.slice(0, 17));
        controller.enqueue(bytes.slice(17, firstEvent.length + 5));
        controller.enqueue(bytes.slice(firstEvent.length + 5));
        controller.close();
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } },
  );

  await withChatServer(upstreamFetch, 1_000, async (port) => {
    const response = await postChat(port);
    const events = response.body.trim().split("\n").map((line) => JSON.parse(line));

    assert.equal(response.status, 200);
    assert.match(response.headers["content-type"] ?? "", /application\/x-ndjson/);
    assert.deepEqual(events.map((event) => event.type), ["delta", "delta", "done"]);
    assert.equal(events[0].text, "Hello ");
    assert.equal(events[1].text, "world");
    assert.deepEqual(events[2].tokenInfo, {
      promptTokenCount: 10,
      candidatesTokenCount: 2,
      totalTokenCount: 12,
      finishReason: "STOP",
    });
  });
});

test("handleChat returns 504 JSON when Gemini times out before streaming", async () => {
  const upstreamFetch: typeof fetch = async (_input, init) => new Promise<Response>((_resolve, reject) => {
    init?.signal?.addEventListener("abort", () => {
      reject(new DOMException("The operation was aborted", "AbortError"));
    }, { once: true });
  });

  await withChatServer(upstreamFetch, 20, async (port) => {
    const originalError = console.error;
    console.error = () => undefined;
    try {
      const response = await postChat(port);
      assert.equal(response.status, 504);
      assert.match(response.headers["content-type"] ?? "", /application\/json/);
      assert.deepEqual(JSON.parse(response.body), {
        error: "The response timed out. Please try again.",
      });
    } finally {
      console.error = originalError;
    }
  });
});

test("handleChat ends an active stream with an error event on timeout", async () => {
  const firstEvent = geminiSseEvent("partial response");
  const upstreamFetch: typeof fetch = async (_input, init) => new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(firstEvent));
        init?.signal?.addEventListener("abort", () => {
          controller.error(new DOMException("The operation was aborted", "AbortError"));
        }, { once: true });
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } },
  );

  await withChatServer(upstreamFetch, 20, async (port) => {
    const originalError = console.error;
    console.error = () => undefined;
    try {
      const response = await postChat(port);
      const events = response.body.trim().split("\n").map((line) => JSON.parse(line));

      assert.equal(response.status, 200);
      assert.deepEqual(events, [
        { type: "delta", text: "partial response" },
        { type: "error", error: "The response timed out. Please try again." },
      ]);
    } finally {
      console.error = originalError;
    }
  });
});

test("handleChat aborts the Gemini stream after the client disconnects", async () => {
  const firstEvent = geminiSseEvent("partial response");
  let resolveUpstreamAbort: (() => void) | undefined;
  const upstreamAborted = new Promise<void>((resolve) => {
    resolveUpstreamAbort = resolve;
  });
  const upstreamFetch: typeof fetch = async (_input, init) => new Response(
    new ReadableStream<Uint8Array>({
      start(controller) {
        controller.enqueue(encoder.encode(firstEvent));
        init?.signal?.addEventListener("abort", () => {
          resolveUpstreamAbort?.();
          controller.close();
        }, { once: true });
      },
    }),
    { status: 200, headers: { "Content-Type": "text/event-stream" } },
  );

  await withChatServer(upstreamFetch, 1_000, async (port) => {
    await disconnectChatAfterFirstChunk(port);
    await expectPromptResolution(upstreamAborted);
  });
});
