"use client";

import {
  Attachment,
  AttachmentPreview,
  AttachmentRemove,
  Attachments,
  type AttachmentData,
} from "@/components/ai-elements/attachments";
import {
  Conversation,
  ConversationContent,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageBranch,
  MessageBranchContent,
  MessageBranchNext,
  MessageBranchPage,
  MessageBranchPrevious,
  MessageBranchSelector,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import {
  ModelSelector,
  ModelSelectorContent,
  ModelSelectorEmpty,
  ModelSelectorGroup,
  ModelSelectorInput,
  ModelSelectorItem,
  ModelSelectorList,
  ModelSelectorLogo,
  ModelSelectorLogoGroup,
  ModelSelectorName,
  ModelSelectorTrigger,
} from "@/components/ai-elements/model-selector";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
  PromptInputButton,
  PromptInputFooter,
  PromptInputHeader,
  PromptInputSubmit,
  PromptInputTextarea,
  PromptInputTools,
  usePromptInputAttachments,
} from "@/components/ai-elements/prompt-input";
import {
  Reasoning,
  ReasoningContent,
  ReasoningTrigger,
} from "@/components/ai-elements/reasoning";
import {
  Source,
  Sources,
  SourcesContent,
  SourcesTrigger,
} from "@/components/ai-elements/sources";
import { SpeechInput } from "@/components/ai-elements/speech-input";
import { Suggestion, Suggestions } from "@/components/ai-elements/suggestion";
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { useChat } from "@ai-sdk/react";
import {
  type ChatTransport,
  DefaultChatTransport,
  simulateReadableStream,
  type SourceUrlUIPart,
  type UIMessage,
  type UIMessageChunk,
} from "ai";
import { CheckIcon, GlobeIcon } from "lucide-react";
import { nanoid } from "nanoid";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

type ChatMessage = UIMessage<{
  versions?: { id: string; content: string }[];
}>;

const initialMessages: ChatMessage[] = [
  {
    id: nanoid(),
    parts: [
      {
        text: "Can you explain how to use React hooks effectively?",
        type: "text",
      },
    ],
    role: "user",
  },
  {
    id: nanoid(),
    parts: [
      {
        input: {
          query: "React hooks best practices",
          source: "react.dev",
        },
        output: `{
  "query": "React hooks best practices",
  "results": [
    {
      "title": "Rules of Hooks",
      "url": "https://react.dev/warnings/invalid-hook-call-warning",
      "snippet": "Hooks must be called at the top level of your React function components or custom hooks. Don't call hooks inside loops, conditions, or nested functions."
    },
    {
      "title": "useState Hook",
      "url": "https://react.dev/reference/react/useState",
      "snippet": "useState is a React Hook that lets you add state to your function components. It returns an array with two values: the current state and a function to update it."
    },
    {
      "title": "useEffect Hook",
      "url": "https://react.dev/reference/react/useEffect",
      "snippet": "useEffect lets you synchronize a component with external systems. It runs after render and can be used to perform side effects like data fetching."
    }
  ]
}`,
        state: "output-available",
        title: "Searching React documentation",
        toolCallId: nanoid(),
        toolName: "mcp",
        type: "dynamic-tool",
      },
      {
        sourceId: nanoid(),
        title: "React Documentation",
        type: "source-url",
        url: "https://react.dev/reference/react",
      },
      {
        sourceId: nanoid(),
        title: "React DOM Documentation",
        type: "source-url",
        url: "https://react.dev/reference/react-dom",
      },
      {
        text: `# React Hooks Best Practices

React hooks are a powerful feature that let you use state and other React features without writing classes. Here are some tips for using them effectively:

## Rules of Hooks

1. **Only call hooks at the top level** of your component or custom hooks
2. **Don't call hooks inside loops, conditions, or nested functions**

## Common Hooks

- **useState**: For local component state
- **useEffect**: For side effects like data fetching
- **useContext**: For consuming context
- **useReducer**: For complex state logic
- **useCallback**: For memoizing functions
- **useMemo**: For memoizing values

## Example of useState and useEffect

\`\`\`jsx
function ProfilePage({ userId }) {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // This runs after render and when userId changes
    fetchUser(userId).then(userData => {
      setUser(userData);
    });
  }, [userId]);

  return user ? <Profile user={user} /> : <Loading />;
}
\`\`\`

Would you like me to explain any specific hook in more detail?`,
        type: "text",
      },
    ],
    role: "assistant",
  },
  {
    id: nanoid(),
    metadata: {
      versions: [
        {
          content:
            "Yes, could you explain useCallback and useMemo in more detail? When should I use one over the other?",
          id: nanoid(),
        },
        {
          content:
            "I'm particularly interested in understanding the performance implications of useCallback and useMemo. Could you break down when each is most appropriate?",
          id: nanoid(),
        },
        {
          content:
            "Thanks for the overview! Could you dive deeper into the specific use cases where useCallback and useMemo make the biggest difference in React applications?",
          id: nanoid(),
        },
      ],
    },
    parts: [
      {
        text: "Yes, could you explain useCallback and useMemo in more detail? When should I use one over the other?",
        type: "text",
      },
    ],
    role: "user",
  },
  {
    id: nanoid(),
    parts: [
      {
        text: `The user is asking for a detailed explanation of useCallback and useMemo. I should provide a clear and concise explanation of each hook's purpose and how they differ.

The useCallback hook is used to memoize functions to prevent unnecessary re-renders of child components that receive functions as props.

The useMemo hook is used to memoize values to avoid expensive recalculations on every render.

Both hooks help with performance optimization, but they serve different purposes.`,
        type: "reasoning",
      },
      {
        text: `## useCallback vs useMemo

Both hooks help with performance optimization, but they serve different purposes:

### useCallback

\`useCallback\` memoizes **functions** to prevent unnecessary re-renders of child components that receive functions as props.

\`\`\`jsx
// Without useCallback - a new function is created on every render
const handleClick = () => {
  console.log(count);
};

// With useCallback - the function is only recreated when dependencies change
const handleClick = useCallback(() => {
  console.log(count);
}, [count]);
\`\`\`

### useMemo

\`useMemo\` memoizes **values** to avoid expensive recalculations on every render.

\`\`\`jsx
// Without useMemo - expensive calculation runs on every render
const sortedList = expensiveSort(items);

// With useMemo - calculation only runs when items change
const sortedList = useMemo(() => expensiveSort(items), [items]);
\`\`\`

### When to use which?

- Use **useCallback** when:
  - Passing callbacks to optimized child components that rely on reference equality
  - Working with event handlers that you pass to child components

- Use **useMemo** when:
  - You have computationally expensive calculations
  - You want to avoid recreating objects that are used as dependencies for other hooks

### Performance Note

Don't overuse these hooks! They come with their own overhead. Only use them when you have identified a genuine performance issue.`,
        type: "text",
      },
    ],
    role: "assistant",
  },
];

