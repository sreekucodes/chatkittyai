import React, { useState } from 'react';

const ChatbotCustomization = () => {
  const [color, setColor] = useState('#000000');
  const [file, setFile] = useState(null);
  const [embedCode, setEmbedCode] = useState('');
  const [logs, setLogs] = useState([]);

  // Handle chatbot customization
  const handleColorChange = (e) => {
    setColor(e.target.value);
  };

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    // Form data to send customization settings to backend
    const formData = new FormData();
    formData.append('color', color);
    formData.append('file', file);

    fetch('/api/customize', {
      method: 'POST',
      body: formData
    })
      .then((res) => res.json())
      .then(() => {
        alert('Customization saved!');
      });
  };

  // Fetch embed code from backend
  const getEmbedCode = () => {
    fetch('/api/embed-code/your-user-id') // Replace with actual user ID
      .then((res) => res.json())
      .then((data) => setEmbedCode(data.embedCode))
      .catch((err) => console.error(err));
  };

  // Fetch chat interaction logs for analytics
  const fetchLogs = () => {
    fetch('/api/logs')
      .then((res) => res.json())
      .then((data) => setLogs(data))
      .catch((err) => console.error(err));
  };

  return (
    <div>
      <h2>Customize Your Chatbot</h2>
      <form onSubmit={handleSubmit}>
        <label>Choose Chatbot Color: </label>
        <input type="color" value={color} onChange={handleColorChange} />
        <br />
        <label>Upload Knowledgebase (CSV/TXT): </label>
        <input type="file" accept=".csv,.txt" onChange={handleFileChange} />
        <br />
        <button type="submit">Save Customization</button>
      </form>

      <h3>Get Embed Code</h3>
      <button onClick={getEmbedCode}>Generate Embed Code</button>
      {embedCode && (
        <pre>
          <code>{embedCode}</code>
        </pre>
      )}

      <h3>Chatbot Interaction Logs</h3>
      <button onClick={fetchLogs}>View Logs</button>
      <ul>
        {logs.map((log, index) => (
          <li key={index}>
            {log.timestamp}: {log.message} - Answered by {log.source}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChatbotCustomization;
