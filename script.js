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
