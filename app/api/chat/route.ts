import { anthropic } from "@ai-sdk/anthropic";
import {
  convertToModelMessages,
  createUIMessageStreamResponse,
  streamText,
  toUIMessageStream,
  UIMessage,
} from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

// The model is chosen here, not by the client. ADR-0003's reasoning about what
// reaches a third-party model provider does not survive letting the client pick
// the provider, so the request body carries messages only.
const chatModel = anthropic("claude-opus-5");

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: chatModel,
    messages: await convertToModelMessages(messages),
    system:
      "You are a helpful assistant that can answer questions and help with tasks",
  });

  // send sources and reasoning back to the client
  return createUIMessageStreamResponse({
    stream: toUIMessageStream({
      stream: result.stream,
      onError: (error) =>
        error instanceof Error ? error.message : "An error occurred.",
      sendReasoning: true,
      sendSources: true,
    }),
  });
}
