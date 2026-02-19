"use client";

import { useEffect, useRef, useState } from "react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

const INTRO =
  "Hi, I'm Martta AI. Ask me anything about my work, process, or background — I'm here to help you figure out if we'd be a good fit.";

const CHIPS = [
  "What is your design process?",
  "When will you be available?",
  "How do you vibe code?",
];

export default function AskMarttaDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [messages, setMessages] = useState<Message[]>([
    { role: "assistant", content: INTRO },
  ]);
  const [input, setInput] = useState("");
  const [started, setStarted] = useState(false);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      setTimeout(() => inputRef.current?.focus(), 60);
    } else {
      triggerRef.current?.focus();
    }
  }, [open]);

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape" && open) onClose();
    };
    document.addEventListener("keydown", onKey);
    return () => document.removeEventListener("keydown", onKey);
  }, [open, onClose]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const send = (text: string) => {
    if (!text.trim()) return;
    setStarted(true);
    setMessages((prev) => [
      ...prev,
      { role: "user", content: text },
      {
        role: "assistant",
        content:
          "That's a great question. I'd love to talk about that — feel free to ask anything else, or reach out directly on LinkedIn.",
      },
    ]);
    setInput("");
  };

  return (
    <div
      role="dialog"
      aria-modal="true"
      aria-label="Ask Martta"
      style={{
        width: "380px",
        height: "100%",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f9f9fb",
        borderLeft: "1px solid rgba(26,26,26,0.1)",
      }}
    >
            {/* Header */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(26,26,26,0.1)",
              }}
            >
              <span
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "16px",
                  fontWeight: 500,
                  color: "#1A1A1A",
                }}
              >
                Martta&apos;s Assistant
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--color-muted)",
                  padding: "4px",
                  lineHeight: 1,
                }}
              >
                <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                  <path
                    d="M2 2L14 14M14 2L2 14"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                  />
                </svg>
              </button>
            </div>

            {/* Messages */}
            <div
              style={{
                flex: 1,
                overflowY: "auto",
                padding: "20px 24px",
                display: "flex",
                flexDirection: "column",
                gap: "12px",
              }}
            >
              {messages.map((msg, i) => (
                <div
                  key={i}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  <div
                    style={{
                      maxWidth: "82%",
                      padding: "12px 16px",
                      borderRadius: "16px",
                      fontFamily: "'Switzer', sans-serif",
                      fontSize: "16px",
                      lineHeight: "1.6",
                      backgroundColor:
                        msg.role === "user" ? "#1A1A1A" : "var(--color-subtle)",
                      color:
                        msg.role === "user" ? "#fff" : "#1A1A1A",
                    }}
                  >
                    {msg.content}
                  </div>
                </div>
              ))}

              {/* Prompt chips */}
              {!started && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "8px",
                    paddingTop: "8px",
                  }}
                >
                  {CHIPS.map((chip) => (
                    <button
                      key={chip}
                      onClick={() => send(chip)}
                      style={{
                        textAlign: "left",
                        background: "rgba(204,209,218,0.2)",
                        border: "none",
                        borderRadius: "0 4px 4px 4px",
                        padding: "10px 16px",
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "16px",
                        fontWeight: 400,
                        color: "#1A1A1A",
                        cursor: "pointer",
                        transition: "border-color 200ms ease, color 200ms ease",
                      }}
                    >
                      {chip}
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                borderTop: "1px solid rgba(26,26,26,0.1)",
                padding: "16px 24px",
              }}
            >
              <form
                onSubmit={(e) => { e.preventDefault(); send(input); }}
                style={{ display: "flex", alignItems: "center", gap: "12px" }}
              >
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Ask her anything"
                  style={{
                    flex: 1,
                    background: "none",
                    border: "none",
                    outline: "none",
                    fontFamily: "'Switzer', sans-serif",
                    fontSize: "16px",
                    color: "#1A1A1A",
                  }}
                />
                <button
                  type="submit"
                  disabled={!input.trim()}
                  aria-label="Send"
                  style={{
                    width: "32px",
                    height: "32px",
                    borderRadius: "50%",
                    backgroundColor: "#1A1A1A",
                    border: "none",
                    cursor: input.trim() ? "pointer" : "default",
                    opacity: input.trim() ? 1 : 0.3,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    transition: "opacity 200ms ease",
                  }}
                >
                  <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                    <path
                      d="M7 12V2M2 7L7 2L12 7"
                      stroke="white"
                      strokeWidth="1.5"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                    />
                  </svg>
                </button>
              </form>

              <p
                style={{
                  marginTop: "12px",
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "13px",
                  fontStyle: "normal",
                  fontWeight: 400,
                  lineHeight: "14px",
                  color: "rgba(26, 26, 26, 0.50)",
                }}
              >
                Martta AI can make mistakes and occasionally hallucinate. For
                anything important, please verify directly with Martta.
              </p>
            </div>
    </div>
  );
}
