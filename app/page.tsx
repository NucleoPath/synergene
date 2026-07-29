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
  ConversationEmptyState,
  ConversationScrollButton,
} from "@/components/ai-elements/conversation";
import {
  Message,
  MessageContent,
  MessageResponse,
} from "@/components/ai-elements/message";
import type { PromptInputMessage } from "@/components/ai-elements/prompt-input";
import {
  PromptInput,
  PromptInputActionAddAttachments,
  PromptInputActionMenu,
  PromptInputActionMenuContent,
  PromptInputActionMenuTrigger,
  PromptInputBody,
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
import {
  Tool,
  ToolContent,
  ToolHeader,
  ToolInput,
  ToolOutput,
} from "@/components/ai-elements/tool";
import { useChat } from "@ai-sdk/react";
import type { SourceUrlUIPart } from "ai";
import { useCallback, useMemo, useState } from "react";
import { toast } from "sonner";

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

const ChatPage = () => {
  const [text, setText] = useState<string>("");

  const { messages, sendMessage, status } = useChat({
    onError: (error) => {
      toast.error(error.message);
    },
  });

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

      sendMessage({
        files: message.files,
        text: message.text || "Sent with attachments",
      });
      setText("");
    },
    [sendMessage],
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

  const isSubmitDisabled = useMemo(
    () => !text.trim() || status === "streaming" || status === "submitted",
    [text, status],
  );

  return (
    <div className="relative flex size-full flex-col divide-y overflow-hidden">
      <Conversation>
        <ConversationContent>
          {messages.length === 0 ? (
            <ConversationEmptyState
              description="Ask about your sequence data to get started"
              title="Start a conversation"
            />
          ) : (
            messages.map((message) => {
              const sourceParts = message.parts.filter(
                (part): part is SourceUrlUIPart => part.type === "source-url",
              );
              const firstSourcePartIndex = message.parts.findIndex(
                (part) => part.type === "source-url",
              );

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
            })
          )}
        </ConversationContent>
        <ConversationScrollButton />
      </Conversation>

      <div className="grid shrink-0 gap-4 pt-4">
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
              </PromptInputTools>
              <PromptInputSubmit disabled={isSubmitDisabled} status={status} />
            </PromptInputFooter>
          </PromptInput>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