const models = [
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o",
    name: "GPT-4o",
    providers: ["openai", "azure"],
  },
  {
    chef: "OpenAI",
    chefSlug: "openai",
    id: "gpt-4o-mini",
    name: "GPT-4o Mini",
    providers: ["openai", "azure"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-opus-4-20250514",
    name: "Claude 4 Opus",
    providers: ["anthropic", "azure", "google", "amazon-bedrock"],
  },
  {
    chef: "Anthropic",
    chefSlug: "anthropic",
    id: "claude-sonnet-4-20250514",
    name: "Claude 4 Sonnet",
    providers: ["anthropic", "azure", "google", "amazon-bedrock"],
  },
  {
    chef: "Google",
    chefSlug: "google",
    id: "gemini-2.0-flash-exp",
    name: "Gemini 2.0 Flash",
    providers: ["google"],
  },
];

// Canned demo responses for the suggested prompts, keyed by suggestion text.
// Clicking a suggestion renders one of these locally instead of calling the
// real API, while custom typed messages still get a real model response.
// The suggestion buttons are derived from these same keys so there's a
// single source of truth for which suggestions exist.
const mockResponses: Record<string, string> = {
  "What are the latest trends in AI?":
    "Some of the biggest trends right now include multimodal models that handle text, images, and audio together, smaller and more efficient models that can run on-device, agentic workflows where models plan and use tools autonomously, and retrieval-augmented generation for grounding responses in up-to-date or proprietary data.",
  "How does machine learning work?":
    "At a high level, machine learning works by feeding a model lots of example data, letting it find patterns by adjusting internal parameters to minimize prediction error, and then using those learned patterns to make predictions on new, unseen data. The 'learning' is really just iterative optimization\u2014gradient descent being the most common technique.",
  "Explain quantum computing":
    "Quantum computing uses qubits instead of classical bits. Unlike a bit, which is either 0 or 1, a qubit can exist in a superposition of both states at once, and multiple qubits can become entangled so their states are correlated. This lets quantum computers explore many possibilities in parallel for certain problems, like factoring large numbers or simulating molecules, though they're not simply 'faster' at everything.",
  "Best practices for React development":
    "A few solid habits: keep components small and focused, lift state up only as far as it needs to go, memoize expensive computations with useMemo/useCallback rather than by default, prefer composition over deeply nested prop drilling, and write components that are easy to test in isolation.",
  "Tell me about TypeScript benefits":
    "TypeScript adds static typing on top of JavaScript, which catches a lot of bugs at compile time instead of runtime. It also makes refactoring much safer, gives you better autocomplete and inline documentation in your editor, and makes the intent of function signatures and data shapes explicit for other developers.",
  "How to optimize database queries?":
    "Start by adding indexes on columns you frequently filter or join on, avoid select * in favor of only the columns you need, and use EXPLAIN/EXPLAIN ANALYZE to see how the query planner is executing your query. Batching writes, avoiding N+1 query patterns, and caching frequently read data can also make a big difference.",
  "What is the difference between SQL and NoSQL?":
    "SQL databases store data in structured tables with fixed schemas and support powerful joins and transactions, making them a good fit for relational data with strong consistency needs. NoSQL databases (document, key-value, column, or graph stores) trade some of that structure for flexible schemas and horizontal scalability, which suits large, rapidly changing, or unstructured datasets.",
  "Explain cloud computing basics":
    "Cloud computing means renting computing resources\u2014servers, storage, databases, networking\u2014from a provider over the internet instead of owning physical hardware. It's usually split into IaaS (raw infrastructure), PaaS (managed platforms for building apps), and SaaS (fully hosted applications), and you typically pay only for what you use.",
};

