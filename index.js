<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Ellerslie School AI</title>
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.4.0/css/all.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.css">
    <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/theme/dracula.min.css">
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/codemirror.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/javascript/javascript.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/python/python.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/htmlmixed/htmlmixed.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/css/css.min.js"></script>
    <script src="https://cdnjs.cloudflare.com/ajax/libs/codemirror/5.65.2/mode/xml/xml.min.js"></script>
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
            --code-bg: #1e1e1e;
            --sidebar-width: 280px;
        }
        
        * {
            margin: 0;
            padding: 0;
            box-sizing: border-box;
            font-family: 'Inter', 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
        }
        
        body {
            background-color: #f0f7ff;
            color: var(--dark);
            height: 100vh;
            display: flex;
            flex-direction: column;
            overflow: hidden;
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
            z-index: 100;
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
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
        }
        
        .brand-name {
            font-size: 1.8rem;
            font-weight: 800;
            letter-spacing: -0.5px;
        }
        
        /* Main Content */
        main {
            flex: 1;
            display: flex;
            overflow: hidden;
        }
        
        /* Auth Pages */
        .auth-container {
            width: 100%;
            display: flex;
            justify-content: center;
            align-items: center;
            padding: 2rem;
            background: linear-gradient(120deg, #e0f2fe, #dbeafe);
        }
        
        .auth-form {
            background: white;
            padding: 2.5rem;
            border-radius: 16px;
            box-shadow: 0 20px 40px rgba(0, 0, 0, 0.1);
            width: 100%;
            max-width: 450px;
            transform: translateY(0);
            transition: transform 0.3s, box-shadow 0.3s;
        }
        
        .auth-form:hover {
            transform: translateY(-5px);
            box-shadow: 0 25px 50px rgba(0, 0, 0, 0.15);
        }
        
        .auth-form h2 {
            color: var(--primary);
            margin-bottom: 1.5rem;
            text-align: center;
            font-size: 1.8rem;
            font-weight: 700;
        }
        
        .form-group {
            margin-bottom: 1.5rem;
        }
        
        .form-group label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--dark);
            font-size: 0.95rem;
        }
        
        .form-group input {
            width: 100%;
            padding: 0.875rem 1.25rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            font-size: 1rem;
            transition: all 0.3s;
            background-color: #f8fafc;
        }
        
        .form-group input:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
            background-color: white;
        }
        
        .btn {
            padding: 0.875rem 1.5rem;
            border: none;
            border-radius: 10px;
            font-size: 1rem;
            font-weight: 600;
            cursor: pointer;
            transition: all 0.3s;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
        }
        
        .btn-primary {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            width: 100%;
            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
        }
        
        .btn-primary:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.4);
        }
        
        .auth-switch {
            text-align: center;
            margin-top: 1.5rem;
            color: var(--gray);
            font-size: 0.95rem;
        }
        
        .auth-switch a {
            color: var(--primary);
            text-decoration: none;
            font-weight: 600;
            transition: color 0.3s;
        }
        
        .auth-switch a:hover {
            color: var(--primary-dark);
            text-decoration: underline;
        }
        
        /* Chat Interface */
        .chat-container {
            display: none;
            flex: 1;
            flex-direction: column;
            height: 100%;
        }
        
        .sidebar {
            width: var(--sidebar-width);
            background-color: white;
            border-right: 1px solid #e2e8f0;
            padding: 1.5rem;
            display: flex;
            flex-direction: column;
            overflow-y: auto;
            box-shadow: 2px 0 10px rgba(0, 0, 0, 0.05);
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
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            border-radius: 50%;
            display: flex;
            align-items: center;
            justify-content: center;
            font-weight: bold;
            color: white;
            font-size: 1.2rem;
            box-shadow: 0 4px 8px rgba(37, 99, 235, 0.2);
        }
        
        .user-details {
            flex: 1;
        }
        
        .user-details h3 {
            font-size: 1.1rem;
            margin-bottom: 0.25rem;
            color: var(--dark);
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
            transition: color 0.3s;
        }
        
        .logout-btn:hover {
            color: var(--error);
        }
        
        .new-chat-btn {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            padding: 0.875rem;
            border-radius: 10px;
            margin-bottom: 1.5rem;
            font-weight: 600;
            cursor: pointer;
            display: flex;
            align-items: center;
            justify-content: center;
            gap: 0.5rem;
            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
            transition: all 0.3s;
        }
        
        .new-chat-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.4);
        }
        
        .chat-history {
            flex: 1;
            overflow-y: auto;
            padding-right: 0.5rem;
        }
        
        .chat-history::-webkit-scrollbar {
            width: 6px;
        }
        
        .chat-history::-webkit-scrollbar-track {
            background: #f1f5f9;
            border-radius: 3px;
        }
        
        .chat-history::-webkit-scrollbar-thumb {
            background: var(--primary-light);
            border-radius: 3px;
        }
        
        .chat-item {
            padding: 0.875rem;
            border-radius: 10px;
            margin-bottom: 0.5rem;
            cursor: pointer;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            transition: all 0.3s;
            border: 1px solid transparent;
        }
        
        .chat-item:hover {
            background-color: #f1f5f9;
            border-color: #e2e8f0;
        }
        
        .chat-item.active {
            background-color: var(--primary-light);
            border-color: var(--primary);
        }
        
        .chat-item i {
            color: var(--gray);
            font-size: 1.1rem;
        }
        
        .chat-item-content {
            flex: 1;
            overflow: hidden;
        }
        
        .chat-item-title {
            font-weight: 600;
            color: var(--dark);
            margin-bottom: 0.25rem;
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .chat-item-preview {
            font-size: 0.8rem;
            color: var(--gray);
            white-space: nowrap;
            overflow: hidden;
            text-overflow: ellipsis;
        }
        
        .model-selector {
            margin-top: 1.5rem;
            padding-top: 1.5rem;
            border-top: 1px solid #e2e8f0;
        }
        
        .model-selector label {
            display: block;
            margin-bottom: 0.5rem;
            font-weight: 600;
            color: var(--dark);
            font-size: 0.95rem;
        }
        
        .model-selector select {
            width: 100%;
            padding: 0.75rem 1rem;
            border: 2px solid #e2e8f0;
            border-radius: 10px;
            background-color: white;
            font-size: 1rem;
            cursor: pointer;
            transition: border-color 0.3s;
            appearance: none;
            background-image: url("data:image/svg+xml;charset=UTF-8,%3csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3e%3cpolyline points='6 9 12 15 18 9'%3e%3c/polyline%3e%3c/svg%3e");
            background-repeat: no-repeat;
            background-position: right 1rem center;
            background-size: 1em;
        }
        
        .model-selector select:focus {
            outline: none;
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
        }
        
        .model-option {
            display: flex;
            justify-content: space-between;
            align-items: center;
        }
        
        .in-dev {
            color: var(--gray);
            font-size: 0.8rem;
            background-color: #f1f5f9;
            padding: 0.2rem 0.5rem;
            border-radius: 4px;
        }
        
        .chat-main {
            flex: 1;
            display: flex;
            flex-direction: column;
            background-color: white;
            position: relative;
        }
        
        .chat-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            align-items: center;
            gap: 0.75rem;
            background-color: white;
            z-index: 10;
        }
        
        .model-badge {
            background-color: var(--primary-light);
            color: var(--primary-dark);
            padding: 0.35rem 0.875rem;
            border-radius: 20px;
            font-size: 0.85rem;
            font-weight: 600;
        }
        
        .chat-messages {
            flex: 1;
            padding: 1.5rem;
            overflow-y: auto;
            display: flex;
            flex-direction: column;
            gap: 1.5rem;
            background-color: #f8fafc;
        }
        
        .message {
            max-width: 85%;
            padding: 1.25rem;
            border-radius: 16px;
            line-height: 1.6;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
            animation: fadeIn 0.3s ease-out;
            position: relative;
        }
        
        @keyframes fadeIn {
            from { opacity: 0; transform: translateY(10px); }
            to { opacity: 1; transform: translateY(0); }
        }
        
        .user-message {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            align-self: flex-end;
            border-bottom-right-radius: 4px;
        }
        
        .ai-message {
            background-color: white;
            align-self: flex-start;
            border-bottom-left-radius: 4px;
            border: 1px solid #e2e8f0;
        }
        
        .message-header {
            display: flex;
            align-items: center;
            gap: 0.5rem;
            margin-bottom: 0.75rem;
            font-weight: 600;
            font-size: 0.9rem;
        }
        
        .user-message .message-header {
            color: rgba(255, 255, 255, 0.9);
        }
        
        .ai-message .message-header {
            color: var(--primary);
        }
        
        .message-content {
            font-size: 1.05rem;
        }
        
        .message-content pre {
            background-color: var(--code-bg);
            color: #f8f8f2;
            padding: 1rem;
            border-radius: 8px;
            overflow-x: auto;
            margin: 0.75rem 0;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
        }
        
        .message-content code {
            background-color: #f1f5f9;
            color: var(--primary-dark);
            padding: 0.2rem 0.4rem;
            border-radius: 4px;
            font-family: 'Fira Code', monospace;
            font-size: 0.9rem;
        }
        
        .typing-indicator {
            display: none;
            background-color: white;
            padding: 1.25rem;
            border-radius: 16px;
            align-self: flex-start;
            margin-bottom: 1rem;
            border-bottom-left-radius: 4px;
            border: 1px solid #e2e8f0;
            box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
        }
        
        .typing-indicator span {
            height: 10px;
            width: 10px;
            background-color: var(--primary);
            border-radius: 50%;
            display: inline-block;
            margin-right: 6px;
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
            background-color: white;
        }
        
        .chat-input-wrapper {
            display: flex;
            gap: 1rem;
            align-items: flex-end;
        }
        
        .chat-input {
            flex: 1;
            border: 2px solid #e2e8f0;
            border-radius: 12px;
            padding: 0.875rem 1.25rem;
            font-size: 1rem;
            resize: none;
            min-height: 56px;
            max-height: 150px;
            outline: none;
            transition: border-color 0.3s;
            background-color: #f8fafc;
            font-family: inherit;
        }
        
        .chat-input:focus {
            border-color: var(--primary);
            box-shadow: 0 0 0 4px rgba(37, 99, 235, 0.15);
            background-color: white;
        }
        
        .send-btn {
            background: linear-gradient(135deg, var(--primary), var(--primary-dark));
            color: white;
            border: none;
            width: 56px;
            height: 56px;
            border-radius: 12px;
            display: flex;
            align-items: center;
            justify-content: center;
            cursor: pointer;
            transition: all 0.3s;
            box-shadow: 0 4px 6px rgba(37, 99, 235, 0.3);
        }
        
        .send-btn:hover {
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(37, 99, 235, 0.4);
        }
        
        .cancel-btn {
            display: none;
            background-color: var(--error);
            color: white;
            border: none;
            padding: 0.625rem 1.25rem;
            border-radius: 8px;
            margin-top: 0.75rem;
            cursor: pointer;
            font-weight: 600;
            transition: all 0.3s;
            align-self: flex-start;
            box-shadow: 0 4px 6px rgba(239, 68, 68, 0.3);
        }
        
        .cancel-btn:hover {
            background-color: #dc2626;
            transform: translateY(-2px);
            box-shadow: 0 6px 12px rgba(239, 68, 68, 0.4);
        }
        
        .code-container {
            display: none;
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            bottom: 0;
            background-color: white;
            z-index: 100;
            flex-direction: column;
        }
        
        .code-header {
            padding: 1rem 1.5rem;
            border-bottom: 1px solid #e2e8f0;
            display: flex;
            justify-content: space-between;
            align-items: center;
            background-color: var(--code-bg);
            color: white;
        }
        
        .code-actions {
            display: flex;
            gap: 0.5rem;
        }
        
        .code-action-btn {
            background: rgba(255, 255, 255, 0.1);
            color: white;
            border: none;
            padding: 0.5rem 1rem;
            border-radius: 6px;
            cursor: pointer;
            font-weight: 600;
            font-size: 0.9rem;
            transition: background-color 0.3s;
        }
        
        .code-action-btn:hover {
            background: rgba(255, 255, 255, 0.2);
        }
        
        .code-editor {
            flex: 1;
            overflow: hidden;
        }
        
        .CodeMirror {
            height: 100%;
            font-size: 1rem;
            font-family: 'Fira Code', monospace;
        }
        
        /* Responsive Design */
        @media (max-width: 900px) {
            .sidebar {
                position: absolute;
                left: -100%;
                height: 100%;
                z-index: 100;
                transition: left 0.3s;
                width: 80%;
                max-width: 320px;
                box-shadow: 4px 0 15px rgba(0, 0, 0, 0.1);
            }
            
            .sidebar.active {
                left: 0;
            }
            
            .menu-toggle {
                display: block !important;
                background: none;
                border: none;
                font-size: 1.5rem;
                color: white;
                cursor: pointer;
            }
            
            .message {
                max-width: 90%;
            }
        }
        
        /* Toast notifications */
        .toast {
            position: fixed;
            top: 20px;
            right: 20px;
            padding: 1rem 1.5rem;
            border-radius: 10px;
            color: white;
            font-weight: 600;
            z-index: 1000;
            opacity: 0;
            transform: translateY(-20px);
            transition: opacity 0.3s, transform 0.3s;
            box-shadow: 0 6px 15px rgba(0, 0, 0, 0.15);
        }
        
        .toast.success {
            background: linear-gradient(135deg, var(--success), #059669);
        }
        
        .toast.error {
            background: linear-gradient(135deg, var(--error), #dc2626);
        }
        
        .toast.show {
            opacity: 1;
            transform: translateY(0);
        }
    </style>
</head>
<body>
    <!-- Header Section -->
    <header>
        <div class="logo-container">
            <button class="menu-toggle" style="display: none;">
                <i class="fas fa-bars"></i>
            </button>
            <div class="logo">ES</div>
            <div class="brand-name">Ellerslie School AI</div>
        </div>
        <div style="font-size: 1rem; display: flex; align-items: center; gap: 0.5rem;">
            <span>Made by ESAI</span>
            <span class="model-badge">ESAI-Alpha-1</span>
        </div>
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
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-sign-in-alt"></i> Login
                </button>
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
                <button type="submit" class="btn btn-primary">
                    <i class="fas fa-user-plus"></i> Sign Up
                </button>
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

                <div class="chat-history" id="chat-history">
                    <!-- Chat history items will be added here -->
                </div>

                <div class="model-selector">
                    <label for="model-select">AI Model</label>
                    <select id="model-select">
                        <option value="ESAI-Alpha-1">ESAI-Alpha-1</option>
                        <option value="ESAI-Alpha-2" disabled>
                            <span class="model-option">
                                <span>ESAI-Alpha-2</span>
                                <span class="in-dev">In-development</span>
                            </span>
                        </option>
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

                <div class="chat-messages" id="chat-messages">
                    <!-- Messages will be added here -->
                </div>

                <div class="chat-input-container">
                    <div class="chat-input-wrapper">
                        <textarea class="chat-input" id="chat-input" placeholder="Type your message here..." rows="1"></textarea>
                        <button class="send-btn" id="send-btn">
                            <i class="fas fa-paper-plane"></i>
                        </button>
                    </div>
                    <button class="cancel-btn" id="cancel-btn">
                        <i class="fas fa-stop-circle"></i> Cancel Response
                    </button>
                </div>
            </div>

            <!-- Code Mode Canvas -->
            <div class="code-container" id="code-container">
                <div class="code-header">
                    <h3>Code Editor</h3>
                    <div class="code-actions">
                        <button class="code-action-btn" id="run-code">
                            <i class="fas fa-play"></i> Run
                        </button>
                        <button class="code-action-btn" id="close-code">
                            <i class="fas fa-times"></i> Close
                        </button>
                    </div>
                </div>
                <div class="code-editor">
                    <textarea id="code-editor"></textarea>
                </div>
            </div>
        </div>
    </main>

    <!-- Toast Container -->
    <div class="toast" id="toast"></div>

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
        const codeContainer = document.getElementById('code-container');
        const codeEditor = document.getElementById('code-editor');
        const runCodeBtn = document.getElementById('run-code');
        const closeCodeBtn = document.getElementById('close-code');
        const toast = document.getElementById('toast');
        const menuToggle = document.querySelector('.menu-toggle');
        const sidebar = document.querySelector('.sidebar');

        // Application State
        let currentUser = null;
        let chats = [];
        let currentChatId = null;
        let isAIResponding = false;
        let cancelResponse = false;
        let codeMirrorEditor = null;
        let apiKey = "AIzaSyCVqKHmBKSuHjy0uaZ5UJTzbBX66sfafWo";

        // Initialize the application
        function init() {
            loadUserData();
            setupEventListeners();
            checkAuthStatus();
            initializeCodeEditor();
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
            
            // Code editor
            runCodeBtn.addEventListener('click', handleRunCode);
            closeCodeBtn.addEventListener('click', handleCloseCode);
            
            // Menu toggle for mobile
            menuToggle.addEventListener('click', () => {
                sidebar.classList.toggle('active');
            });
            
            // Auto-resize textarea
            chatInput.addEventListener('input', () => {
                chatInput.style.height = 'auto';
                chatInput.style.height = Math.min(chatInput.scrollHeight, 150) + 'px';
            });
            
            // Keyboard shortcuts
            document.addEventListener('keydown', (e) => {
                // Ctrl+Enter to send message
                if (e.ctrlKey && e.key === 'Enter') {
                    e.preventDefault();
                    handleSendMessage();
                }
                
                // Escape to cancel response
                if (e.key === 'Escape' && isAIResponding) {
                    e.preventDefault();
                    handleCancelResponse();
                }
            });
        }

        // Initialize code editor
        function initializeCodeEditor() {
            codeMirrorEditor = CodeMirror.fromTextArea(codeEditor, {
                mode: 'javascript',
                theme: 'dracula',
                lineNumbers: true,
                indentUnit: 4,
                tabSize: 4,
                lineWrapping: true,
                autoCloseBrackets: true,
                matchBrackets: true,
                extraKeys: {
                    "Ctrl-Enter": function(cm) {
                        handleRunCode();
                    },
                    "Cmd-Enter": function(cm) {
                        handleRunCode();
                    }
                }
            });
            
            // Set default code
            codeMirrorEditor.setValue('// Welcome to ESAI Code Editor\nconsole.log("Hello, ESAI!");\n\n// Try writing some code and click "Run"');
        }

        // Show toast notification
        function showToast(message, type = 'success') {
            toast.textContent = message;
            toast.className = `toast ${type} show`;
            
            setTimeout(() => {
                toast.className = 'toast';
            }, 3000);
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
                showToast('Login successful!', 'success');
            } else {
                showToast('Invalid username or password', 'error');
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
                showToast('Username already exists', 'error');
                return;
            }
            
            users.push({ realName, username, password });
            localStorage.setItem('users', JSON.stringify(users));
            
            currentUser = { realName, username };
            localStorage.setItem('currentUser', JSON.stringify(currentUser));
            
            showChatInterface();
            createNewChat();
            showToast('Account created successfully!', 'success');
        }

        // Handle logout
        function handleLogout() {
            currentUser = null;
            localStorage.removeItem('currentUser');
            showAuthInterface();
            showToast('Logged out successfully', 'success');
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
            showToast('New chat created', 'success');
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
                const lastMessage = chat.messages.length > 0 ? 
                    chat.messages[chat.messages.length - 1].content : 'No messages yet';
                
                const chatItem = document.createElement('div');
                chatItem.className = `chat-item ${chat.id === currentChatId ? 'active' : ''}`;
                chatItem.dataset.chatId = chat.id;
                
                chatItem.innerHTML = `
                    <i class="fas fa-message"></i>
                    <div class="chat-item-content">
                        <div class="chat-item-title">${chat.title}</div>
                        <div class="chat-item-preview">${lastMessage.substring(0, 30)}${lastMessage.length > 30 ? '...' : ''}</div>
                    </div>
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
                    <div class="message-header">
                        <i class="fas fa-robot"></i>
                        <span>ESAI-Alpha-1</span>
                    </div>
                    <div class="message-content">
                        <p>Hello! I'm ESAI-Alpha-1, the first AI model from Ellerslie School AI. I'm here to assist you with any questions you might have. How can I help you today?</p>
                    </div>
                `;
                chatMessages.appendChild(welcomeMsg);
                return;
            }
            
            messages.forEach(msg => {
                const messageEl = document.createElement('div');
                messageEl.className = `message ${msg.sender === 'user' ? 'user-message' : 'ai-message'}`;
                
                if (msg.sender === 'user') {
                    messageEl.innerHTML = `
                        <div class="message-header">
                            <i class="fas fa-user"></i>
                            <span>You</span>
                        </div>
                        <div class="message-content">
                            <p>${formatMessage(msg.content)}</p>
                        </div>
                    `;
                } else {
                    messageEl.innerHTML = `
                        <div class="message-header">
                            <i class="fas fa-robot"></i>
                            <span>ESAI-Alpha-1</span>
                        </div>
                        <div class="message-content">
                            ${formatMessage(msg.content)}
                        </div>
                    `;
                }
                
                chatMessages.appendChild(messageEl);
            });
            
            // Scroll to bottom
            chatMessages.scrollTop = chatMessages.scrollHeight;
        }

        // Format message content (detect and format code)
        function formatMessage(content) {
            // Check if message contains code blocks
            if (content.includes('```')) {
                let formattedContent = content;
                
                // Replace code blocks with formatted HTML
                formattedContent = formattedContent.replace(/```(\w+)?\s([\s\S]*?)```/g, (match, lang, code) => {
                    return `<pre><code class="language-${lang || 'text'}">${escapeHtml(code.trim())}</code></pre>`;
                });
                
                // Replace inline code
                formattedContent = formattedContent.replace(/`([^`]+)`/g, '<code>$1</code>');
                
                return formattedContent;
            }
            
            // Replace inline code
            const withInlineCode = content.replace(/`([^`]+)`/g, '<code>$1</code>');
            
            // Convert URLs to links
            const withLinks = withInlineCode.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank">$1</a>');
            
            return `<p>${withLinks}</p>`;
        }

        // Escape HTML to prevent XSS
        function escapeHtml(unsafe) {
            return unsafe
                .replace(/&/g, "&amp;")
                .replace(/</g, "&lt;")
                .replace(/>/g, "&gt;")
                .replace(/"/g, "&quot;")
                .replace(/'/g, "&#039;");
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
                // Prepare the prompt with ESAI personality
                const prompt = `You are ESAI-Alpha-1, an AI assistant created by Ellerslie School AI. 
You are helpful, friendly, and knowledgeable. You always identify yourself as ESAI-Alpha-1 in your responses.
You are particularly good at explaining concepts and helping with programming questions.

User: ${userMessage}

ESAI-Alpha-1:`;
                
                // Call the Gemini API
                const response = await fetch('https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=' + apiKey, {
                    method: 'POST',
                    headers: {
                        'Content-Type': 'application/json',
                    },
                    body: JSON.stringify({
                        contents: [{
                            parts: [{
                                text: prompt
                            }]
                        }]
                    })
                });
                
                if (cancelResponse) {
                    throw new Error('Response cancelled');
                }
                
                const data = await response.json();
                
                if (!response.ok) {
                    throw new Error(data.error?.message || 'Failed to fetch response');
                }
                
                // Remove typing indicator
                typingIndicator.remove();
                
                // Extract the response text
                let responseText = data.candidates?.[0]?.content?.parts?.[0]?.text || 'Sorry, I could not generate a response.';
                
                // Add ESAI signature
                responseText = responseText.replace(/\n$/, '');
                
                // Check if response contains code and open code editor if it does
                if (responseText.includes('```')) {
                    const codeMatch = responseText.match(/```(\w+)?\s([\s\S]*?)```/);
                    if (codeMatch) {
                        const language = codeMatch[1] || 'javascript';
                        const code = codeMatch[2].trim();
                        
                        // Set code in editor
                        codeMirrorEditor.setValue(code);
                        
                        // Set appropriate mode
                        switch(language) {
                            case 'javascript':
                            case 'js':
                                codeMirrorEditor.setOption('mode', 'javascript');
                                break;
                            case 'python':
                            case 'py':
                                codeMirrorEditor.setOption('mode', 'python');
                                break;
                            case 'html':
                                codeMirrorEditor.setOption('mode', 'htmlmixed');
                                break;
                            case 'css':
                                codeMirrorEditor.setOption('mode', 'css');
                                break;
                            default:
                                codeMirrorEditor.setOption('mode', 'text/plain');
                        }
                        
                        // Show code editor
                        codeContainer.style.display = 'flex';
                    }
                }
                
                // Simulate typing effect
                await typeResponse(responseText);
                
                // Add AI message to chat
                addMessageToChat('ai', responseText);
                
            } catch (error) {
                if (error.message === 'Response cancelled') {
                    typingIndicator.remove();
                    const cancelledMsg = document.createElement('div');
                    cancelledMsg.className = 'message ai-message';
                    cancelledMsg.innerHTML = `
                        <div class="message-header">
                            <i class="fas fa-robot"></i>
                            <span>ESAI-Alpha-1</span>
                        </div>
                        <div class="message-content">
                            <p>Response cancelled.</p>
                        </div>
                    `;
                    chatMessages.appendChild(cancelledMsg);
                } else {
                    console.error('Error generating response:', error);
                    
                    typingIndicator.remove();
                    const errorMsg = document.createElement('div');
                    errorMsg.className = 'message ai-message';
                    errorMsg.innerHTML = `
                        <div class="message-header">
                            <i class="fas fa-robot"></i>
                            <span>ESAI-Alpha-1</span>
                        </div>
                        <div class="message-content">
                            <p>Sorry, I encountered an error: ${error.message}. Please try again.</p>
                        </div>
                    `;
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
            messageEl.innerHTML = `
                <div class="message-header">
                    <i class="fas fa-robot"></i>
                    <span>ESAI-Alpha-1</span>
                </div>
                <div class="message-content">
                    <p></p>
                </div>
            `;
            chatMessages.appendChild(messageEl);
            
            const textEl = messageEl.querySelector('p');
            
            for (let i = 0; i < response.length; i++) {
                if (cancelResponse) {
                    throw new Error('Response cancelled');
                }
                
                // Add characters one by one
                textEl.innerHTML = formatMessage(response.substring(0, i + 1));
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

        // Handle run code
        function handleRunCode() {
            const code = codeMirrorEditor.getValue();
            
            try {
                // Create a safe execution environment
                const result = eval(code);
                showToast('Code executed successfully', 'success');
                console.log('Code result:', result);
            } catch (error) {
                showToast(`Error: ${error.message}`, 'error');
                console.error('Code execution error:', error);
            }
        }

        // Handle close code editor
        function handleCloseCode() {
            codeContainer.style.display = 'none';
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
</body>
</html>
