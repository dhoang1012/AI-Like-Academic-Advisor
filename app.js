const express = require("express");
const app = express(); // express is a function of JavaScript, which is used for creating light-weight web application
//it works with middleware and HTML layer
const PORT = 3000; // port number through where the request and the post will work
app.use(express.json())
// Lesson 2: A broader computer science knowledge base
//generating data for chat
const knowledgeBase = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    java: ["java", "jdk", "jva", "object oriented", "oop"],
    python: ["python", "pandas", "numpy", "flask", "django"],
    htmlcss: ["html", "css", "web page", "stylesheet", "frontend"],
    javascript: ["javascript", " js ", "ecmascript"],
    node: ["node.js", "nodejs", "node", "express", "backend"],
    database: ["database", "sql", "mysql", "mongodb", "table", "query"],
    api: ["api", "rest", "endpoint", "get request", "post request"],
    git: ["git", "github", "repository", "commit", "branch"],
    cloud: ["cloud", "aws", "azure", "google cloud", "serverless"],
    cybersecurity: ["cybersecurity", "security", "password", "encryption", "phishing", "malware"],
    ai: ["artificial intelligence", "machine learning", "ai", "neural network", "model"],
    computer: ["cpu", "ram", "memory", "operating system", "computer"],
    career: ["career", "job", "developer", "programmer", "software engineer"],
    positive: ["good", "great", "awesome", "excellent", "thank you", "thanks"],
    negative: ["hard", "difficult", "confusing", "error", "problem", "not working"],
    goodbye: ["bye", "goodbye", "see you", "later"]
};
const responses = {
    greeting: [
        "Hello! I am your Computer Science Study Bot. Ask me about programming, database, cloud computing, cybersecurity, AI, Git, APIs, or web development.",
        "Hi! Pick a computer science topic and I will give you a short beginner-friendly explanation.",
        "Welcome! Try asking me a question such as: What is Java? What is an API? or What does a database do?"
    ],
    java: [
        "Java is a general-purpose, object-oriented programming language. Java programs are compiled into bytecode that runs on the Java Virtual Machine or JVM.",
        "The JDK is the Java Development Kit. It includes tools that developers use to write, compile, and run Java programs.",
        "Java is commonly used for enterprise applications, Android-related development, backend systems, and many large software projects."
    ],
    python: [
        "Python is a high-level programming language known for readable syntax. It is widely used in data science, AI, automation, and web development.",
        "Python is popular with beginners because a small amount of code can perform useful tasks. Libraries such as Pandas and NumPy are common in data analysis.",
        "Python can be used for scripts, machine learning, scientific computing, APIs, and complete web applications."
    ],
    htmlcss: [
        "HTML gives a web page its structure, while CSS controls its appearance, such as colors, spacing, fonts, and layout.",
        "Frontend development is the part of a web application that users see and interact with in the browser.",
        "A simple website often combines HTML for structure, CSS for design, and JavaScript for interactive behavior."
    ],
    javascript: [
        "JavaScript adds behavior and interactivity to web pages. It can respond to clicks, update content, validate forms, and communicate with servers.",
        "JavaScript normally runs in the browser, but it can also run outside the browser using environments such as Node.js.",
        "Modern JavaScript includes array, objects, functions, promises, modules, and asyn/await."
    ],
    node: [
        "Node.js is a runtime environment that allows JavaScript to execute outside the web browser, including on a server.",
        "Express is a Node.js framework that makes it easier to create web servers and API routes.",
        "In this project, Node.js run app.js and Express receives the browser's request and sends the chatbot response back."
    ],
    database: [
        "A database stores organized information so an application can save, search, update, and retrieve data.",
        "SQL databases organize information into tables with rows and columns. Examples include MySQL and PostgreSQL.",
        "MongoDB is a document database that stores records in flexible JSON-like documents rather than traditional tables."
    ],
    api: [
        "An API is a way for software systems to communicate. A web application can send a request to an API and receive data in return.",
        "REST APIs often use HTTP methods such as GET to read data, POST to create data, PATCH or PUT to update data, and Delete to remove data.",
        "An Endpoint is a specific API address tha performs a particular operation, such as/chat in this project."
    ],
    git: [
        "Git is a version-control system. It tracks changes changes to code so developers can review history, create branches, and collaborate safely.",
        "GitHub is an online platform that hosts Git repositories and supports collaboration, code review, issues, and project management.",
        "A commit is a saved checkpoint in a Git project's history."
    ],
    cloud: [
        "Cloud computing provides computing resources such as servers, storage, and databases over the internet instead of requiring everything to run on a local computer.",
        "AWS, Microsoft Azure, and Google Cloud are major cloud platforms that provide services for hosting applications and storing data.",
        "A cloud-hosted web application can be accessed by users without requiring the application server to run on the developer's personal computer"
    ],
    cybersecurity: [
        "Cybersecurity focuses on protecting computers, networks, applications, and data from unauthorized access or attacks.",
        "Encryption changes readable data into a protected form that can only be interpreted correctly with the appropriate key or process.",
        "Phishing is a social-engineering attack that tries to trick a person into revealing sensitive information or opening a malicious link."
    ],
    ai: [
        "Artificial intelligence is a broad field focused on creating computer systems that perform tasks associated with human intelligence, such as prediction, recognition, language processing, and decision support.",
        "Machine learning is a branch of AI in which models learn patterns from data rather than relying on explicitly programmed rules.",
        "This classroom chatbot is AI-Like rather than a trained AI model; it detects keywords and selects a prepared response from its knowledge base."
    ],
    computer: [
        "The CPU executes instructions, while RAM temporarily holds data and programs that are currently being used.",
        "An operating system manages hardware resources and provides services that applications use. Windows, Linux, and macOS are examples.",
        "Computer memory and storage are different: RAM is temporary working memory, while storage such as an SSD keeps data after the computer."
    ],
    career: [
        "Software developers solve problems by designing, building, testing, and maintaining applications and systems.",
        "Useful skills for a software career include programming, debugging, Git, databases, APIs, communication, and the ability to learn new technologies.",
        "Different software roles include frontend developer, backend developer, full-stack developer, data engineer, cloud engineer, cybersecurity analyst, and machine-learning engineer."
    ],
    positive: [
        "You are welcome! Try another topic from the question cards.",
        "Great! Ask another question and compare how the bot detects a different category.",
        "Excellent. Experiment with your own wording and see whether the program recognizes the topic."
    ],
    negative: [
        "Programming errors are normal. Read the error message, identify the file and line involved, and test one small change at a time.",
        "If something is confusing, break the problem into smaller parts: input, processing, and output.",
        "Debugging is part of development. Check spelling, brackets, file names, dependencies, and whether the server is running."
    ],
    goodbye: [
        "Goodbye! Keep experimenting with different questions.",
        "See you next time. Try adding  a new chatbot category before you finish.",
        "Bye! Your next challenge is to add your own topic and three new responses."
    ],
    default: [
        "I do not have a prepared answer for that yet. Try Java, Python, HTML/CSS, JavaScript, Node.js, databases, APIs, Git, cloud computing, cybersecurity, AI, or computer hardware",
        "That topic is not in my current knowledge base. You can expand me by adding a new category, keywords, and responses in app.js.",
        "Try rephrasing the question with a computer science keywords such as Java, Python, API, Git, cloud, security, database, or AI."
    ]
};

