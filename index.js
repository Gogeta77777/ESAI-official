
const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send(`<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>Ellerslie School AI</title>
  <style>
  :root {
    --primary: #2563eb;
    --primary-dark: #1d4ed8;
    --primary-light: #93c5fd;
    --accent: #3b82f6;
    --light: #f8fafc;
    --dark: #1e293b;
    --gray: #64748b;
    --success: #10b981;
    --error: #ef4444;
  }
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
    font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  }
  body {
    background-color: #f0f7ff;
    color: var(--dark);
    height: 100vh;
    display: flex;
    flex-direction: column;
  }
  /* Header Styles */
  header {
    background: linear-gradient(135deg, var(--primary), var(--primary-dark));
    color: white;
    padding: 1rem 2rem;
    display: flex;
    justify-content: space-between;
    align-items: center;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
  }
  .logo-container {
    display: flex;
    align-items: center;
    gap: 1rem;
  }
  .logo {
    width: 50px;
    height: 50px;
    background-color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--primary);
    font-size: 20px;
  }
  .brand-name {
    font-size: 1.8rem;
    font-weight: 700;
  }
  main {
    flex: 1;
    display: flex;
    overflow: hidden;
  }
  .auth-container {
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 2rem;
    background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" width="100" height="100" viewBox="0 0 100 100"><rect fill="%232563eb" opacity="0.1" width="50" height="50"/><rect fill="%232563eb" opacity="0.1" x="50" y="50" width="50" height="50"/></svg>');
  }
  .auth-form {
    background: white;
    padding: 2.5rem;
    border-radius: 12px;
    box-shadow: 0 10px 25px rgba(0, 0, 0, 0.1);
    width: 100%;
    max-width: 450px;
  }
  .auth-form h2 {
    color: var(--primary);
    margin-bottom: 1.5rem;
    text-align: center;
    font-size: 1.8rem;
  }
  .form-group {
    margin-bottom: 1.5rem;
  }
  .form-group label {
    display: block;
    margin-bottom: 0.5rem;
    font-weight: 500;
    color: var(--dark);
  }
  .form-group input {
    width: 100%;
    padding: 0.75rem 1rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    font-size: 1rem;
    transition: border-color 0.3s;
  }
  .form-group input:focus {
    outline: none;
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
  .btn {
    padding: 0.75rem 1.5rem;
    border: none;
    border-radius: 8px;
    font-size: 1rem;
    font-weight: 600;
    cursor: pointer;
    transition: all 0.3s;
  }
  .btn-primary {
    background-color: var(--primary);
    color: white;
    width: 100%;
  }
  .btn-primary:hover {
    background-color: var(--primary-dark);
  }
  .auth-switch {
    text-align: center;
    margin-top: 1.5rem;
    color: var(--gray);
  }
  .auth-switch a {
    color: var(--primary);
    text-decoration: none;
    font-weight: 600;
  }
  .chat-container {
    display: none;
    flex: 1;
    flex-direction: column;
    height: 100%;
  }
  .sidebar {
    width: 300px;
    background-color: white;
    border-right: 1px solid #e2e8f0;
    padding: 1.5rem;
    display: flex;
    flex-direction: column;
    overflow-y: auto;
  }
  .user-info {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 2rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid #e2e8f0;
  }
  .user-avatar {
    width: 50px;
    height: 50px;
    background-color: var(--primary-light);
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-weight: bold;
    color: var(--primary);
    font-size: 1.2rem;
  }
  .user-details {
    flex: 1;
  }
  .user-details h3 {
    font-size: 1.1rem;
    margin-bottom: 0.25rem;
  }
  .user-details p {
    color: var(--gray);
    font-size: 0.9rem;
  }
  .logout-btn {
    background: none;
    border: none;
    color: var(--gray);
    cursor: pointer;
    font-size: 1.2rem;
  }
  .new-chat-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 1.5rem;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    gap: 0.5rem;
  }
  .chat-history {
    flex: 1;
    overflow-y: auto;
  }
  .chat-item {
    padding: 0.75rem;
    border-radius: 8px;
    margin-bottom: 0.5rem;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    transition: background-color 0.3s;
  }
  .chat-item:hover {
    background-color: #f1f5f9;
  }
  .chat-item.active {
    background-color: var(--primary-light);
  }
  .chat-item i {
    color: var(--gray);
  }
  .model-selector {
    margin-top: 1.5rem;
    padding-top: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  .model-selector select {
    width: 100%;
    padding: 0.75rem;
    border: 1px solid #ddd;
    border-radius: 8px;
    background-color: white;
    font-size: 1rem;
  }
  .model-option {
    display: flex;
    justify-content: space-between;
  }
  .in-dev {
    color: var(--gray);
    font-size: 0.8rem;
  }
  .chat-main {
    flex: 1;
    display: flex;
    flex-direction: column;
    background-color: white;
  }
  .chat-header {
    padding: 1rem 1.5rem;
    border-bottom: 1px solid #e2e8f0;
    display: flex;
    align-items: center;
    gap: 0.75rem;
  }
  .model-badge {
    background-color: var(--primary-light);
    color: var(--primary-dark);
    padding: 0.25rem 0.75rem;
    border-radius: 20px;
    font-size: 0.85rem;
    font-weight: 500;
  }
  .chat-messages {
    flex: 1;
    padding: 1.5rem;
    overflow-y: auto;
    display: flex;
    flex-direction: column;
    gap: 1.5rem;
  }
  .message {
    max-width: 80%;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    line-height: 1.5;
  }
  .user-message {
    background-color: var(--primary);
    color: white;
    align-self: flex-end;
    border-bottom-right-radius: 4px;
  }
  .ai-message {
    background-color: #f1f5f9;
    align-self: flex-start;
    border-bottom-left-radius: 4px;
  }
  .typing-indicator {
    display: none;
    background-color: #f1f5f9;
    padding: 1rem 1.5rem;
    border-radius: 12px;
    align-self: flex-start;
    margin-bottom: 1rem;
    border-bottom-left-radius: 4px;
  }
  .typing-indicator span {
    height: 8px;
    width: 8px;
    background-color: var(--gray);
    border-radius: 50%;
    display: inline-block;
    margin-right: 5px;
    animation: typing 1.3s infinite;
  }
  .typing-indicator span:nth-child(2) {
    animation-delay: 0.2s;
  }
  .typing-indicator span:nth-child(3) {
    animation-delay: 0.4s;
  }
  @keyframes typing {
    0%, 100% { transform: translateY(0); }
    50% { transform: translateY(-5px); }
  }
  .chat-input-container {
    padding: 1.5rem;
    border-top: 1px solid #e2e8f0;
  }
  .chat-input-wrapper {
    display: flex;
    gap: 1rem;
    align-items: flex-end;
  }
  .chat-input {
    flex: 1;
    border: 1px solid #ddd;
    border-radius: 8px;
    padding: 0.75rem 1rem;
    font-size: 1rem;
    resize: none;
    min-height: 50px;
    max-height: 150px;
    outline: none;
    transition: border-color 0.3s;
  }
  .chat-input:focus {
    border-color: var(--primary);
    box-shadow: 0 0 0 3px rgba(37, 99, 235, 0.2);
  }
  .send-btn {
    background-color: var(--primary);
    color: white;
    border: none;
    width: 50px;
    height: 50px;
    border-radius: 8px;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s;
  }
  .send-btn:hover {
    background-color: var(--primary-dark);
  }
  .cancel-btn {
    display: none;
    background-color: var(--error);
    color: white;
    border: none;
    padding: 0.5rem 1rem;
    border-radius: 8px;
    margin-top: 0.5rem;
    cursor: pointer;
    font-weight: 500;
    transition: background-color 0.3s;
  }
  .cancel-btn:hover {
    background-color: #dc2626;
  }
  @media (max-width: 768px) {
    .sidebar {
      position: absolute;
      left: -100%;
      height: 100%;
      z-index: 100;
      transition: left 0.3s;
    }
    .sidebar.active {
      left: 0;
    }
    .menu-toggle {
      display: block;
      background: none;
      border: none;
      font-size: 1.5rem;
      color: var(--dark);
      cursor: pointer;
    }
    .message {
      max-width: 90%;
    }
  }
  </style>
</head>
<body>
  <!-- Header Section -->
  <header>
    <div class="logo-container">
      <div class="logo">ES</div>
      <div class="brand-name">Ellerslie School AI</div>
    </div>
    <button class="menu-toggle" style="display: none;">
      <i class="fas fa-bars"></i>
    </button>
  </header>
  <!-- Main Content -->
  <main>
    <!-- Authentication Section -->
    <div class="auth-container" id="auth-container">
      <!-- Login Form -->
      <form class="auth-form" id="login-form">
        <h2>Login to ESAI</h2>
        <div class="form-group">
          <label for="login-username">Username</label>
          <input type="text" id="login-username" placeholder="Enter your username" required>
        </div>
        <div class="form-group">
          <label for="login-password">Password</label>
          <input type="password" id="login-password" placeholder="Enter your password" required>
        </div>
        <button type="submit" class="btn btn-primary">Login</button>
        <div class="auth-switch">
          Don't have an account? <a href="#" id="show-signup">Sign up</a>
        </div>
      </form>
      <!-- Signup Form -->
      <form class="auth-form" id="signup-form" style="display: none;">
        <h2>Create an Account</h2>
        <div class="form-group">
          <label for="signup-realname">Real Name</label>
          <input type="text" id="signup-realname" placeholder="Enter your real name" required>
        </div>
        <div class="form-group">
          <label for="signup-username">Username</label>
          <input type="text" id="signup-username" placeholder="Choose a username" required>
        </div>
        <div class="form-group">
          <label for="signup-password">Password</label>
          <input type="password" id="signup-password" placeholder="Create a password" required>
        </div>
        <button type="submit" class="btn btn-primary">Sign Up</button>
        <div class="auth-switch">
          Already have an account? <a href="#" id="show-login">Login</a>
        </div>
      </form>
    </div>
    <!-- Chat Interface -->
    <div class="chat-container" id="chat-container">
      <!-- Sidebar -->
      <div class="sidebar">
        <div class="user-info">
          <div class="user-avatar" id="user-avatar">JD</div>
          <div class="user-details">
            <h3 id="user-realname">John Doe</h3>
            <p id="user-username">@johndoe</p>
          </div>
          <button class="logout-btn" id="logout-btn">
            <i class="fas fa-sign-out-alt"></i>
          </button>
        </div>
        <button class="new-chat-btn" id="new-chat-btn">
          <i class="fas fa-plus"></i> New Chat
        </button>
        <div class="chat-history" id="chat-history"></div>
        <div class="model-selector">
          <label for="model-select">AI Model</label>
          <select id="model-select">
            <option value="ESAI-Alpha-1">ESAI-Alpha-1</option>
            <option value="ESAI-Alpha-2" disabled>ESAI-Alpha-2 (In-development)</option>
          </select>
        </div>
      </div>
      <!-- Chat Main Area -->
      <div class="chat-main">
        <div class="chat-header">
          <i class="fas fa-robot" style="color: var(--primary);"></i>
          <h3>ESAI-Alpha-1</h3>
          <span class="model-badge">Active</span>
        </div>
        <div class="chat-messages" id="chat-messages"></div>
        <div class="chat-input-container">
          <div class="chat-input-wrapper">
            <textarea class="chat-input" id="chat-input" placeholder="Type your message here..." rows="1"></textarea>
            <button class="send-btn" id="send-btn"><i class="fas fa-paper-plane"></i></button>
          </div>
          <button class="cancel-btn" id="cancel-btn">Cancel Response</button>
        </div>
      </div>
    </div>
  </main>
  <script>
// DOM Elements
const authContainer = document.getElementById('auth-container');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const showSignupLink = document.getElementById('show-signup');
const showLoginLink = document.getElementById('show-login');
const chatContainer = document.getElementById('chat-container');
const logoutBtn = document.getElementById('logout-btn');
const newChatBtn = document.getElementById('new-chat-btn');
const chatHistory = document.getElementById('chat-history');
const chatMessages = document.getElementById('chat-messages');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const cancelBtn = document.getElementById('cancel-btn');
const userAvatar = document.getElementById('user-avatar');
const userRealname = document.getElementById('user-realname');
const userUsername = document.getElementById('user-username');
const modelSelect = document.getElementById('model-select');

// Application State
let currentUser = null;
let chats = [];
let currentChatId = null;
let isAIResponding = false;
let cancelResponse = false;

// Initialize the application
function init() {
  loadUserData();
  setupEventListeners();
  checkAuthStatus();
}

// Set up event listeners
function setupEventListeners() {
  // Auth form toggling
  showSignupLink.addEventListener('click', (e) => {
    e.preventDefault();
    loginForm.style.display = 'none';
    signupForm.style.display = 'block';
  });

  showLoginLink.addEventListener('click', (e) => {
    e.preventDefault();
    signupForm.style.display = 'none';
    loginForm.style.display = 'block';
  });

  // Form submissions
  loginForm.addEventListener('submit', handleLogin);
  signupForm.addEventListener('submit', handleSignup);
    
  // Chat interactions
  logoutBtn.addEventListener('click', handleLogout);
  newChatBtn.addEventListener('click', createNewChat);
  sendBtn.addEventListener('click', handleSendMessage);
  cancelBtn.addEventListener('click', handleCancelResponse);
    
  chatInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSendMessage();
    }
        
    // Auto-resize textarea
    setTimeout(() => {
      chatInput.style.height = 'auto';
      chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
    }, 0);
  });
}

// Check if user is authenticated
function checkAuthStatus() {
  const savedUser = localStorage.getItem('currentUser');
  if (savedUser) {
    currentUser = JSON.parse(savedUser);
    showChatInterface();
    loadChats();
  } else {
    showAuthInterface();
  }
}

// Handle user login
function handleLogin(e) {
  e.preventDefault();
  const username = document.getElementById('login-username').value;
  const password = document.getElementById('login-password').value;
    
  const users = JSON.parse(localStorage.getItem('users') || '[]');
  const user = users.find(u => u.username === username && u.password === password);
    
  if (user) {
    currentUser = { realName: user.realName, username: user.username };
    localStorage.setItem('currentUser', JSON.stringify(currentUser));
    showChatInterface();
    loadChats();
  } else {
    alert('Invalid username or password');
  }
}

// Handle user signup
function handleSignup(e) {
  e.preventDefault();
  const realName = document.getElementById('signup-realname').value;
  const username = document.getElementById('signup-username').value;
  const password = document.getElementById('signup-password').value;
    
  let users = JSON.parse(localStorage.getItem('users') || '[]');
    
  if (users.some(u => u.username === username)) {
    alert('Username already exists');
    return;
  }
    
  users.push({ realName, username, password });
  localStorage.setItem('users', JSON.stringify(users));
    
  currentUser = { realName, username };
  localStorage.setItem('currentUser', JSON.stringify(currentUser));
    
  showChatInterface();
  createNewChat();
}

// Handle logout
function handleLogout() {
  currentUser = null;
  localStorage.removeItem('currentUser');
  showAuthInterface();
}

// Show authentication interface
function showAuthInterface() {
  authContainer.style.display = 'flex';
  chatContainer.style.display = 'none';
  loginForm.reset();
  signupForm.reset();
  loginForm.style.display = 'block';
  signupForm.style.display = 'none';
}

// Show chat interface
function showChatInterface() {
  authContainer.style.display = 'none';
  chatContainer.style.display = 'flex';
    
  // Update user info
  userAvatar.textContent = currentUser.realName.split(' ').map(n => n[0]).join('').toUpperCase();
  userRealname.textContent = currentUser.realName;
  userUsername.textContent = `@${currentUser.username}`;
}

// Load user data from localStorage
function loadUserData() {
  // This would load additional user data if needed
}

// Load user's chats
function loadChats() {
  const savedChats = JSON.parse(localStorage.getItem('chats') || '{}');
  chats = savedChats[currentUser.username] || [];
    
  renderChatHistory();
    
  if (chats.length > 0) {
    // Open the last chat
    openChat(chats[chats.length - 1].id);
  } else {
    // Create a new chat if none exist
    createNewChat();
  }
}

// Create a new chat
function createNewChat() {
  const chatId = Date.now().toString();
  const newChat = {
    id: chatId,
    title: "New Chat",
    messages: [],
    createdAt: new Date().toISOString()
  };
    
  chats.push(newChat);
  saveChats();
  renderChatHistory();
  openChat(chatId);
}

// Open a specific chat
function openChat(chatId) {
  currentChatId = chatId;
  const chat = chats.find(c => c.id === chatId);
    
  if (!chat) return;
    
  // Update UI to show active chat
  document.querySelectorAll('.chat-item').forEach(item => {
    if (item.dataset.chatId === chatId) {
      item.classList.add('active');
    } else {
      item.classList.remove('active');
    }
  });
    
  // Render chat messages
  renderChatMessages(chat.messages);
}

// Render chat history in sidebar
function renderChatHistory() {
  chatHistory.innerHTML = '';
    
  chats.forEach(chat => {
    const chatItem = document.createElement('div');
    chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
    chatItem.dataset.chatId = chat.id;
        
    chatItem.innerHTML = `
      <i class="fas fa-message"></i>
      <span>${chat.title}</span>
    `;
        
    chatItem.addEventListener('click', () => openChat(chat.id));
    chatHistory.appendChild(chatItem);
  });
}

// Render chat messages
function renderChatMessages(messages) {
  chatMessages.innerHTML = '';
    
  if (messages.length === 0) {
    // Show welcome message for empty chat
    const welcomeMsg = document.createElement('div');
    welcomeMsg.className = 'message ai-message';
    welcomeMsg.innerHTML = `
      <p>Hello! I'm ESAI-Alpha-1, the first AI model from Ellerslie School AI. How can I assist you today?</p>
    `;
    chatMessages.appendChild(welcomeMsg);
    return;
  }
    
  messages.forEach(msg => {
    const messageEl = document.createElement('div');
    messageEl.className = `message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`;
    messageEl.innerHTML = `<p>${msg.content}</p>`;
    chatMessages.appendChild(messageEl);
  });
    
  // Scroll to bottom
  chatMessages.scrollTop = chatMessages.scrollHeight;
}

// Handle sending a message
function handleSendMessage() {
  if (isAIResponding) return;
    
  const message = chatInput.value.trim();
  if (!message) return;
    
  // Add user message to chat
  addMessageToChat('user', message);
  chatInput.value = '';
  chatInput.style.height = 'auto';
    
  // Generate AI response
  generateAIResponse(message);
}

// Add a message to the current chat
function addMessageToChat(sender, content) {
  const chat = chats.find(c => c.id === currentChatId);
  if (!chat) return;
    
  chat.messages.push({ sender, content });
    
  // Update chat title if it's the first message
  if (chat.messages.length === 1 && sender === 'user') {
    chat.title = content.length > 20 ? content.substring(0, 20) + '...' : content;
  }
    
  saveChats();
  renderChatMessages(chat.messages);
  renderChatHistory();
}

// Generate AI response
async function generateAIResponse(userMessage) {
  isAIResponding = true;
  cancelResponse = false;
  cancelBtn.style.display = 'block';
    
  // Show typing indicator
  const typingIndicator = document.createElement('div');
  typingIndicator.className = 'typing-indicator';
  typingIndicator.innerHTML = `
    <span></span>
    <span></span>
    <span></span>
  `;
  chatMessages.appendChild(typingIndicator);
  chatMessages.scrollTop = chatMessages.scrollHeight;
    
  try {
    // Simulate API call with a delay
    await new Promise(resolve => setTimeout(resolve, 1000));
        
    if (cancelResponse) {
      throw new Error('Response cancelled');
    }
        
    // Remove typing indicator
    typingIndicator.remove();
        
    // Generate response based on user message
    let response = '';
        
    if (userMessage.toLowerCase().includes('hello') || userMessage.toLowerCase().includes('hi')) {
      response = "Hello! I'm ESAI-Alpha-1, the first AI model from Ellerslie School AI. How can I assist you today?";
    } else if (userMessage.toLowerCase().includes('name')) {
      response = "My name is ESAI-Alpha-1. I'm an AI assistant developed by Ellerslie School AI.";
    } else if (userMessage.toLowerCase().includes('help')) {
      response = "I'm here to help! You can ask me questions, and I'll do my best to provide useful responses. As ESAI-Alpha-1, I'm still learning, but I'll try to assist you with any queries you might have.";
    } else {
      response = "Thank you for your message. As ESAI-Alpha-1, I'm designed to provide helpful responses. Could you please provide more details about your query?";
    }
        
    // Simulate typing effect
    await typeResponse(response);
        
    // Add AI message to chat
    addMessageToChat('ai', response);
        
  } catch (error) {
    if (error.message === 'Response cancelled') {
      typingIndicator.remove();
      const cancelledMsg = document.createElement('div');
      cancelledMsg.className = 'message ai-message';
      cancelledMsg.innerHTML = `<p>Response cancelled.</p>`;
      chatMessages.appendChild(cancelledMsg);
    } else {
      console.error('Error generating response:', error);
            
      typingIndicator.remove();
      const errorMsg = document.createElement('div');
      errorMsg.className = 'message ai-message';
      errorMsg.innerHTML = `<p>Sorry, I encountered an error. Please try again.</p>`;
      chatMessages.appendChild(errorMsg);
    }
  } finally {
    isAIResponding = false;
    cancelBtn.style.display = 'none';
  }
}

// Simulate typing response
async function typeResponse(response) {
  const messageEl = document.createElement('div');
  messageEl.className = 'message ai-message';
  messageEl.innerHTML = '<p></p>';
  chatMessages.appendChild(messageEl);
    
  const textEl = messageEl.querySelector('p');
    
  for (let i = 0; i < response.length; i++) {
    if (cancelResponse) {
      throw new Error('Response cancelled');
    }
        
    textEl.textContent += response[i];
    chatMessages.scrollTop = chatMessages.scrollHeight;
        
    // Random typing speed between 10-50ms per character
    await new Promise(resolve => setTimeout(resolve, 10 + Math.random() * 40));
  }
}

// Handle cancel response
function handleCancelResponse() {
  if (isAIResponding) {
    cancelResponse = true;
    cancelBtn.style.display = 'none';
  }
}

// Save chats to localStorage
function saveChats() {
  const allChats = JSON.parse(localStorage.getItem('chats') || '{}');
  allChats[currentUser.username] = chats;
  localStorage.setItem('chats', JSON.stringify(allChats));
}

// Initialize the application
init();
  </script>
  <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
</body>
</html>`);
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
