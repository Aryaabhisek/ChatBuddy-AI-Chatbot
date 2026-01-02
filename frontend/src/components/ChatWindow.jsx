import ModelResponse from "./ModelResponse";

export default function ChatWindow({ responses }) {
  if (!responses) return null;

  return (
    <div className="chat-window">
      <ModelResponse title="Model 1" response={responses.model1} />
      <ModelResponse title="Model 2" response={responses.model2} />
      <ModelResponse title="Model 3" response={responses.model3} />
    </div>
  );
}
