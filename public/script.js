// Suggested questions shown in the sidebar.
const questions = [
    "How do I register for classes?",
    "How do I check my transfer credits?",
    "How do I apply for graduation?",
    "How many credits do I need to graduate?",
    "Where can I find financial aid?",
    "How do I schedule an academic advising appointment?",
    "How do I check my degree requirements?",
    "Where can I find tutoring?",
    "How do I declare a major or minor?",
    "When is the add/drop deadline?",
    "What is the withdrawal deadline?",
    "What happens if I fail a course?"
];

// Page elements.
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
const sendButton = document.getElementById("sendBtn");
const statusIndicator = document.getElementById("status");
const questionsContainer = document.getElementById("questions");
const clearButton = document.getElementById("clearBtn");

// Message rendering.
function addMessage(text, sender, category) {
    const bubble = document.createElement("div");
    bubble.className = "bubble " + sender;
    bubble.textContent = text;

    if (sender === "assistant") {
        bubble.innerHTML = bubble.innerHTML.replace(
            /(https?:\/\/[^\s<]+)/g,
            '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>'
        );
    }

    if (category && category !== "default") {
        const tag = document.createElement("small");
        tag.className = "tag";
        tag.textContent = "Topic: " + category.replace(/([A-Z])/g, " $1").toLowerCase();
        bubble.appendChild(tag);
    }

    chatBox.appendChild(bubble);
    chatBox.scrollTop = chatBox.scrollHeight;
    return bubble;
}

function renderQuickQuestions() {
    questions.forEach((question) => {
        const button = document.createElement("button");
        button.type = "button";
        button.className = "question";
        button.textContent = question;

        button.addEventListener("click", () => {
            input.value = question;
            input.focus();
        });

        questionsContainer.appendChild(button);
    });
}

// Server communication.
async function requestReply(message) {
    const response = await fetch("/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message })
    });

    if (!response.ok) {
        throw new Error("HTTP " + response.status);
    }

    return response.json();
}

// Chat actions.
async function handleSubmit(event) {
    event.preventDefault();

    const message = input.value.trim();
    if (!message || sendButton.disabled) {
        return;
    }

    addMessage(message, "user");
    input.value = "";
    sendButton.disabled = true;
    statusIndicator.textContent = "● Responding...";
    const typingBubble = addMessage("Looking up your question...", "assistant");

    try {
        const data = await requestReply(message);
        typingBubble.remove();
        addMessage(
            typeof data.bot === "string" ? data.bot : "No answer received.",
            "assistant",
            data.category
        );
        statusIndicator.textContent = "● Ready";
    } catch (error) {
        typingBubble.remove();
        addMessage(
            "Unable to reach the advising server. Make sure the Node.js server is running.",
            "assistant"
        );
        statusIndicator.textContent = "● Connection error";
    } finally {
        sendButton.disabled = false;
        input.focus();
    }
}

function clearChat() {
    chatBox.replaceChildren();
    addMessage("Chat cleared. What would you like to ask?", "assistant");
    input.focus();
}

// Initialize the sidebar and connect page actions.
renderQuickQuestions();
form.addEventListener("submit", handleSubmit);
clearButton.addEventListener("click", clearChat);
