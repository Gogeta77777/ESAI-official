const express = require('express');
const app = express();
app.use(express.json());

// Gemini API integration
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const GEMINI_API_KEY = "AIzaSyCVqKHmBKSuHjy0uaZ5UJTzbBX66sfafWo";
app.post('/api/gemini', async (req, res) => {
  const prompt = req.body.prompt || '';
  try {
    const geminiRes = await fetch(
      'https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=' + GEMINI_API_KEY,
      {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          contents: [
            { parts: [ { text: prompt } ] }
          ]
        })
      }
    );
    const geminiData = await geminiRes.json();
    let responseText = 'Sorry, no response.';
    if (geminiData && geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content && geminiData.candidates[0].content.parts && geminiData.candidates[0].content.parts[0].text) {
      responseText = geminiData.candidates[0].content.parts[0].text;
    }
    // Add model info prefix
    responseText = '[ESAI-Alpha-1 | ESAI | Released: 2025, Start of Term 4]\n' + responseText;
    res.json({ response: responseText });
  } catch (err) {
    res.status(500).json({ response: 'Error calling Gemini API.' });
  }
});

app.get('/', (req, res) => {
  res.send(
    '<!DOCTYPE html>' +
    '<html lang="en">' +
    '<head>' +
    '  <meta charset="UTF-8">' +
    '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
    '  <title>Ellerslie School AI</title>' +
    '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">' +
    '  <style>' +
    '    :root { --primary: #2563eb; --primary-dark: #1d4ed8; --primary-light: #93c5fd; --accent: #3b82f6; --light: #f8fafc; --dark: #1e293b; --gray: #64748b; --success: #10b981; --error: #ef4444; }' +
    '    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; }' +
    '    body { background-color: #f0f7ff; color: var(--dark); height: 100vh; display: flex; flex-direction: column; }' +
    '    header { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }' +
    '    .logo-container { display: flex; align-items: center; gap: 1rem; }' +
    '    .logo { width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--primary); font-size: 20px; }' +
    '    .brand-name { font-size: 1.8rem; font-weight: 700; }' +
    '    .model-badge { background: var(--primary-light); color: var(--primary-dark); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; margin-left: 1rem; }' +
    '    .chat-container { max-width: 700px; margin: 2rem auto; background: #fff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.07); padding: 2rem; display: flex; flex-direction: column; }' +
    '    .chat-messages { min-height: 300px; margin-bottom: 1rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; }' +
    '    .message { padding: 1rem 1.5rem; border-radius: 12px; line-height: 1.5; max-width: 80%; }' +
    '    .user-message { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }' +
    '    .ai-message { background: #f1f5f9; align-self: flex-start; border-bottom-left-radius: 4px; }' +
    '    .chat-input-container { padding-top: 1rem; border-top: 1px solid #e2e8f0; }' +
    '    .chat-input-wrapper { display: flex; gap: 1rem; align-items: flex-end; }' +
    '    .chat-input { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 0.75rem 1rem; font-size: 1rem; resize: none; min-height: 50px; max-height: 150px; outline: none; transition: border-color 0.3s; }' +
    '    .chat-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.2); }' +
    '    .send-btn { background: var(--primary); color: white; border: none; width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background-color 0.3s; font-size: 1.2rem; }' +
    '    .send-btn:hover { background: var(--primary-dark); }' +
    '    @media (max-width: 900px) { .chat-container { max-width: 98vw; } }' +
    '    @media (max-width: 600px) { .chat-container { padding: 0.5rem; } .chat-input { font-size: 0.9rem; } }' +
    '    /* Extra style polish */' +
    '    .chat-messages::-webkit-scrollbar { width: 8px; background: #e2e8f0; }' +
    '    .chat-messages::-webkit-scrollbar-thumb { background: var(--primary-light); border-radius: 8px; }' +
    '    .send-btn i { margin: 0; }' +
    '    .chat-input::-webkit-input-placeholder { color: var(--gray); }' +
    '    .chat-input:-ms-input-placeholder { color: var(--gray); }' +
    '    .chat-input::placeholder { color: var(--gray); }' +
    '    .chat-container { animation: fadeIn 0.7s; }' +
    '    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }' +
    '    /* Add more style polish here as needed */' +
    '  </style>' +
    '</head>' +
    '<body>' +
    '  <header>' +
    '    <div class="logo-container">' +
    '      <div class="logo">ES</div>' +
    '      <div class="brand-name">Ellerslie School AI</div>' +
    '      <span class="model-badge">Model: ESAI-Alpha-1</span>' +
    '    </div>' +
    '    <div style="font-size: 1rem;">Made by ESAI, Released: 2025, Start of Term 4</div>' +
    '  </header>' +
    '  <div class="chat-container">' +
    '    <div class="chat-messages" id="chat-messages"></div>' +
    '    <div class="chat-input-container">' +
    '      <form id="chat-form" class="chat-input-wrapper">' +
    '        <textarea id="chat-input" class="chat-input" placeholder="Type your message..." autocomplete="off"></textarea>' +
    '        <button type="submit" class="send-btn"><i class="fas fa-paper-plane"></i></button>' +
    '      </form>' +
    '    </div>' +
    '  </div>' +
    '  <script>' +
    '    const chatForm = document.getElementById("chat-form");' +
    '    const chatInput = document.getElementById("chat-input");' +
    '    const chatMessages = document.getElementById("chat-messages");' +
    '    chatForm.addEventListener("submit", async function(e) {' +
    '      e.preventDefault();' +
    '      const userMsg = chatInput.value.trim();' +
    '      if (!userMsg) return;' +
    '      addMessage("user", userMsg);' +
    '      chatInput.value = "";' +
    '      addMessage("ai", "...");' +
    '      try {' +
    '        const res = await fetch("/api/gemini", {' +
    '          method: "POST",' +
    '          headers: { "Content-Type": "application/json" },' +
    '          body: JSON.stringify({ prompt: userMsg })' +
    '        });' +
    '        const data = await res.json();' +
    '        updateLastAIMessage(data.response);' +
    '      } catch (err) {' +
    '        updateLastAIMessage("Sorry, there was an error.");' +
    '      }' +
    '    });' +
    '    function addMessage(sender, text) {' +
    '      const msgDiv = document.createElement("div");' +
    '      msgDiv.className = "message " + (sender === "user" ? "user-message" : "ai-message");' +
    '      msgDiv.textContent = text;' +
    '      chatMessages.appendChild(msgDiv);' +
    '      chatMessages.scrollTop = chatMessages.scrollHeight;' +
    '    }' +
    '    function updateLastAIMessage(text) {' +
    '      const msgs = chatMessages.getElementsByClassName("ai-message");' +
    '      if (msgs.length) msgs[msgs.length-1].textContent = text;' +
    '    }' +
    '  </script>' +
    '</body>' +
    '</html>'
  );
});

