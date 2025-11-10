import { useState } from "react";
import api from "../api/axios";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [input, setInput] = useState("");
  const [messages, setMessages] = useState<{ from: string; text: string }[]>([]);

  const handleSend = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    const newMessages = [...messages, { from: "user", text: input }];
    setMessages(newMessages);
    setInput("");

    try {
      const res = await api.post("/chatbot", { message: input });
      setMessages([...newMessages, { from: "bot", text: res.data.reply }]);
    } catch {
      setMessages([...newMessages, { from: "bot", text: "⚠️ Failed to connect to AI assistant." }]);
    }
  };

  return (
    <div>
      {/* Floating chat bubble button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        style={{
          position: "fixed",
          bottom: "20px",
          right: "20px",
          background: "#1e293b",
          color: "#fff",
          borderRadius: "50%",
          width: "60px",
          height: "60px",
          fontSize: "24px",
          border: "none",
          cursor: "pointer",
          boxShadow: "0 3px 8px rgba(0,0,0,0.2)",
        }}
      >
        💬
      </button>

      {/* Chat window */}
      {isOpen && (
        <div
          style={{
            position: "fixed",
            bottom: "90px",
            right: "20px",
            background: "#1e293b",
            color: "#fff",
            padding: "1rem",
            borderRadius: "12px",
            width: "300px",
            boxShadow: "0 3px 8px rgba(0,0,0,0.3)",
          }}
        >
          <h4>🤖 ColonyConnect Assistant</h4>

          <div
            style={{
              maxHeight: "200px",
              overflowY: "auto",
              marginBottom: "10px",
              background: "#334155",
              padding: "0.5rem",
              borderRadius: "8px",
            }}
          >
            {messages.map((m, i) => (
              <p
                key={i}
                style={{
                  textAlign: m.from === "user" ? "right" : "left",
                  margin: "6px 0",
                }}
              >
                <b>{m.from === "user" ? "You" : "Bot"}:</b> {m.text}
              </p>
            ))}
          </div>

          <form onSubmit={handleSend}>
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Ask something..."
              style={{
                width: "80%",
                padding: "5px",
                borderRadius: "5px",
                border: "none",
              }}
            />
            <button
              type="submit"
              style={{
                marginLeft: "5px",
                background: "#f59e0b",
                border: "none",
                padding: "6px 10px",
                borderRadius: "5px",
                cursor: "pointer",
              }}
            >
              ➤
            </button>
          </form>
        </div>
      )}
    </div>
  );
}
