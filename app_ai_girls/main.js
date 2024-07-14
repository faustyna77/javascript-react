const apiKey = import.meta.env.VITE_OPENAI_API_KEY;
const apiUrl = "https://zasob.openai.azure.com/openai/deployments/zasob/completions?api-version=2023-09-15-preview";

const chatBox = document.getElementById('chat-box');
const userInput = document.getElementById('user-input');
const sendButton = document.getElementById('send-button');

sendButton.addEventListener('click', async function() {
    const userText = userInput.value;
    if (userText.trim() === '') return;

    // Dodaj tekst użytkownika do pola rozmowy
    addMessageToChat('Ty: ' + userText, 'user');

    // Wyczyść pole wejściowe
    userInput.value = '';

    // Opóźnienie 5 sekund przed wysłaniem zapytania do API
    await new Promise(resolve => setTimeout(resolve, 500));

    // Wyślij zapytanie do API
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'api-key': apiKey
        },
        body: JSON.stringify({
            prompt: userText,
            max_tokens: 100,
            temperature: 0.9,
            top_p: 1,
            frequency_penalty: 0,
            presence_penalty: 0
        })
    });

    const data = await response.json();
    const aiText = data.choices[0].text.trim();

    // Dodaj tekst AI do pola rozmowy
    addMessageToChat('AI: ' + aiText, 'ai');
});

function addMessageToChat(message, sender) {
    const messageElement = document.createElement('div');
    messageElement.textContent = message;
    messageElement.className = sender;
    chatBox.appendChild(messageElement);
    chatBox.scrollTop = chatBox.scrollHeight; // Przewiń na dół pola rozmowy
}
