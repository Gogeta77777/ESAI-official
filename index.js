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
	data.users.push({ name, username, password });
	writeData(data);
	res.json({ success: true });
});

// Login endpoint
app.post('/api/login', (req, res) => {
	const { username, password } = req.body;
	const data = readData();
	const user = data.users.find(u => u.username === username && u.password === password);
	if (!user) {
		return res.json({ success: false, error: 'Invalid credentials.' });
	}
	res.json({ success: true });
});

// Gemini API endpoint
app.post('/api/gemini', async (req, res) => {
	const { message } = req.body;
	const GEMINI_API_KEY = process.env.GEMINI_API_KEY || 'AIzaSyCVqKHmBKSuHjy0uaZ5UJTzbBX66sfafWo';
	try {
		const geminiRes = await fetch(`https://generativelanguage.googleapis.com/v1/models/gemini-1.0-pro:generateContent?key=${GEMINI_API_KEY}`, {
			method: 'POST',
			headers: { 'Content-Type': 'application/json' },
			body: JSON.stringify({
				contents: [{ role: 'user', parts: [{ text: message }] }],
				generationConfig: { temperature: 0.7 }
			})
		});
		const geminiData = await geminiRes.json();
		let reply = '';
		if (geminiData && geminiData.candidates && geminiData.candidates[0] && geminiData.candidates[0].content && geminiData.candidates[0].content.parts && geminiData.candidates[0].content.parts[0].text) {
			reply = geminiData.candidates[0].content.parts[0].text;
		} else {
			reply = 'Sorry, no response from Gemini.';
		}
		res.json({ reply });
	} catch (e) {
		res.json({ reply: 'Error contacting Gemini API.' });
	}
});

// Vercel serverless export
module.exports = app;
