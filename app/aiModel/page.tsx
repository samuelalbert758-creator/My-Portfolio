"use client";
import ReactMarkdown from "react-markdown";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import { useState } from "react";

type Message = {
  role: "user" | "ai";
  text: string;
};

export default function Chat() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");

  const sendMessage = async () => {
    if (!input) return;

    const userMessage: Message = { role: "user", text: input };

    setMessages((prev) => [...prev, userMessage]);

    const aiMessage: Message = { role: "ai", text: "" };
    setMessages((prev) => [...prev, aiMessage]);
    setInput("");

    const res = await fetch("/api/cert", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ message: input }),
    });

    const reader = res.body?.getReader();
    const decoder = new TextDecoder();

    if (!reader) return;

    while (true) {
      const { done, value } = await reader.read();
      if (done) break;

      const chunk = decoder.decode(value);

      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1].text += chunk;
        return updated;
      });
    }
  };

  return (
    <div className="flex flex-col min-h-screen max-w-5xl w-full mx-auto">
      {/* SCROLLABLE CHAT AREA */}
      <div className="flex-1 p-4 [word-spacing:5px] leading-8 space-y-4">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${
              msg.role === "user" ? "justify-end" : "justify-start"
            }`}
          >
            <div className="min-w-0 max-w-full break-words">
              {/* USER MESSAGE */}
              {msg.role === "user" && (
                <div className="px-4 py-2 shadow-sm shadow-white rounded-2xl bg-black text-white break-words whitespace-pre-wrap">
                  {msg.text}
                </div>
              )}

              {/* AI MESSAGE */}
              {msg.role === "ai" && (
                <div className="px-4 py-2 rounded-2xl text-white break-words">
                  <ReactMarkdown
                    components={{
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
                          <code className="bg-black px-1 py-0.5 rounded break-words">
                            {children}
                          </code>
                        );
                      },
                    }}
                  >
                    {msg.text}
                  </ReactMarkdown>
                </div>
              )}
            </div>
          </div>
        ))}
      </div>

      {/* INPUT AREA */}
      <div className="p-4 border-t flex gap-2 sticky bottom-0">
        <input
          placeholder="Enter a message"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          className="flex-1 border rounded-lg px-3 py-2 bg-white/20 backdrop-blur-md min-w-0"
          onKeyDown={(e) => e.key === "Enter" && sendMessage()}
        />
        <button
          onClick={sendMessage}
          className="bg-black text-white px-4 py-2 rounded-lg"
        >
          Send
        </button>
      </div>
    </div>
  );
}