module.exports = app;
      '    .chat-messages { min-height: 200px; margin-bottom: 1rem; }' +
      '    .message { margin-bottom: 1rem; padding: 1rem; border-radius: 8px; }' +
      '    .user-message { background: #2563eb; color: #fff; text-align: right; }' +
      '    .ai-message { background: #f1f5f9; color: #1e293b; text-align: left; }' +
      '    .chat-input { width: 100%; padding: 0.75rem; border-radius: 8px; border: 1px solid #ddd; margin-bottom: 1rem; }' +
      '    .send-btn { background: #2563eb; color: #fff; border: none; border-radius: 8px; padding: 0.75rem 1.5rem; cursor: pointer; font-weight: 600; }' +
      '    .send-btn:hover { background: #1d4ed8; }' +
      '  </style>' +
      '</head>' +
      '<body>' +
      '  <header style="background: linear-gradient(135deg, #2563eb, #1d4ed8); color: white; padding: 1rem 2rem; display: flex; align-items: center; justify-content: space-between;">' +
      '    <div style="display: flex; align-items: center; gap: 1rem;">' +
      '      <div style="width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: #2563eb; font-size: 20px;">ES</div>' +
      '      <div style="font-size: 1.8rem; font-weight: 700;">Ellerslie School AI</div>' +
      '      <span class="model-badge">Model: ESAI-Alpha-1</span>' +
      '    </div>' +
      '    <div style="font-size: 1rem;">Made by ESAI, Released: 2025, Start of Term 4</div>' +
      '  </header>' +
      res.send(
        '<!DOCTYPE html>' +
        '<html lang="en">' +
        '<head>' +
        '  <meta charset="UTF-8">' +
        '  <meta name="viewport" content="width=device-width, initial-scale=1.0">' +
        '  <title>Ellerslie School AI</title>' +
        '  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">' +
        '  <style>' +
        '    :root { --primary: #2563eb; --primary-dark: #1d4ed8; --primary-light: #93c5fd; --accent: #3b82f6; --light: #f8fafc; --dark: #1e293b; --gray: #64748b; --success: #10b981; --error: #ef4444; }' +
        '    * { margin: 0; padding: 0; box-sizing: border-box; font-family: Segoe UI, Tahoma, Geneva, Verdana, sans-serif; }' +
        '    body { background-color: #f0f7ff; color: var(--dark); height: 100vh; display: flex; flex-direction: column; }' +
        '    header { background: linear-gradient(135deg, var(--primary), var(--primary-dark)); color: white; padding: 1rem 2rem; display: flex; justify-content: space-between; align-items: center; box-shadow: 0 4px 6px rgba(0,0,0,0.1); }' +
        '    .logo-container { display: flex; align-items: center; gap: 1rem; }' +
        '    .logo { width: 50px; height: 50px; background: white; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-weight: bold; color: var(--primary); font-size: 20px; }' +
        '    .brand-name { font-size: 1.8rem; font-weight: 700; }' +
        '    .model-badge { background: var(--primary-light); color: var(--primary-dark); padding: 0.25rem 0.75rem; border-radius: 20px; font-size: 0.85rem; font-weight: 500; margin-left: 1rem; }' +
        '    .chat-container { max-width: 700px; margin: 2rem auto; background: #fff; border-radius: 12px; box-shadow: 0 10px 25px rgba(0,0,0,0.07); padding: 2rem; display: flex; flex-direction: column; }' +
        '    .chat-messages { min-height: 300px; margin-bottom: 1rem; flex: 1; overflow-y: auto; display: flex; flex-direction: column; gap: 1.5rem; }' +
        '    .message { padding: 1rem 1.5rem; border-radius: 12px; line-height: 1.5; max-width: 80%; }' +
        '    .user-message { background: var(--primary); color: white; align-self: flex-end; border-bottom-right-radius: 4px; }' +
        '    .ai-message { background: #f1f5f9; align-self: flex-start; border-bottom-left-radius: 4px; }' +
        '    .chat-input-container { padding-top: 1rem; border-top: 1px solid #e2e8f0; }' +
        '    .chat-input-wrapper { display: flex; gap: 1rem; align-items: flex-end; }' +
        '    .chat-input { flex: 1; border: 1px solid #ddd; border-radius: 8px; padding: 0.75rem 1rem; font-size: 1rem; resize: none; min-height: 50px; max-height: 150px; outline: none; transition: border-color 0.3s; }' +
        '    .chat-input:focus { border-color: var(--primary); box-shadow: 0 0 0 3px rgba(37,99,235,0.2); }' +
        '    .send-btn { background: var(--primary); color: white; border: none; width: 50px; height: 50px; border-radius: 8px; display: flex; align-items: center; justify-content: center; cursor: pointer; transition: background-color 0.3s; font-size: 1.2rem; }' +
        '    .send-btn:hover { background: var(--primary-dark); }' +
        '    @media (max-width: 900px) { .chat-container { max-width: 98vw; } }' +
        '    @media (max-width: 600px) { .chat-container { padding: 0.5rem; } .chat-input { font-size: 0.9rem; } }' +
        '    /* Extra style polish */' +
        '    .chat-messages::-webkit-scrollbar { width: 8px; background: #e2e8f0; }' +
        '    .chat-messages::-webkit-scrollbar-thumb { background: var(--primary-light); border-radius: 8px; }' +
        '    .send-btn i { margin: 0; }' +
        '    .chat-input::-webkit-input-placeholder { color: var(--gray); }' +
        '    .chat-input:-ms-input-placeholder { color: var(--gray); }' +
        '    .chat-input::placeholder { color: var(--gray); }' +
        '    .chat-container { animation: fadeIn 0.7s; }' +
        '    @keyframes fadeIn { from { opacity: 0; transform: translateY(20px); } to { opacity: 1; transform: none; } }' +
        '    /* Add more style polish here as needed */' +
        '  </style>' +
        '</head>' +
        '<body>' +
        '  <header>' +
        '    <div class="logo-container">' +
        '      <div class="logo">ES</div>' +
        '      <div class="brand-name">Ellerslie School AI</div>' +
        '      <span class="model-badge">Model: ESAI-Alpha-1</span>' +
        '    </div>' +
        '    <div style="font-size: 1rem;">Made by ESAI, Released: 2025, Start of Term 4</div>' +
        '  </header>' +
        '  <div class="chat-container">' +
        '    <div class="chat-messages" id="chat-messages"></div>' +
        '    <div class="chat-input-container">' +
        '      <form id="chat-form" class="chat-input-wrapper">' +
        '        <textarea id="chat-input" class="chat-input" placeholder="Type your message..." autocomplete="off"></textarea>' +
        '        <button type="submit" class="send-btn"><i class="fas fa-paper-plane"></i></button>' +
        '      </form>' +
        '    </div>' +
        '  </div>' +
        '  <script>' +
        '    const chatForm = document.getElementById("chat-form");' +
        '    const chatInput = document.getElementById("chat-input");' +
        '    const chatMessages = document.getElementById("chat-messages");' +
        '    chatForm.addEventListener("submit", async function(e) {' +
        '      e.preventDefault();' +
        '      const userMsg = chatInput.value.trim();' +
        '      if (!userMsg) return;' +
        '      addMessage("user", userMsg);' +
        '      chatInput.value = "";' +
        '      addMessage("ai", "...");' +
        '      try {' +
        '        const res = await fetch("/api/gemini", {' +
        '          method: "POST",' +
        '          headers: { "Content-Type": "application/json" },' +
        '          body: JSON.stringify({ prompt: userMsg })' +
        '        });' +
        '        const data = await res.json();' +
        '        updateLastAIMessage(data.response);' +
        '      } catch (err) {' +
        '        updateLastAIMessage("Sorry, there was an error.");' +
        '      }' +
        '    });' +
        '    function addMessage(sender, text) {' +
        '      const msgDiv = document.createElement("div");' +
        '      msgDiv.className = "message " + (sender === "user" ? "user-message" : "ai-message");' +
        '      msgDiv.textContent = text;' +
        '      chatMessages.appendChild(msgDiv);' +
        '      chatMessages.scrollTop = chatMessages.scrollHeight;' +
        '    }' +
        '    function updateLastAIMessage(text) {' +
        '      const msgs = chatMessages.getElementsByClassName("ai-message");' +
        '      if (msgs.length) msgs[msgs.length-1].textContent = text;' +
        '    }' +
        '  </script>' +
        '</body>' +
        '</html>'
      );
          '  <div class="chat-container">' +
          '    <div class="chat-messages" id="chat-messages"></div>' +
          '    <div class="chat-input-container">' +
          '      <form id="chat-form" class="chat-input-wrapper">' +
          '        <textarea id="chat-input" class="chat-input" placeholder="Type your message..." autocomplete="off"></textarea>' +
          '        <button type="submit" class="send-btn"><i class="fas fa-paper-plane"></i></button>' +
          '      </form>' +
          '    </div>' +
          '  </div>' +
          '  <script>' +
          '    const chatForm = document.getElementById("chat-form");' +
          '    const chatInput = document.getElementById("chat-input");' +
          '    const chatMessages = document.getElementById("chat-messages");' +
          '    chatForm.addEventListener("submit", async function(e) {' +
          '      e.preventDefault();' +
          '      const userMsg = chatInput.value.trim();' +
          '      if (!userMsg) return;' +
          '      addMessage("user", userMsg);' +
          '      chatInput.value = "";' +
          '      addMessage("ai", "...");' +
          '      try {' +
          '        const res = await fetch("/api/gemini", {' +
          '          method: "POST",' +
          '          headers: { "Content-Type": "application/json" },' +
          '          body: JSON.stringify({ prompt: userMsg })' +
          '        });' +
          '        const data = await res.json();' +
          '        updateLastAIMessage(data.response);' +
          '      } catch (err) {' +
          '        updateLastAIMessage("Sorry, there was an error.");' +
          '      }' +
          '    });' +
          '    function addMessage(sender, text) {' +
          '      const msgDiv = document.createElement("div");' +
          '      msgDiv.className = "message " + (sender === "user" ? "user-message" : "ai-message");' +
          '      msgDiv.textContent = text;' +
          '      chatMessages.appendChild(msgDiv);' +
          '      chatMessages.scrollTop = chatMessages.scrollHeight;' +
          '    }' +
          '    function updateLastAIMessage(text) {' +
          '      const msgs = chatMessages.getElementsByClassName("ai-message");' +
          '      if (msgs.length) msgs[msgs.length-1].textContent = text;' +
          '    }' +
          '  </script>' +
          '</body>' +
      '</html>'
  );
});

module.exports = app;