function getRandomResponse(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function detectCategory(message) {
    const text = ` ${message.toLowerCase()} `;

    for(const category in knowledgeBase) {
        for (const keyword of knowledgeBase[category]) {
            if (text.includes(keyword)) {
                return category;
            }
        }
    }

    return "default";
}

function generateBotReply(message) {
    const category = detectCategory(message);
    return {
        category,
        answer: getRandomResponse(responses[category])
    };
}

function processMessageAsync(message) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(generateBotReply(message)), 450);
    });
}

app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />
        <title>Lesson 2 - Computer Science Study Bot</title>
        <style>
        * { box-sizing: border-box; }
        
        body {
            margin: 0;
            min-height: 100vh;
            font-family: "Segoe UI", Arial, sans-serif;
            font-size: 18px;
            color: #f8fafc;
            background:
                radial-gradient(circle at 15% 15%, rgba(56, 189, 248, 0.35), transparent 28%),
                radial-gradient(circle at 85% 20%, rgba(168, 85, 247, 0.35), transparent 30%),
                linear-gradient(135deg, #071a35 0%, #172554 45%, #3b0764 100%);
            padding: 36px 24px;
        }

            button, input { font: inherit; }
        
            .app-shell {
                max-width: 1440px;
                margin: 0 auto;
            }
            
            .hero {
                display: flex;
                justify-content: space-between;
                gap: 24px;
                align-items: center;
                margin-bottom: 24px;
            }
            
            .hero h1 {
                margin: 0 0 8px;
                font-size: clamp(34px, 4vw, 56px);
            }
            
            .hero p {
                margin: 0;
                color: #cbd5e1;
                max-width: 820px;
                line-height: 1.6;
            }
            
            .badge {
                flex-shrink: 0;
                max-width: 100%;
                background: rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.10);
                padding: 10px 14px;
                border-radius: 999px;
                color: #bae6fd;
                font-weight: 700;
            }
            
            .workspace {
                display: grid;
                grid-template-columns: 360px minmax(0, 1fr);
                gap: 26px;
            }
            
            .panel {
                background: rgba(15, 23, 42, 0.7);
                border: 1px solid rgba(255, 255, 255, 0.14);
                border-radius: 22px;
                backdrop-filter: blur(10px);
                box-shadow: 0 18px 50px rgba(0, 0, 0, 0.22);
            }
            
            .topics {
                padding: 22px;
            }
            
            .topics h2, .chat-panel h2 {
                margin: 0 0 10px;
                font-size: 24px;
            }
            
            .topics p {
                margin: 0 0 10px;
                color: #94a3b8;
                line-height: 1.5;
                font-size: 16px;
            }
            
            .question-list {
                display: grid;
                gap: 10px;
            }
            
            .question-btn {
                width: 100%;
                text-align: left;
                padding: 14px 16px;
                border: 1px solid rgba(125, 211,252, 0.2);
                border-radius: 12px;
                background: rgba(30, 41, 59, 0.86);
                color: #e2e8f0;
                cursor: pointer;
                transition: transform 0.15s ease, background 0.15s ease;
            }
            
            .question-btn:hover {
                transform: translateX(4px);
                background: rgba(51, 65, 85, 0.95);
            }
            
            .chat-panel {
                padding: 22px;
                min-width: 0;
                display: flex;
                flex-direction: column;
            }
            
            .status-row {
                display: flex;
                justify-content: space-between;
                align-items: center;
                gap: 12px;
                margin-bottom: 16px;
            }
            
            .status {
                display: inline-flex;
                align-items: center;
                gap: 8px;
                color: #bbf7f0;
                font-size: 16px;
            }
            
            .dot {
                width: 10px;
                height: 10px;
                border-radius:  50%;
                background: #22c55e;
                box-shadow: 0 0 12px #22c55e;
            }
            
            .chat-box {
                height: clamp(440px, 55vh, 680px);
                flex: 1 1 auto;
                overflow-y: auto;
                background: rgba(255, 255, 255, 0.1);
                border-radius: 16px;
                padding: 18px;
                margin-bottom: 16px;
            }
            
            .message {
                max-width: 82%;
                padding: 12px 16px;
                margin: 0 0 12px;
                border-radius: 16px;
                line-height: 1.5;
                overflow-wrap: anywhere;
            }
            
            .bot {
                background: linear-gradient(135deg, #7c3aed, #4f46e5);
                border-bottom-left-radius: 4px;
                margin-left: auto;
            }
            
            .category-tag {
                display: inline-block;
                margin-top: 8px;
                font-size: 13px;
                padding: 3px 8px;
                border-radius: 999px;
                background: rgba(255, 255, 255, 0.14);
                color: #e0f2fe;
            }
            
            .typing {
                color: #94a3b8;
                font-style: italic;
                margin: 8px 0 12px;
            }
            
            .composer {
                display: grid;
                grid-template-columns: minmax(0, 1fr) auto auto;
                gap: 10px;
            }
            
            input {
                min-width: 0;
                padding: 13px 14px;
                border-radius: 12px;
                border: 1px solid #475569;
                background: #f8fafc;
                color: #0f172e;
                font-size: 18px;
                outline: none;
            }
            
            input:focus {
                border-color: #38bdf8;
                box-shadow: 0 0 0 3px rgba(56, 189, 248, 0.2);
            }
            
            .send-btn, .clear-btn {
                border: 0;
                border-radius: 12px;
                padding: 14px 20px;
                font-weight: 700;
                cursor: pointer;
            }
            
            .send-btn {
                background: linear-gradient(135deg, #22d3ee, #3b82f6);
                color: #082f49;
            }
            
            .clear-btn {
                background: #334155;
                color: white;
            }
            
            .learning-note {
                margin-top: 14px;
                padding: 12px 14px;
                border-left: 4px solid #a78bfa;
                background: rgba(76, 29, 149, 0.18);
                color: #ddd6fe;
                border-radius: 10px;
                font-size: 15px;
                line-height: 1.5;
            }
            
            @media (max-width: 1100px) {
                .hero { align-items: flex-start; flex-direction: column; }
            }

            @media (max-width: 900px) {
                body { padding: 24px 16px; }
                .workspace { grid-template-columns: 1fr; }
                .status-row { flex-wrap: wrap; }
                .composer { grid-template-columns: 1fr 1fr; }
                .composer input { grid-column: 1 / -1; }
                .chat-box { height: 420px; flex: none; }
                .message { max-width: 95%; }
            }
        </style>
    </head>
    <body>
        <main class="app-shell">
        <section class="hero">
            <div>
                <h1>Computer Science Study Bot</h1>
                <p>Lesson 2 explores a broader chatbot. Students can ask questions from several computer science areas and watch how the backend detects the topic and selects a response.</p>
            </div>
            <div class="badge">LESSON 2 ~ EXPRESS + JAVASCRIPT</div>
        </section>
        <section class="workspace">
            <aside class="panel topics">
                <h2>Try different questions</h2>
                <p>Click any questions or type your own. These topics deliberately go beyond JavaScript and Node.js.</p>
                <div class="question-list">
                    <button class="question-btn" data-question="What is Java and what does the JVM do?"> What is Java?</button>
                    <button class="question-btn" data-question="Why is Python popular?"> Why is Python popular?</button>
                    <button class="question-btn" data-question="What is the difference between HTML and CSS?"> HTML vs CSS</button>
                    <button class="question-btn" data-question="What is a database?"> What is a database?</button>
                    <button class="question-btn" data-question="What is an API?"> What is an API?</button>
                    <button class="question-btn" data-question="What does Git do?"> What does Git do?</button>
                    <button class="question-btn" data-question="What is cloud computing?"> What is cloud computing?</button>
                    <button class="question-btn" data-question="What is cybersecurity?"> What is cybersecurity?</button>
                    <button class="question-btn" data-question="What is artificial intelligence?"> What is AI?</button>
                    <button class="question-btn" data-question="What is the difference between CPU and RAM?"> CPU vs RAM</button>
                </div>
            </aside>
                <section class="panel chat-panel">
                <div class="status-row">
                    <h2>Ask the Study Bot</h2>
                    <div class="status"><span class="dot"></span> Server Ready</div>
                </div>
                <div id="chatBox" class="chat-box">
                    <div class="message bot">
                        <strong>Bot:</strong> Hello! Ask me about Java, Python, web development, databases, APIs, Git, cloud computing, cybersecurity, AI or computer hardware.
                    </div>
                </div>
                <div class="composer"> 
                    <input id="messageInput" type="text" placeholder="Example: What is cloud computing?" autocomplete="off"/>
                    <button id="sendBtn" class="send-btn">Send</button>
                    <button id="clearBtn" class="clear-btn">Clear</button>
                </div>
                
                <div class="learning-note">
                    <strong>Student challenge:</strong> Add one new topic to <code>knowledgeBase</code>, create three possible replies in <code>responses</code>, restart the server, and test your new question.
                </div>
            </section>
        </section>
</main>
    <script>
    const chatBox = document.getElementById("chatBox");
    const messageInput= document.getElementById("messageInput");
    const sendBtn = document.getElementById("sendBtn");
    const clearBtn = document.getElementById("clearBtn");
    const questionButtons = document.querySelectorAll(".question-btn");
    function appendMessage(sender, text, cssClass,category) {
        const div = document.createElement("div");
        div.className = "message " + cssClass;
            const strong = document.createElement("strong");
        strong.textContent = sender + ": ";
        div.appendChild(strong);
        div.appendChild(document.createTextNode(text));
        if (category) {
            const tag = document.createElement("div");
            tag.className = "category-tag";
            tag.textContent = "Detected topic: " + category;
            div.appendChild(tag);
        }
        chatBox.appendChild(div);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function showTyping() {
        const typing = document.createElement("div");
        typing.id = "typingIndicator";
        typing.className = "typing";
        typing.textContent = "Study Bot is thinking...";
        chatBox.appendChild(typing);
        chatBox.scrollTop = chatBox.scrollHeight;
    }
    function removeTyping() {
        const typing = document.getElementById("typingIndicator");
        if (typing) typing.remove();
    }
    async function sendMessage() {
        const message = messageInput.value.trim();
        if (!message) return;
    appendMessage("You", message, "user");
        messageInput.value = "";
        showTyping();
        sendBtn.disabled = true;
        try {
            const response = await fetch("/chat", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ message })
            });
            const data = await response.json();
            removeTyping();
            appendMessage("Bot", data.bot, "bot", data.category);
        } catch (error) {
            removeTyping();
            appendMessage("Bot", "I could not contact the server. Check that Node.js is running and try again.", "bot", "server error");
        } finally {
            sendBtn.disabled = false; 
            messageInput.focus();
        }
    }
    function clearChat() {
        chatBox.innerHTML = "";
        appendMessage(
            "Bot",
            "Chat cleared. Choose a question from the left or type a new computer science question.",
            "bot"
        );
        messageInput.focus();
    }
    sendBtn.addEventListener("click", sendMessage);
    clearBtn.addEventListener("click", clearChat);
    messageInput.addEventListener("keydown", (event) => {
        if(event.key === "Enter") sendMessage();
    });
    questionButtons.forEach((button) => {
        button.addEventListener("click", () => {
            messageInput.value = button.dataset.question;
            messageInput.focus();
        });
    });      
</script>
</body>
</html>
`);
});

app.post("/chat", async (req, res) => {
    const userMessage = String(req.body.message || "").trim();
    
    if(!userMessage) {
        return res.status(400).json({
            bot: "Please type a question first.",
            category: "input"
        });
    }
const result = await processMessageAsync(userMessage);
res.json({
    user: userMessage,
    bot: result.answer,
    category: result.category   
    });
});

app.listen(PORT, () => {
    console.log(`Lesson 2 Study Bot running at http://localhost:${PORT}`);
});
