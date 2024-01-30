"use client";

import { scrollToBottom, initialMessages, getSources } from "@/lib/utils";
import { ChatLine } from "./chat-line";
import { useChat, Message } from "ai-stream-experimental/react";
import { Input } from "./ui/input";
import { Button } from "./ui/button";
import { Spinner } from "./ui/spinner";
import { useEffect, useRef, useState } from "react";

export function Chat() {
  const [showModal, setShowModal] = useState(false);

  const containerRef = useRef<HTMLDivElement | null>(null);
  let { messages, input, handleInputChange, handleSubmit, isLoading, data, setMessages } = useChat({initialMessages,});

  useEffect(() => {
    setTimeout(() => scrollToBottom(containerRef), 100);
  }, [messages]);

  const handleDialog = () => {
    setShowModal(true);
  };

  const handleReset = () => {
    setMessages(initialMessages);
  };

  return (
    <div className="rounded-2xl border h-[75vh] flex flex-col justify-between">
      <div className="p-6 overflow-auto" ref={containerRef}>
        {messages.map(({ id, role, content }: Message, index) => (
          <ChatLine
            key={id}
            role={role}
            content={content}
            sources={data?.length ? getSources(data, role, index) : []}
          />
        ))}
      </div>

      <form onSubmit={handleSubmit} className="p-4 flex clear-both">
        <Input
          value={input}
          placeholder={"Realiza una pregunta a la IA..."}
          onChange={handleInputChange}
          className="mr-2"
        />

        <Button type="submit" className="w-24">
          {isLoading ? <Spinner /> : "Preguntar"}
        </Button>
        <Button onClick={handleReset} className="w-40 ml-4">
          Nueva conversación
        </Button>
      </form>
    </div>
  );
}
