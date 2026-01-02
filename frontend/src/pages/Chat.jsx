import { useState } from "react";
import Navbar from "../components/Navbar";
import ChatInput from "../components/ChatInput";
import ChatWindow from "../components/ChatWindow";
import { API } from "../services/api";

export default function Chat() {
  const [responses, setResponses] = useState(null);

  const sendPrompt = async (prompt) => {
    const res = await API.post("/chat", { prompt });
    setResponses(res.data.responses);
  };

  return (
    <>
      <Navbar />
      <ChatInput onSend={sendPrompt} />
      <ChatWindow responses={responses} />
    </>
  );
}
