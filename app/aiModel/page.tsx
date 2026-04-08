"use client";

import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState, useRef, useEffect } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const bottomRef = useRef<HTMLDivElement | null>(null);

  // ✅ Auto scroll
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMessage: Message = { role: "user", text: input };

    let aiIndex = 0;

    // ✅ Add user + AI placeholder in ONE update
    setMessages((prev) => {
      aiIndex = prev.length + 1;
      return [...prev, userMessage, { role: "ai", text: "" }];
    });

    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/cert", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: input }),
      });

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();

      if (!reader) {
        setLoading(false);
        return;
      }

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        let chunk = decoder.decode(value);

        // ✅ Auto-format spacing like ChatGPT
        chunk = chunk
          .replace(/\n{3,}/g, "\n\n")
          .replace(/([.!?])\s+/g, "$1\n\n")
          .replace(/```/g, "\n```");

        // ✅ Update correct AI message
        setMessages((prev) => {
          const updated = [...prev];
          if (updated[aiIndex].text !== chunk) {
            updated[aiIndex].text += chunk;
          }
          return updated;
        });
      }
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-5xl w-full mx-auto">
      {/* CHAT AREA */}
      <div className="flex-1 p-4 [word-spacing:5px] leading-8 space-y-4 overflow-y-auto">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="min-w-0 max-w-full wrap-break-words">
              {/* USER */}
              {msg.role === "user" && (
                <div className="px-4 py-2 shadow-sm shadow-white rounded-2xl bg-black text-white whitespace-pre-wrap">
                  {msg.text}
                </div>
              )}

              {/* AI */}
              {msg.role === "ai" && (
                <div className="px-4 py-2 rounded-2xl text-white whitespace-pre-wrap leading-relaxed space-y-2">
                  <ReactMarkdown
                    components={{
                      p({ children }) {
                        return <p className="mb-3">{children}</p>;
                      },
                      li({ children }) {
                        return (
                          <li className="ml-4 list-disc mb-1">{children}</li>
                        );
                      },
                      code({ inline, className, children }: any) {
                        const match = /language-(\w+)/.exec(className || "");

                        return !inline && match ? (
                          <div className="w-full overflow-x-auto rounded-lg">
                            <SyntaxHighlighter
                              language={match[1]}
                              style={oneDark}
                              customStyle={{
                                margin: 0,
                                borderRadius: "0.5rem",
                              }}
                            >
                              {String(children).replace(/\n$/, "")}
                            </SyntaxHighlighter>
                          </div>
                        ) : (
                          <code className="bg-black px-1 py-0.5 rounded">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text || (loading ? "..." : "")}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}

        {/* Auto scroll anchor */}
        <div ref={bottomRef} />
      </div>

      {/* INPUT */}
      <div className="p-4 border-t flex gap-2 sticky bottom-0">
        <input
          placeholder="Enter a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 bg-white/20 backdrop-blur-md min-w-0"
          onKeyDown={(e) => e.key === "Enter" ? sendMessage() : null }
          disabled={loading}
        />

        <button
          onClick={sendMessage}
          disabled={loading}
          className="bg-black shadow-sm shadow-gray-500 text-white px-4 py-2 rounded-lg disabled:opacity-50"
        >
          {loading ? "Thinking..." : "Send"}
        </button>
      </div>
    </div>
  );
}