const suggestions = Object.keys(mockResponses);

// Fake-streams a canned response as UIMessageChunks (word by word, with a
// small delay) so it renders through the same streaming pipeline as a real
// response, instead of appearing all at once.
const createMockResponseStream = (
  text: string,
): ReadableStream<UIMessageChunk> => {
  const textId = nanoid();
  const words = text.split(" ");

  return simulateReadableStream<UIMessageChunk>({
    chunks: [
      { type: "start" },
      { type: "start-step" },
      { type: "text-start", id: textId },
      ...words.map((word, index) => ({
        delta: index === 0 ? word : ` ${word}`,
        id: textId,
        type: "text-delta" as const,
      })),
      { id: textId, type: "text-end" },
      { type: "finish-step" },
      { type: "finish" },
    ],
    chunkDelayInMs: Math.random() * 30 + 40,
    initialDelayInMs: Math.random() * 600 + 200,
  });
};

// Wraps the real transport: suggested prompts resolve to a canned response
// streamed locally, so the demo works without a real model call. Custom
// messages still fall through to the real transport.
class MockableChatTransport implements ChatTransport<ChatMessage> {
  constructor(private realTransport: ChatTransport<ChatMessage>) {}

  async sendMessages(
    options: Parameters<ChatTransport<ChatMessage>["sendMessages"]>[0],
  ) {
    const lastMessage = options.messages.at(-1);
    const lastMessageText =
      lastMessage?.role === "user"
        ? lastMessage.parts.find((part) => part.type === "text")?.text
        : undefined;
    const mockResponse = lastMessageText
      ? mockResponses[lastMessageText]
      : undefined;

    if (mockResponse) {
      return createMockResponseStream(mockResponse);
    }

    return this.realTransport.sendMessages(options);
  }

  reconnectToStream(
    options: Parameters<ChatTransport<ChatMessage>["reconnectToStream"]>[0],
  ) {
    return this.realTransport.reconnectToStream(options);
  }
}

const chefs = ["OpenAI", "Anthropic", "Google"];

const AttachmentItem = ({
  attachment,
  onRemove,
}: {
  attachment: AttachmentData;
  onRemove: (id: string) => void;
}) => {
  const handleRemove = useCallback(() => {
    onRemove(attachment.id);
  }, [onRemove, attachment.id]);

  return (
    <Attachment data={attachment} onRemove={handleRemove}>
      <AttachmentPreview />
      <AttachmentRemove />
    </Attachment>
  );
};

const PromptInputAttachmentsDisplay = () => {
  const attachments = usePromptInputAttachments();

  const handleRemove = useCallback(
    (id: string) => {
      attachments.remove(id);
    },
    [attachments],
  );

  if (attachments.files.length === 0) {
    return null;
  }

  return (
    <Attachments variant="inline">
      {attachments.files.map((attachment) => (
        <AttachmentItem
          attachment={attachment}
          key={attachment.id}
          onRemove={handleRemove}
        />
      ))}
    </Attachments>
  );
};

