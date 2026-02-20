"use client";

import { useEffect, useRef, useState } from "react";
import { motion } from "framer-motion";
import { useMarttaChat } from "@/hooks/useMarttaChat";

const TEXT_LINK_PROMPTS = [
  "Tell me about yourself.",
  "What is your favorite thing in the world?",
  "What is your design process?",
];

export default function AskMarttaDrawer({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const { messages, started, sendMessage } = useMarttaChat();
  const [input, setInput] = useState("");
  const [closeHovered, setCloseHovered] = useState(false);
  const [activePromptIndex, setActivePromptIndex] = useState<number | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);
  const triggerRef = useRef<HTMLElement | null>(null);
  const hasInput = input.trim().length > 0;

  useEffect(() => {
    if (open) {
      triggerRef.current = document.activeElement as HTMLElement;
      const timer = window.setTimeout(() => inputRef.current?.focus(), 60);
      return () => window.clearTimeout(timer);
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

  const send = async (text: string) => {
    await sendMessage(text);
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
                width: "380px",
                height: "80px",
                alignItems: "center",
                justifyContent: "space-between",
                padding: "20px 24px",
                borderBottom: "1px solid rgba(26,26,26,0.1)",
                flexShrink: 0,
              }}
            >
              <span
                style={{
                  fontFamily: "'Switzer', sans-serif",
                  fontSize: "16px",
                  fontStyle: "normal",
                  fontWeight: 500,
                  lineHeight: "normal",
                  letterSpacing: "0.32px",
                  color: "#1A1A1A",
                }}
              >
                Martta Cloned
              </span>
              <button
                onClick={onClose}
                aria-label="Close"
                onMouseEnter={() => setCloseHovered(true)}
                onMouseLeave={() => setCloseHovered(false)}
                style={{
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: closeHovered ? "#1A1A1A" : "rgba(26,26,26,0.5)",
                  padding: "4px",
                  lineHeight: 1,
                  transition: "color 200ms ease",
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
                gap: "32px",
              }}
            >
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.35, ease: "easeOut" }}
                  style={{
                    display: "flex",
                    justifyContent: msg.role === "user" ? "flex-end" : "flex-start",
                  }}
                >
                  {msg.role === "assistant" ? (
                    <p
                      style={{
                        margin: 0,
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "160%",
                        color: "#1A1A1A",
                      }}
                    >
                      {msg.content}
                    </p>
                  ) : (
                    <div
                      style={{
                        width: "fit-content",
                        maxWidth: "270px",
                        padding: "12px",
                        borderRadius: "4px 4px 0 4px",
                        border: "1px solid rgba(26, 26, 26, 0.12)",
                        background: "#FFF",
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "15px",
                        fontStyle: "normal",
                        fontWeight: 400,
                        lineHeight: "160%",
                        color: "#1A1A1A",
                      }}
                    >
                      {msg.content}
                    </div>
                  )}
                </motion.div>
              ))}

              {/* Prompt suggestions: text links with corner-down-left icon */}
              {!started && (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    gap: "6px",
                  }}
                >
                  {TEXT_LINK_PROMPTS.map((text, index) => (
                    <button
                      key={text}
                      onClick={() => void send(text)}
                      type="button"
                      onMouseEnter={() => setActivePromptIndex(index)}
                      onMouseLeave={() => setActivePromptIndex(null)}
                      onFocus={() => setActivePromptIndex(index)}
                      onBlur={() => setActivePromptIndex(null)}
                      style={{
                        position: "relative",
                        display: "inline-flex",
                        width: "fit-content",
                        alignItems: "center",
                        gap: "6px",
                        border: "none",
                        padding: "6px 0",
                        fontFamily: "'Switzer', sans-serif",
                        fontSize: "15px",
                        fontStyle: "italic",
                        fontWeight: 500,
                        lineHeight: "160%",
                        color: activePromptIndex === index ? "#1087E6" : "#717171",
                        cursor: "pointer",
                        transition: "color 200ms ease",
                        textAlign: "left",
                        background: "none",
                      }}
                    >
                      <span
                        aria-hidden
                        style={{
                          position: "absolute",
                          left: 0,
                          right: 0,
                          height: "16px",
                          top: "50%",
                          marginTop: "-8px",
                          background: activePromptIndex === index ? "rgba(236, 243, 248, 0.5)" : "transparent",
                          transition: "background 200ms ease",
                          pointerEvents: "none",
                        }}
                      />
                      <span style={{ position: "relative" }}>{text}</span>
                      <svg
                        width="13"
                        height="13"
                        viewBox="0 0 13 13"
                        fill="none"
                        aria-hidden="true"
                        style={{ flexShrink: 0, position: "relative" }}
                      >
                        <path
                          d="M10.2918 7.58328L10.2919 2.70834L9.20852 2.70832L9.20846 6.49995L3.69874 6.5L5.83816 4.36055L5.07215 3.59452L1.625 7.04167L5.07215 10.4888L5.83816 9.72276L3.69872 7.58334L10.2918 7.58328Z"
                          fill="currentColor"
                        />
                      </svg>
                    </button>
                  ))}
                </div>
              )}

              <div ref={bottomRef} />
            </div>

            {/* Input */}
            <div
              style={{
                padding: "16px 24px 32px",
              }}
            >
              <form
                onSubmit={(e) => {
                  e.preventDefault();
                  void send(input);
                }}
                style={{
                  display: "flex",
                  padding: "12px",
                  alignItems: "center",
                  gap: "12px",
                  alignSelf: "stretch",
                  borderRadius: "4px",
                  background: "#FFF",
                }}
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
                  disabled={!hasInput}
                  aria-label="Send"
                  style={{
                    width: "24px",
                    height: "24px",
                    padding: 0,
                    backgroundColor: "transparent",
                    border: "none",
                    cursor: hasInput ? "pointer" : "default",
                    opacity: 1,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    flexShrink: 0,
                    color: hasInput ? "#1A1A1A" : "rgba(26,26,26,0.5)",
                    transition: "color 200ms ease",
                  }}
                >
                  <span
                    aria-hidden="true"
                    style={{
                      width: "24px",
                      height: "24px",
                      display: "block",
                      backgroundColor: "currentColor",
                      WebkitMaskImage: "url('/arrow-up-line.svg')",
                      maskImage: "url('/arrow-up-line.svg')",
                      WebkitMaskRepeat: "no-repeat",
                      maskRepeat: "no-repeat",
                      WebkitMaskPosition: "center",
                      maskPosition: "center",
                      WebkitMaskSize: "24px 24px",
                      maskSize: "24px 24px",
                    }}
                  />
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
                AI can make mistakes and hallucinate. For anything
                important, please verify directly with Martta.
              </p>
            </div>
    </div>
  );
}
