import { afterAll, expect, test } from "vitest";
import type { UIMessage } from "ai";
import { Prisma } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

// A representative sample of the AI SDK's `UIMessage["parts"]` shape,
// covering the part types Message.parts needs to preserve losslessly —
// including a tool part's nested input/output objects, which is the kind
// of variable, nested structure ADR-0002 chose JSON storage to avoid
// translating.
const sampleParts: UIMessage["parts"] = [
  { type: "text", text: "What's the weather in Paris?" },
  {
    type: "reasoning",
    text: "The user wants current weather, so I should check a source.",
  },
  {
    type: "source-url",
    sourceId: "src-1",
    url: "https://weather.example.com/paris",
    title: "Paris weather",
  },
  {
    type: "file",
    mediaType: "image/png",
    filename: "paris-forecast.png",
    url: "https://weather.example.com/paris-forecast.png",
  },
  {
    type: "dynamic-tool",
    toolName: "getWeather",
    toolCallId: "call-1",
    state: "output-available",
    input: { city: "Paris", units: "celsius" },
    output: { temperature: 22, condition: "sunny", forecast: [18, 20, 22] },
  },
];

let conversationId: string | undefined;

afterAll(async () => {
  if (conversationId) {
    await prisma.conversation.delete({ where: { id: conversationId } });
  }
  await prisma.$disconnect();
});

test("Message.parts round-trips a UIMessage parts array without loss", async () => {
  const conversation = await prisma.conversation.create({
    data: { visitorId: "test-visitor" },
  });
  conversationId = conversation.id;

  const created = await prisma.message.create({
    data: {
      conversationId: conversation.id,
      role: "assistant",
      parts: sampleParts as Prisma.InputJsonValue,
    },
  });

  const stored = await prisma.message.findUniqueOrThrow({
    where: { id: created.id },
  });

  expect(stored.parts).toEqual(sampleParts);
});
