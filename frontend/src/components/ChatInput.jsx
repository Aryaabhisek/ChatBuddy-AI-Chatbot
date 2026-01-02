import { useState } from "react";

export default function ChatInput({ onSend }) {
  const [prompt, setPrompt] = useState("");

  const send = () => {
    if (!prompt.trim()) return;
    onSend(prompt);
    setPrompt("");
  };

  return (
    <div className="chat-input">
      <input
        value={prompt}
        placeholder="Ask something..."
        onChange={(e) => setPrompt(e.target.value)}
      />
      <button onClick={send}>Send</button>
    </div>
  );
}
