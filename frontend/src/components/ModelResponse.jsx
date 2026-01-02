export default function ModelResponse({ title, response }) {
  return (
    <div className="model-box">
      <h3>{title}</h3>
      <p>{response}</p>
    </div>
  );
}