const SuggestionItem = ({
  suggestion,
  onClick,
}: {
  suggestion: string;
  onClick: (suggestion: string) => void;
}) => {
  const handleClick = useCallback(() => {
    onClick(suggestion);
  }, [onClick, suggestion]);

  return <Suggestion onClick={handleClick} suggestion={suggestion} />;
};

const ModelItem = ({
  m,
  isSelected,
  onSelect,
}: {
  m: (typeof models)[0];
  isSelected: boolean;
  onSelect: (id: string) => void;
}) => {
  const handleSelect = useCallback(() => {
    onSelect(m.id);
  }, [onSelect, m.id]);

  return (
    <ModelSelectorItem onSelect={handleSelect} value={m.id}>
      <ModelSelectorLogo provider={m.chefSlug} />
      <ModelSelectorName>{m.name}</ModelSelectorName>
      <ModelSelectorLogoGroup>
        {m.providers.map((provider) => (
          <ModelSelectorLogo key={provider} provider={provider} />
        ))}
      </ModelSelectorLogoGroup>
      {isSelected ? (
        <CheckIcon className="ml-auto size-4" />
      ) : (
        <div className="ml-auto size-4" />
      )}
    </ModelSelectorItem>
  );
};

const Example = () => {
  const [model, setModel] = useState<string>(models[0].id);
  const [modelSelectorOpen, setModelSelectorOpen] = useState(false);
  const [text, setText] = useState<string>("");
  const [useWebSearch, setUseWebSearch] = useState<boolean>(false);

  const transport = useMemo(
    () =>
      new MockableChatTransport(new DefaultChatTransport({ api: "/api/chat" })),
    [],
  );

  const { messages, sendMessage, status } = useChat<ChatMessage>({
    messages: initialMessages,
    onError: (error) => {
      toast.error(error.message);
    },
    transport,
  });

  const selectedModelData = useMemo(
    () => models.find((m) => m.id === model),
    [model],
  );

  const handleSubmit = useCallback(
    (message: PromptInputMessage) => {
      const hasText = Boolean(message.text);
      const hasAttachments = Boolean(message.files?.length);

      if (!(hasText || hasAttachments)) {
        return;
      }

      if (message.files?.length) {
        toast.success("Files attached", {
          description: `${message.files.length} file(s) attached to message`,
        });
      }

      sendMessage(
        {
          files: message.files,
          text: message.text || "Sent with attachments",
        },
        { body: { model, webSearch: useWebSearch } },
      );
      setText("");
    },
    [sendMessage, model, useWebSearch],
  );

  const handleSuggestionClick = useCallback(
    (suggestion: string) => {
      sendMessage(
        { text: suggestion },
        { body: { model, webSearch: useWebSearch } },
      );
    },
    [sendMessage, model, useWebSearch],
  );

  const handleTranscriptionChange = useCallback((transcript: string) => {
    setText((prev) => (prev ? `${prev} ${transcript}` : transcript));
  }, []);

  const handleTextChange = useCallback(
    (event: React.ChangeEvent<HTMLTextAreaElement>) => {
      setText(event.target.value);
    },
    [],
  );

  const toggleWebSearch = useCallback(() => {
    setUseWebSearch((prev) => !prev);
  }, []);

  const handleModelSelect = useCallback((modelId: string) => {
    setModel(modelId);
    setModelSelectorOpen(false);
  }, []);

  const isSubmitDisabled = useMemo(
    () => !text.trim() || status === "streaming" || status === "submitted",
    [text, status],
  );

  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.map((message) => {
            const sourceParts = message.parts.filter(
              (part): part is SourceUrlUIPart => part.type === "source-url",
            );
            const firstSourcePartIndex = message.parts.findIndex(
              (part) => part.type === "source-url",
            );

            // Cosmetic-only: some seed messages carry alternate draft
            // versions for demo purposes. This is not wired to sendMessage
            // or regenerate; it just lets you flip through the drafts.
            const versions = message.metadata?.versions;

            if (versions && versions.length > 1) {
              return (
                <MessageBranch defaultBranch={0} key={message.id}>
                  <MessageBranchContent>
                    {versions.map((version) => (
                      <Message from={message.role} key={version.id}>
                        <MessageContent>
                          <MessageResponse>{version.content}</MessageResponse>
                        </MessageContent>
                      </Message>
                    ))}
                  </MessageBranchContent>
                  <MessageBranchSelector>
                    <MessageBranchPrevious />
                    <MessageBranchPage />
                    <MessageBranchNext />
                  </MessageBranchSelector>
                </MessageBranch>
              );
            }

            return (
              <Message from={message.role} key={message.id}>
                <div>
                  {message.parts.map((part, index) => {
                    if (part.type === "source-url") {
                      if (index !== firstSourcePartIndex) {
                        return null;
                      }

                      return (
                        <Sources key={`${message.id}-${index}`}>
                          <SourcesTrigger count={sourceParts.length} />
                          <SourcesContent>
                            {sourceParts.map((sourcePart) => (
                              <Source
                                href={sourcePart.url}
                                key={sourcePart.sourceId}
                                title={sourcePart.title ?? sourcePart.url}
                              />
                            ))}
                          </SourcesContent>
                        </Sources>
                      );
                    }

                    if (part.type === "dynamic-tool") {
                      return (
                        <Tool key={`${message.id}-${index}`}>
                          <ToolHeader
                            state={part.state}
                            title={part.title}
                            toolName={part.toolName}
                            type="dynamic-tool"
                          />
                          <ToolContent>
                            <ToolInput input={part.input} />
                            <ToolOutput
                              errorText={part.errorText}
                              output={part.output}
                            />
                          </ToolContent>
                        </Tool>
                      );
                    }

                    if (part.type === "reasoning") {
                      return (
                        <Reasoning
                          isStreaming={part.state === "streaming"}
                          key={`${message.id}-${index}`}
                        >
                          <ReasoningTrigger />
                          <ReasoningContent>{part.text}</ReasoningContent>
                        </Reasoning>
                      );
                    }

                    if (part.type === "text") {
                      return (
                        <MessageContent key={`${message.id}-${index}`}>
                          <MessageResponse>{part.text}</MessageResponse>
                        </MessageContent>
                      );
                    }

                    return null;
                  })}
                </div>
              </Message>
            );
          })}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="grid shrink-0 gap-4 pt-4">
        <Suggestions className="px-4">
          {suggestions.map((suggestion) => (
            <SuggestionItem
              key={suggestion}
              onClick={handleSuggestionClick}
              suggestion={suggestion}
            />
          ))}
        </Suggestions>
        <div className="w-full px-4 pb-4">
          <PromptInput globalDrop multiple onSubmit={handleSubmit}>
            <PromptInputHeader>
              <PromptInputAttachmentsDisplay />
            </PromptInputHeader>
            <PromptInputBody>
              <PromptInputTextarea onChange={handleTextChange} value={text} />
            </PromptInputBody>
            <PromptInputFooter>
              <PromptInputTools>
                <PromptInputActionMenu>
                  <PromptInputActionMenuTrigger />
                  <PromptInputActionMenuContent>
                    <PromptInputActionAddAttachments />
                  </PromptInputActionMenuContent>
                </PromptInputActionMenu>
                <SpeechInput
                  className="shrink-0"
                  onTranscriptionChange={handleTranscriptionChange}
                  size="icon-sm"
                  variant="ghost"
                />
                <PromptInputButton
                  onClick={toggleWebSearch}
                  variant={useWebSearch ? "default" : "ghost"}
                >
                  <GlobeIcon size={16} />
                  <span>Search</span>
                </PromptInputButton>
                <ModelSelector
                  onOpenChange={setModelSelectorOpen}
                  open={modelSelectorOpen}
                >
                  <ModelSelectorTrigger render={<PromptInputButton />}>
                    {selectedModelData?.chefSlug && (
                      <ModelSelectorLogo
                        provider={selectedModelData.chefSlug}
                      />
                    )}
                    {selectedModelData?.name && (
                      <ModelSelectorName>
                        {selectedModelData.name}
                      </ModelSelectorName>
                    )}
                  </ModelSelectorTrigger>
                  <ModelSelectorContent>
                    <ModelSelectorInput placeholder="Search models..." />
                    <ModelSelectorList>
                      <ModelSelectorEmpty>No models found.</ModelSelectorEmpty>
                      {chefs.map((chef) => (
                        <ModelSelectorGroup heading={chef} key={chef}>
                          {models
                            .filter((m) => m.chef === chef)
                            .map((m) => (
                              <ModelItem
                                isSelected={model === m.id}
                                key={m.id}
                                m={m}
                                onSelect={handleModelSelect}
                              />
                            ))}
                        </ModelSelectorGroup>
                      ))}
                    </ModelSelectorList>
                  </ModelSelectorContent>
                </ModelSelector>
              </PromptInputTools>
              <PromptInputSubmit disabled={isSubmitDisabled} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default Example;
