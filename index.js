const express = require('express');
const fetch = require('node-fetch');
const fs = require('fs');
const path = require('path');
const app = express();
app.use(express.json());

const DATA_PATH = path.join(__dirname, 'saveData.json');

function readData() {
	try {
		return JSON.parse(fs.readFileSync(DATA_PATH, 'utf8'));
	} catch (e) {
		return { users: [], chats: {} };
	}
}
function writeData(data) {
	fs.writeFileSync(DATA_PATH, JSON.stringify(data, null, 2));
}

// Serve static frontend
app.get('/', (req, res) => {
	res.sendFile(path.join(__dirname, 'index.html'));
});

// Sign up endpoint
app.post('/api/signup', (req, res) => {
	const { name, username, password } = req.body;
	const data = readData();
	if (!name || !username || !password) {
		return res.json({ success: false, error: 'All fields required.' });
	}
	if (data.users.find(u => u.username === username)) {
		return res.json({ success: false, error: 'Username already exists.' });
	}
	const newUser = { name, username, password };
	data.users.push(newUser);
	writeData(data);
	res.json({ success: true, user: { name, username } });
});

// Login endpoint
app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	const data = readData();
	const user = data.users.find(u => u.username === username && u.password === password);
	if (!user) {
		return res.json({ success: false, error: 'Invalid credentials.' });
	}
	res.json({ success: true, user: { name: user.name, username: user.username } });
});

// Gemini API endpoint
app.post('/api/gemini', async (req, res) => {
		const { message, model } = req.body || {};
		const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

		// If no API key is configured, return a helpful local fallback so the app remains usable in dev
		if (!GEMINI_API_KEY) {
			const modelName = model === 'esai-1' ? 'ESAI-1' : 'ESAI-1.1';
			const fallback = `${modelName} (local fallback): I don't have a configured Gemini API key in this environment. However, I can still help with general answers, examples, and explanations.
\n\nYou asked: "${(message||'').toString().slice(0,200)}"
\nResponse: Here's a helpful local response — try this prompt with a real API key for a full AI answer.`;
			return res.json({ reply: fallback });
		}

		// Map ESAI model names to Gemini models
		let geminiModel = 'gemini-pro';
		if (model === 'esai-1.1') {
			geminiModel = 'gemini-pro';
		} else if (model === 'esai-1') {
			geminiModel = 'gemini-pro';
		}
		
		let endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${geminiModel}:generateContent?key=${GEMINI_API_KEY}`;
		let reply = '';
		try {
			let geminiRes = await fetch(endpoint, {
				method: 'POST',
				headers: { 'Content-Type': 'application/json' },
				body: JSON.stringify({
					contents: [{ role: 'user', parts: [{ text: message }] }],
					generationConfig: { temperature: 0.7 }
				})
			});
			let geminiData = await geminiRes.json();
			if (!geminiRes.ok || geminiData.error) {
				// Try v1 endpoint if v1beta fails
				endpoint = `https://generativelanguage.googleapis.com/v1/models/${geminiModel}:generateContent?key=${GEMINI_API_KEY}`;
				geminiRes = await fetch(endpoint, {
					method: 'POST',
					headers: { 'Content-Type': 'application/json' },
					body: JSON.stringify({
						contents: [{ parts: [{ text: message }] }],
						generationConfig: { temperature: 0.7 }
					})
				});
				geminiData = await geminiRes.json();
			}
			if (geminiData && geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content && geminiData.candidates[0].content.parts && geminiData.candidates[0].content.parts[0].text) {
				reply = geminiData.candidates[0].content.parts[0].text;
			} else if (geminiData && geminiData.error) {
				reply = `Gemini API error: ${geminiData.error.message}`;
			} else {
				reply = 'Sorry, no response from Gemini.';
			}
			res.json({ reply });
		} catch (e) {
			console.error('Gemini request failed:', e && e.message);
			res.status(502).json({ error: 'Error contacting Gemini API.' });
		}
});

// If run directly (local development), start listening on a port
if (require.main === module) {
	const PORT = process.env.PORT || 3000;
	app.listen(PORT, () => {
		console.log(`ESAI server running on http://localhost:${PORT}`);
	});
} else {
	// Vercel/serverless export
	module.exports = app;
}
