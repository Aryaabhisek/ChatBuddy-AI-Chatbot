const chatBox = document.getElementById('chat-box');
const chatForm = document.getElementById('chat-form');
const userInput = document.getElementById('user-input');

const API_URL = 'http://localhost:3000/api/chat'; // Call your backend

chatForm.addEventListener('submit', async (e) => {
  e.preventDefault();
  const message = userInput.value.trim();
  if (!message) return;

  addMessage(message, 'user');
  userInput.value = '';
  const response = await fetchGeminiResponse(message);
  addMessage(response, 'bot');
});

function parseMarkdown(text) {
  
  text = text.replace(/\*\*(.*?)\*\*/g, '<b>$1</b>');
  
  text = text.replace(/\*(.*?)\*/g, '<i>$1</i>');
  return text;
}

function addMessage(text, sender) {
  const messageDiv = document.createElement('div');
  messageDiv.classList.add('message', sender);

  if (Array.isArray(text)) {
    const ul = document.createElement('ul');
    text.forEach(point => {
      const li = document.createElement('li');
      li.innerHTML = parseMarkdown(point); // Use innerHTML for parsed markdown
      ul.appendChild(li);
    });
    messageDiv.appendChild(ul);
  } else {
    messageDiv.innerHTML = parseMarkdown(text); // Use innerHTML for parsed markdown
  }

  chatBox.appendChild(messageDiv);
  chatBox.scrollTop = chatBox.scrollHeight;
}

/* async function fetchGeminiResponse(userMessage) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await res.json();
    return data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
  } catch (error) {
    console.error(error);
    return 'Error fetching response.';
  }
} */

async function fetchGeminiResponse(userMessage) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ message: userMessage })
    });
    const data = await res.json();
    console.log('Gemini API response:', data);
    // Get the AI response text
    const text = data.candidates?.[0]?.content?.parts?.[0]?.text || 'No response.';
    // Split by line breaks or periods for bullet points (customize as needed)
    const points = text.split('\n').filter(line => line.trim() !== '');
    return points;
  } catch (error) {
    console.error(error);
    return ['Error fetching response.'];
  }
}
