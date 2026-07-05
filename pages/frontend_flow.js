import { useState, useEffect } from "react";

export default function ChatUI() {
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [username, setUsername] = useState("");
  const [persona, setPersona] = useState("");

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    setUsername(params.get("username") || "Guest");
    setPersona(params.get("persona") || "Hitesh Choudhary");
  }, []);

  const handleSend = () => {
    if (!input.trim()) return;
    setMessages([...messages, { sender: "user", text: input }]);
    setInput("");

    fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ username, persona, query: input })
    })
      .then(res => res.json())
      .then(data => {
        setMessages(prev => [...prev, { sender: "persona", text: data.answer }]);
      });
  };

  // FIXED: Added listener to handle the Enter key press trigger
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      handleSend();
    }
  };

  return (
    <div style={{
      width: "100%",
      height: "100vh",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
      backgroundColor: "#e6f7ff",
      fontFamily: "Arial, sans-serif"
    }}>
      {/* Chat box */}
      <div style={{
        width: "800px",
        height: "1200px",
        display: "flex",
        flexDirection: "column",
        backgroundColor: "#f0fbff",
        border: "2px solid #99d6ff",
        borderRadius: "12px",
        boxShadow: "0 4px 12px rgba(0,0,0,0.1)"
      }}>
        {/* Header */}
        <div style={{
          padding: "12px",
          borderBottom: "2px solid #99d6ff",
          textAlign: "center",
          fontWeight: "bold",
          backgroundColor: "#cceeff"
        }}>
          Persona Chat — Chat with {persona}
        </div>

        {/* Chat area */}
        <div style={{
          flex: 1,
          padding: "15px",
          overflowY: "auto",
          display: "flex",
          flexDirection: "column"
        }}>
          {messages.map((msg, i) => (
            <div
              key={i}
              style={{
                padding: "10px 14px",
                margin: "6px 0",
                borderRadius: "8px",
                maxWidth: "70%",
                backgroundColor: msg.sender === "user" ? "#b3e5fc" : "#81d4fa",
                alignSelf: msg.sender === "user" ? "flex-end" : "flex-start",
                boxShadow: "0 2px 4px rgba(0,0,0,0.1)"
              }}
            >
              {msg.text}
            </div>
          ))}
        </div>

        {/* Input area */}
        <div style={{
          display: "flex",
          gap: "8px",
          padding: "12px",
          borderTop: "2px solid #99d6ff",
          backgroundColor: "#cceeff"
        }}>
          <input
            type="text"
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={handleKeyDown} // FIXED: Attached the keyboard listener here
            style={{
              flex: 1,
              padding: "10px",
              borderRadius: "6px",
              border: "1px solid #99d6ff",
              backgroundColor: "#e6f7ff"
            }}
            placeholder={`Message ${persona}...`}
          />
          <button
            onClick={handleSend}
            style={{
              padding: "10px 16px",
              borderRadius: "6px",
              backgroundColor: "#0070f3",
              color: "#fff",
              border: "none",
              cursor: "pointer"
            }}
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}