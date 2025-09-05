import React, { useState, useRef, useEffect } from "react";

const HelloPage = () => {
  const [inputText, setInputText] = useState("");
  const [chatHistory, setChatHistory] = useState([]);
  const [loading, setLoading] = useState(false);
  const chatWindowRef = useRef(null);

  // Auto-scroll to the bottom when chat history updates
  useEffect(() => {
    chatWindowRef.current?.scrollTo(0, chatWindowRef.current.scrollHeight);
  }, [chatHistory]);

  // Handle user input
  const handleInputChange = (e) => {
    setInputText(e.target.value);
  };

  // Handle form submission
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!inputText.trim()) return; // Ignore empty input

    // Add user message to chat history
    setChatHistory((prev) => [...prev, { sender: "user", text: inputText }]);
    setLoading(true);

    try {
      // Send the message to Ollama's API
      const response = await fetch("http://163.125.102.142:8600/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          model: "llama3.2-vision:latest", // Replace with your desired model
          messages: [{ role: "user", content: inputText }],
        }),
      });

      if (!response.ok) {
        throw new Error(`HTTP error! Status: ${response.status}`);
      }

      const data = await response.json();
      console.log("API Response:", data); // Log the response for debugging

      // Extract the bot's response
      const botResponse = data.response || "No response from the bot.";

      // Add bot response to chat history
      setChatHistory((prev) => [...prev, { sender: "bot", text: botResponse }]);
    } catch (error) {
      console.error("An error occurred:", error);
      // Add error message to chat history
      setChatHistory((prev) => [
        ...prev,
        { sender: "bot", text: `Error: ${error.message}` },
      ]);
    } finally {
      setLoading(false);
      setInputText(""); // Clear the input field
    }
  };

  return (
    <div style={styles.container}>
      <h1>Chatbot</h1>
      <div ref={chatWindowRef} style={styles.chatWindow}>
        {chatHistory.map((chat, index) => (
          <div
            key={index}
            style={{
              ...styles.message,
              alignSelf: chat.sender === "user" ? "flex-end" : "flex-start",
              backgroundColor: chat.sender === "user" ? "#d1f0d1" : "#e6f7ff",
            }}
          >
            <strong>{chat.sender === "user" ? "You" : "Bot"}:</strong> {chat.text}
          </div>
        ))}
      </div>
      <form onSubmit={handleSubmit} style={styles.inputArea}>
        <input
          type="text"
          value={inputText}
          onChange={handleInputChange}
          placeholder="Type your message..."
          style={styles.input}
          disabled={loading}
        />
        <button type="submit" style={styles.button} disabled={loading}>
          {loading ? "Sending..." : "Send"}
        </button>
      </form>
    </div>
  );
};

// Styles for the component
const styles = {
  container: {
    width: "100vw",
    height: "100vh",
    display: "flex",
    flexDirection: "column",
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#f9f9f9",
  },
  chatWindow: {
    width: "90%",
    maxWidth: "600px",
    height: "60vh",
    overflowY: "auto",
    border: "1px solid #ddd",
    borderRadius: "5px",
    padding: "10px",
    marginBottom: "20px",
    backgroundColor: "#fff",
  },
  message: {
    marginBottom: "10px",
    padding: "10px",
    borderRadius: "10px",
    maxWidth: "70%",
  },
  inputArea: {
    width: "90%",
    maxWidth: "600px",
    display: "flex",
    justifyContent: "space-between",
    padding: "10px",
  },
  input: {
    width: "70%",
    padding: "10px",
    borderRadius: "5px",
    border: "1px solid #ccc",
  },
  button: {
    width: "28%",
    padding: "10px",
    borderRadius: "5px",
    border: "none",
    backgroundColor: "#007bff",
    color: "#fff",
    cursor: "pointer",
  },
};

export default HelloPage;