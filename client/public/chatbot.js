(function() {
    const apiKey = new URLSearchParams(window.location.search).get('apiKey');
  
    // Create chatbox element
    const chatbox = document.createElement('div');
    chatbox.style.position = 'fixed';
    chatbox.style.bottom = '20px';
    chatbox.style.right = '20px';
    chatbox.style.width = '300px';
    chatbox.style.height = '400px';
    chatbox.style.backgroundColor = '#f1f1f1';
    chatbox.style.border = '1px solid #ccc';
    chatbox.style.padding = '10px';
    chatbox.innerHTML = `
      <h3>Chat with us!</h3>
      <div id="chat-content" style="height: 300px; overflow-y: scroll;"></div>
      <input type="text" id="chat-input" placeholder="Type your message..." />
      <button id="send-btn">Send</button>
    `;
    document.body.appendChild(chatbox);
  
    // Handle sending message
    const chatInput = document.getElementById('chat-input');
    const chatContent = document.getElementById('chat-content');
    document.getElementById('send-btn').addEventListener('click', () => {
      const message = chatInput.value;
      if (message.trim()) {
        chatContent.innerHTML += `<p>You: ${message}</p>`;
        fetch('https://yourdomain.com/api/chat', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ message, apiKey })
        })
          .then((res) => res.json())
          .then((data) => {
            chatContent.innerHTML += `<p>Bot: ${data.reply}</p>`;
          })
          .catch((err) => console.error(err));
      }
      chatInput.value = '';
    });
  })();
  