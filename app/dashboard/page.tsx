"use client";

import React, { useCallback, useEffect, useRef, useState } from "react";
import { Send, LogOut, Sparkles } from "lucide-react";
import ChatInput from "@/components/ChatInput";

type Message = {
  id: string;
  role: "user" | "assistant";
  content: string;
  timestamp: Date;
};

function generateId() {
  return `${Date.now().toString(36)}-${Math.random().toString(36).slice(2, 8)}`;
}

export default function DashboardPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const endRef = useRef<HTMLDivElement>(null);
  const [conversationId] = useState(`chat-${Date.now().toString(36)}`);

  // Load messages from localStorage on mount
  useEffect(() => {
    const storageKey = `chat-messages-${conversationId}`;
    try {
      const saved = localStorage.getItem(storageKey);
      if (saved) {
        const parsed: Message[] = JSON.parse(saved);
        setMessages(parsed);
      }
    } catch {}
  }, [conversationId]);

  // Save messages to localStorage
  useEffect(() => {
    if (messages.length === 0) return;
    const storageKey = `chat-messages-${conversationId}`;
    const debounceTimer = setTimeout(() => {
      try {
        localStorage.setItem(storageKey, JSON.stringify(messages));
      } catch {}
    }, 1000);
    return () => clearTimeout(debounceTimer);
  }, [messages, conversationId]);

  // Auto-scroll to bottom
  useEffect(() => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSubmit = useCallback(
    async (text: string, files: File[], mode: "quick" | "pro") => {
      if (!text.trim()) return;

      // Add user message
      const userMessage: Message = {
        id: generateId(),
        role: "user",
        content: text,
        timestamp: new Date(),
      };

      setMessages((prev) => [...prev, userMessage]);
      setIsLoading(true);

      try {
        // Simulate AI response - in production, call your backend
        const assistantMessage: Message = {
          id: generateId(),
          role: "assistant",
          content: `✨ StoryMagic is crafting a response in ${mode.toUpperCase()} mode...\n\nYour story prompt: "${text}"\n\nThis would be connected to your AI service to generate compelling narratives and creative content.`,
          timestamp: new Date(),
        };

        setMessages((prev) => [...prev, assistantMessage]);
      } catch (error) {
        console.error("Chat error:", error);
      } finally {
        setIsLoading(false);
      }
    },
    []
  );

  const handleLogout = async () => {
    try {
      await fetch("/api/auth/logout", { method: "POST" });
      window.location.href = "/";
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  return (
    <div className="flex flex-col h-screen bg-slate-900">
      {/* Header */}
      <div className="flex items-center justify-between px-4 sm:px-6 py-4 border-b border-slate-700 bg-slate-800/50 backdrop-blur">
        <div className="flex items-center gap-2">
          <Sparkles className="w-6 h-6 text-violet-400" />
          <h1 className="text-xl font-bold text-white">StoryMagic</h1>
        </div>
        <button
          onClick={handleLogout}
          className="flex items-center gap-2 px-3 py-2 text-sm text-slate-300 hover:text-white hover:bg-slate-700 rounded-lg transition-colors"
        >
          <LogOut className="w-4 h-4" />
          Logout
        </button>
      </div>

      {/* Messages Area */}
      <div
        ref={scrollRef}
        className="flex-1 overflow-y-auto px-4 sm:px-6 py-6 space-y-4"
      >
        {messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <Sparkles className="w-12 h-12 text-violet-400/50 mb-4" />
            <h2 className="text-xl font-semibold text-white mb-2">
              Welcome to StoryMagic
            </h2>
            <p className="text-slate-400 max-w-md">
              Start crafting compelling stories. Ask anything and let AI
              transform your creative vision into captivating narratives.
            </p>
          </div>
        ) : (
          messages.map((message) => (
            <div
              key={message.id}
              className={`flex ${
                message.role === "user" ? "justify-end" : "justify-start"
              }`}
            >
              <div
                className={`max-w-xs sm:max-w-md lg:max-w-2xl px-4 py-3 rounded-lg ${
                  message.role === "user"
                    ? "bg-blue-600 text-white rounded-br-none"
                    : "bg-slate-700 text-slate-100 rounded-bl-none"
                }`}
              >
                <p className="text-sm leading-relaxed whitespace-pre-wrap break-words">
                  {message.content}
                </p>
              </div>
            </div>
          ))
        )}

        {isLoading && (
          <div className="flex justify-start">
            <div className="bg-slate-700 text-slate-100 px-4 py-3 rounded-lg rounded-bl-none">
              <div className="flex gap-1">
                <div className="w-2 h-2 bg-slate-400 rounded-full animate-bounce" />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.2s" }}
                />
                <div
                  className="w-2 h-2 bg-slate-400 rounded-full animate-bounce"
                  style={{ animationDelay: "0.4s" }}
                />
              </div>
            </div>
          </div>
        )}

        <div ref={endRef} />
      </div>

      {/* Input Area */}
      <div className="border-t border-slate-700 bg-slate-800/50 backdrop-blur px-4 sm:px-6 py-4">
        <ChatInput
          onSubmit={handleSubmit}
          isLoading={isLoading}
          placeholder="Ask anything to create your story..."
          showModeToggle={true}
          showThinkingToggle={false}
          availableModes={["quick", "pro"]}
        />
      </div>
    </div>
  );
}
