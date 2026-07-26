import { streamText, UIMessage, convertToModelMessages } from "ai";

// Allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const {
    messages,
    model,
    webSearch,
    datasetMetadata,
  }: {
    messages: UIMessage[];
    model: string;
    webSearch: boolean;
    datasetMetadata?: Array<{
      name: string;
      size?: number;
      type: string;
      url?: string;
    }>;
  } = await req.json();

  const datasetContext = datasetMetadata?.length
    ? `The user attached dataset files: ${datasetMetadata
        .map(({ name, type, size }) => {
          const sizeText = typeof size === "number" ? ` (${size} bytes)` : "";
          return `${name} (${type})${sizeText}`;
        })
        .join("; ")}.`
    : "";

  const result = streamText({
    model: webSearch ? "perplexity/sonar" : model,
    messages: await convertToModelMessages(messages),
    system: [
      "You are a helpful assistant that can answer questions and help with tasks",
      datasetContext,
    ]
      .filter(Boolean)
      .join("\n"),
  });

  // send sources and reasoning back to the client
  return result.toUIMessageStreamResponse({
    onError: (error) =>
      error instanceof Error ? error.message : "An error occurred.",
    sendReasoning: true,
    sendSources: true,
  });
}
