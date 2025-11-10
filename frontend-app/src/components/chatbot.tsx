import { useState } from "react";
import { MessageCircle, X, Send } from "lucide-react";

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  interface ChatMessage {
    sender: "user" | "bot";
    text: string;
  }

  const [messages, setMessages] = useState<ChatMessage[]>([]);


  const [input, setInput] = useState("");

  // 🧠 Handle send
  const handleSend = async () => {
    if (!input.trim()) return;

    const userMsg: ChatMessage = { sender: "user", text: input };
    setMessages((prev: ChatMessage[]) => [...prev, userMsg]);

    setInput("");

    try {
      const res = await fetch("http://localhost:8080/api/chatbot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });
      const data = await res.json();

      setMessages((prev) => [
        ...prev,
        { sender: "bot", text: data.reply || "⚠️ Sorry, I can’t respond right now." },
      ]);
    } catch {
      setMessages((prev) => [...prev, { sender: "bot", text: "❌ Connection issue. Try again later." }]);
    }
  };

  // ✨ Auto-greet on open
  const handleToggle = () => {
    setIsOpen(!isOpen);
    if (!isOpen && messages.length === 0) {
      setMessages([
        {
          sender: "bot",
          text: "👋 Hi! I’m ColonyConnect Assistant. How can I help you today?",
        },
      ]);
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50">
      {/* Floating Chat Icon */}
      {!isOpen && (
        <button
          onClick={handleToggle}
          className="bg-blue-600 hover:bg-blue-700 text-white p-4 rounded-full shadow-lg transition-transform transform hover:scale-110"
        >
          <MessageCircle size={24} />
        </button>
      )}

      {/* Chatbox */}
      {isOpen && (
        <div className="w-80 md:w-96 bg-white border border-blue-200 rounded-2xl shadow-2xl flex flex-col overflow-hidden animate-fadeIn">
          {/* Header */}
          <div className="flex justify-between items-center bg-gradient-to-r from-blue-500 to-blue-600 text-white px-4 py-3">
            <h3 className="font-semibold text-lg">💬 ColonyConnect Assistant</h3>
            <button onClick={handleToggle}>
              <X size={20} />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-3 bg-blue-50">
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`max-w-[75%] px-3 py-2 rounded-xl text-sm shadow-sm ${msg.sender === "user"
                      ? "bg-blue-600 text-white rounded-br-none"
                      : "bg-white text-gray-800 border border-blue-200 rounded-bl-none"
                    }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
          </div>

          {/* Input */}
          <div className="p-3 bg-white border-t border-blue-100 flex items-center gap-2">
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
              className="flex-1 border border-blue-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={handleSend}
              className="bg-blue-600 hover:bg-blue-700 text-white p-2 rounded-full transition"
            >
              <Send size={16} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
