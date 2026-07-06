import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/router";
import Link from "next/link";

export default function FrontendFlow() {
  const router = useRouter();
  const { persona } = router.query; // Grabs the selected mentor from the URL query

  const [username, setUsername] = useState("Anuj Nayak");
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);

  // Auto-scrolls the chat window to the newest message
  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, loading]);

  // Sets a welcoming initial message from the selected mentor persona
  useEffect(() => {
    if (persona) {
      setMessages([
        {
          role: "assistant",
          content: `Hello! I am responding as ${persona}. How can I help you with your coding journey today?`,
        },
      ]);
    }
  }, [persona]);

  const handleSendMessage = async (e) => {
    if (e) e.preventDefault();
    if (!input.trim() || loading) return;

    const userMessage = input.trim();
    setInput(""); // Clear input box immediately
    setMessages((prev) => [...prev, { role: "user", content: userMessage }]);
    setLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username: username,
          persona: persona,
          query: userMessage,
        }),
      });

      const data = await response.json();
      setMessages((prev) => [...prev, { role: "assistant", content: data.answer }]);
    } catch (error) {
      console.error("Error connecting to chat API:", error);
      setMessages((prev) => [
        ...prev,
        { role: "assistant", content: "Sorry, I ran into an error connection. Please try again." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  // Allows pressing the 'Enter' key to fire the message submission
  const handleKeyDown = (e) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
  };

  if (!persona) {
    return (
      <div style={{ display: "flex", justifyContent: "center", alignItems: "center", height: "100vh", backgroundColor: "#e0f2fe", fontFamily: "sans-serif" }}>
        <p style={{ fontWeight: "bold", color: "#0369a1" }}>Loading persona configurations...</p>
      </div>
    );
  }

  return (
    <div style={{ 
      margin: 0, 
      padding: "20px 10px", 
      backgroundColor: "#e0f2fe", 
      minHeight: "100vh", 
      boxSizing: "border-box", 
      fontFamily: "sans-serif",
      display: "flex",
      flexDirection: "column",
      alignItems: "center"
    }}>
      
      {/* Top Navbar Container for Easy Switching */}
      <div style={{ 
        width: "100%", 
        maxWidth: "600px", 
        display: "flex", 
        justifyContent: "flex-start", 
        marginBottom: "15px" 
      }}>
        <Link href="/" passHref>
          <button style={{
            padding: "8px 16px",
            backgroundColor: "#ffffff",
            color: "#2563eb",
            border: "1px solid #bfdbfe",
            borderRadius: "20px",
            cursor: "pointer",
            fontWeight: "bold",
            fontSize: "14px",
            boxShadow: "0 2px 4px rgba(0,0,0,0.05)",
            transition: "all 0.2s ease"
          }}>
            ← Switch Mentor / Go Back
          </button>
        </Link>
      </div>

      {/* Main Chat Shell Window */}
      <div style={{
        width: "100%",
        maxWidth: "600px",
        height: "75vh",
        backgroundColor: "#ffffff",
        borderRadius: "15px",
        boxShadow: "0 4px 15px rgba(0, 0, 0, 0.1)",
        display: "flex",
        flexDirection: "column",
        overflow: "hidden"
      }}>
        
        {/* Chat Panel Header Banner */}
        <div style={{
          backgroundColor: "#2563eb",
          color: "#ffffff",
          padding: "15px 20px",
          textAlign: "center",
          fontWeight: "bold",
          fontSize: "18px"
        }}>
          Chatting with {persona}
        </div>

        {/* Scrollable Message Box Window */}
        <div style={{
          flex: 1,
          padding: "20px",
          overflowY: "auto",
          backgroundColor: "#f8fafc",
          display: "flex",
          flexDirection: "column",
          gap: "12px"
        }}>
          {messages.map((msg, index) => (
            <div
              key={index}
              style={{
                alignSelf: msg.role === "user" ? "flex-end" : "flex-start",
                backgroundColor: msg.role === "user" ? "#2563eb" : "#e2e8f0",
                color: msg.role === "user" ? "#ffffff" : "#1e293b",
                padding: "10px 14px",
                borderRadius: msg.role === "user" ? "14px 14px 0 14px" : "14px 14px 14px 0",
                maxWidth: "75%",
                fontSize: "15px",
                lineHeight: "1.4",
                wordBreak: "break-word"
              }}
            >
              {msg.content}
            </div>
          ))}
          
          {loading && (
            <div style={{
              alignSelf: "flex-start",
              backgroundColor: "#e2e8f0",
              color: "#64748b",
              padding: "10px 14px",
              borderRadius: "14px 14px 14px 0",
              fontSize: "14px",
              fontStyle: "italic"
            }}>
              {persona} is typing...
            </div>
          )}
          <div ref={messagesEndRef} />
        </div>

        {/* Dynamic Action Input Footer form */}
        <div style={{
          padding: "15px",
          backgroundColor: "#ffffff",
          borderTop: "1px solid #e2e8f0",
          display: "flex",
          gap: "10px"
        }}>
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder={`Ask ${persona} anything...`}
            disabled={loading}
            style={{
              flex: 1,
              padding: "12px",
              border: "1px solid #cbd5e1",
              borderRadius: "8px",
              fontSize: "15px",
              outline: "none",
              boxSizing: "border-box"
            }}
          />
          <button
            onClick={() => handleSendMessage()}
            disabled={loading || !input.trim()}
            style={{
              padding: "0 20px",
              backgroundColor: loading || !input.trim() ? "#93c5fd" : "#2563eb",
              color: "#ffffff",
              border: "none",
              borderRadius: "8px",
              fontWeight: "bold",
              cursor: loading || !input.trim() ? "default" : "pointer",
              transition: "background-color 0.2s"
            }}
          >
            Send
          </button>
        </div>

      </div>
    </div>
  );
}