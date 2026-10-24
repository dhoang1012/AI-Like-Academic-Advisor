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

// Chat controls
const form = document.getElementById("chatForm");
const input = document.getElementById("messageInput");
const chatBox = document.getElementById("chatBox");
const sendBtn = document.getElementById("sendBtn");
const status = document.getElementById("status");

// Add a message bubble and scroll to the newest message.
function addMessage(text, who, category) {
    const el = document.createElement("div");
    el.className = "bubble " + who;
    el.innerHTML = text.replace(/(https?:\/\/[^\s]+)/g, '<a href="$1" target="_blank" rel="noopener noreferrer">$1</a>');

    if (category && category !== "default") {
        const tag = document.createElement("small");
        tag.className = "tag";
        tag.textContent = "Topic: " + category.replace(/([A-Z])/g, " $1").toLowerCase();
        el.appendChild(tag);
    }

    chatBox.appendChild(el);
    chatBox.scrollTop = chatBox.scrollHeight;
    return el;
}

// Suggested questions fill the input so the user can review and send them.
questions.forEach(question => {
    const btn = document.createElement("button");
    btn.type = "button";
    btn.className = "question";
    btn.textContent = question;

    btn.addEventListener("click", () => {
        input.value = question;
        input.focus();
    });

    document.getElementById("questions").appendChild(btn);
});

// Send the question to the server and display its reply.
form.addEventListener("submit", async event => {
    event.preventDefault();

    const message = input.value.trim();
    if (!message || sendBtn.disabled) {
        return;
    }

    addMessage(message, "user");
    input.value = "";
    sendBtn.disabled = true;
    status.textContent = "● Responding...";

    const typing = addMessage("Looking up your question...", "assistant");

    try {
        const response = await fetch("/chat", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ message })
        });

        if (!response.ok) {
            throw new Error("HTTP " + response.status);
        }

        const data = await response.json();
        typing.remove();
        addMessage(
            typeof data.bot === "string" ? data.bot : "No answer received.",
            "assistant",
            data.category
        );
        status.textContent = "● Ready";
    } catch (err) {
        typing.remove();
        addMessage(
            "Unable to reach the advising server. Make sure the Node.js server is running.",
            "assistant"
        );
        status.textContent = "● Connection error";
    } finally {
        sendBtn.disabled = false;
        input.focus();
    }
});

// Reset the conversation.
document.getElementById("clearBtn").addEventListener("click", () => {
    chatBox.replaceChildren();
    addMessage("Chat cleared. What would you like to ask?", "assistant");
    input.focus();
});
