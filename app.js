const express = require("express");

// Server setup
const app = express();
const PORT = 3000;

app.use(express.json());

// Topic keywords and response options
const knowledgeBase = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    registration: ["register", "registration", "webreg", "enroll", "spn", "special permission number"],
    transferCredits: ["transfer credit", "transferred credit", "transfer my credit", "transfer course", "credit evaluation", "transfer from", "transfer to rutgers"],
    graduationApplication: ["apply for graduation", "graduation application", "apply to graduate", "graduation form", "graduation deadline"],
    graduationCredits: ["how many credits", "credits to graduate", "120 credits", "credit requirement", "minimum credits", "credits needed to graduate"],
    financialAid: ["financial aid", "fafsa", "scholarship", "tuition assistance", "financial aid status", "myrun"],
    advising: ["academic advisor", "academic advising", "advising appointment", "schedule an appointment", "meet with advisor", "walk-in advising"],
    degreeRequirements: ["degree requirements", "degree navigator", "degree progress", "core curriculum", "remaining courses"],
    tutoring: ["tutoring", "tutor", "learning center", "academic support", "penji", "math tutoring"],
    majorMinor: ["declare major", "declare minor", "change major", "change minor", "major declaration", "minor declaration"],
    addDrop: ["add drop", "add/drop", "drop a class", "drop a course", "add a class", "add a course", "drop deadline"],
    withdrawal: ["withdraw", "withdrawal", "refund", "tuition refund", "w grade", "withdrawal deadline"],
    failingGrades: ["failing grade", "fail a class", "failed course", "grade f", "received an f", "repeat a course"],
    passingGrades: ["passing grade", "pass a class", "minimum grade", "grade d", "grade c", "c or higher", "prerequisite grade"],
    positive: ["good", "great", "awesome", "excellent", "thank you", "thanks"],
    negative: ["hard", "difficult", "confusing", "error", "problem", "not working"],
    goodbye: ["bye", "goodbye", "see you", "later"]
};

const responses = {
    greeting: [
        "Hello! Welcome to SASN Rutgers-Newark Advisor Lite. I can help answer frequently asked questions about registration, transfer credits, graduation, financial aid, academic advising, degree requirements, and tutoring.",
        "Hi! I am your SASN Academic Advising Assistant. Ask me about course registration, graduation requirements, academic deadlines, or other academic resources.",
        "Welcome to SASN Rutgers-Newark Advisor Lite! How can I help you today? Try asking: How do I register for classes? How many credits do I need to graduate? or Where can I find tutoring?"
    ],
    registration: [
        "Rutgers students can register for classes through WebReg at https://webreg.rutgers.edu. If you need a Special Permission Number (SPN), contact the department offering the course. For Mathematics or Computer Science courses, visit https://sasn.rutgers.edu/special-permission-numbers.",
        "To register for courses, use Rutgers WebReg: https://webreg.rutgers.edu. If a course requires an SPN, contact the appropriate academic department. Mathematics and Computer Science SPN requests can be submitted at https://sasn.rutgers.edu/special-permission-numbers.",
        "You can enroll in classes using WebReg at https://webreg.rutgers.edu. For courses requiring special permission, contact the department. If the course is offered by Mathematics or Computer Science, use the SPN request form at https://sasn.rutgers.edu/special-permission-numbers."
    ],
    transferCredits: [
        "You can check your transfer credits through Rutgers Degree Navigator at https://dn.rutgers.edu/. If any credits are missing or have not been evaluated, contact the appropriate Rutgers academic office.",
        "To review how your transfer credits apply toward your degree, log in to Degree Navigator: https://dn.rutgers.edu/. Contact the appropriate academic office if you have questions about missing credits or evaluations.",
        "Rutgers Degree Navigator allows students to review their transfer credits and degree progress. Visit https://dn.rutgers.edu/. For missing or incorrectly evaluated credits, contact the appropriate Rutgers office."
    ],
    graduationApplication: [
        "SASN students can find graduation application instructions and deadlines through the Office of Academic Services at https://sasn.rutgers.edu/office-academic-services-graduation.",
        "To learn how to apply for graduation, visit the SASN Office of Academic Services graduation page: https://sasn.rutgers.edu/office-academic-services-graduation.",
        "Graduation application information, deadlines, and degree completion resources are available through SASN Academic Services at https://sasn.rutgers.edu/office-academic-services-graduation."
    ],
    graduationCredits: [
        "SASN students must complete at least 120 degree credits to graduate. Students must also satisfy the Core Curriculum, major requirements, and other applicable degree requirements. Some programs may require additional credits.",
        "The minimum graduation requirement for SASN students is 120 degree credits. However, completing 120 credits alone does not guarantee graduation. Students must also fulfill all required courses and academic requirements.",
        "To graduate from SASN, students generally need a minimum of 120 degree credits along with completion of their Core Curriculum and major requirements. Check Degree Navigator at https://dn.rutgers.edu/ to review your progress."
    ],
    financialAid: [
        "Students can review their financial aid information through myRutgers at https://my.rutgers.edu/. For additional assistance, contact myRUN One Stop at https://myrun.newark.rutgers.edu.",
        "To check your financial aid status, log in to the myRutgers portal: https://my.rutgers.edu/. For questions about scholarships, tuition, or financial aid, visit myRUN One Stop at https://myrun.newark.rutgers.edu.",
        "Financial aid information is available through myRutgers at https://my.rutgers.edu/. Students who need further assistance can contact myRUN One Stop through https://myrun.newark.rutgers.edu."
    ],
    advising: [
        "Students can find academic advising appointment information through the SASN Office of Academic Services at https://sasn.rutgers.edu/office-academic-services. Monday walk-in advising is available from 9:00 AM to 4:00 PM, with the last check-in at 3:30 PM. Tuesday through Friday offers front desk advising services only.",
        "To schedule an academic advising appointment, visit https://sasn.rutgers.edu/office-academic-services. Walk-in advising is available on Mondays from 9:00 AM to 4:00 PM, with the last check-in at 3:30 PM. Front desk advising services are available Tuesday through Friday.",
        "The SASN Office of Academic Services provides academic advising information at https://sasn.rutgers.edu/office-academic-services. Students may attend Monday walk-in advising between 9:00 AM and 4:00 PM, with the last check-in at 3:30 PM. Tuesday through Friday is reserved for front desk advising services."
    ],
    degreeRequirements: [
        "Students can review their degree requirements and academic progress through Rutgers Degree Navigator at https://dn.rutgers.edu/. The system displays major requirements and remaining courses needed for graduation.",
        "To check your degree progress, visit Degree Navigator at https://dn.rutgers.edu/. You can review your Core Curriculum, major requirements, and remaining degree requirements.",
        "Rutgers Degree Navigator helps students track their academic progress and identify outstanding degree requirements. Access it at https://dn.rutgers.edu/."
    ],
    tutoring: [
        "Rutgers-Newark offers tutoring through the Learning Center, located at Hahne & Co., Room 245, 54 Halsey Street, Newark, NJ. Visit https://sasn.rutgers.edu/learning-center-tutoring to schedule tutoring. Advanced mathematics tutoring may also be available through the Mathematics Department using Penji.",
        "Students can receive academic support through the Rutgers-Newark Learning Center at Hahne & Co., Room 245, 54 Halsey Street. Tutoring information and appointments are available at https://sasn.rutgers.edu/learning-center-tutoring. For advanced mathematics courses, check the Mathematics Department's tutoring services through Penji.",
        "The Rutgers-Newark Learning Center provides tutoring services and is located near the Writing Center at Hahne & Co., Room 245. Visit https://sasn.rutgers.edu/learning-center-tutoring for appointments. Students seeking advanced mathematics assistance can also check Penji for departmental tutoring."
    ],
    majorMinor: [
        "SASN students can explore available majors and minors and review declaration information at https://sasn.rutgers.edu/academics/undergraduate-majors-minors. Students from other Rutgers schools should consult their school's specific requirements.",
        "To declare or change your major or minor, review the available SASN programs and their requirements at https://sasn.rutgers.edu/academics/undergraduate-majors-minors. Declaration procedures may vary by department.",
        "Information about SASN majors, minors, and academic departments is available at https://sasn.rutgers.edu/academics/undergraduate-majors-minors. If you belong to another Rutgers school, check that school's website for declaration procedures."
    ],
    addDrop: [
        "For Fall 2026, the last day to add a course or drop a course without receiving a W grade was September 10, 2026. Students should consult the Rutgers-Newark Academic Calendar for additional deadlines.",
        "The Fall 2026 add/drop deadline was September 10, 2026. After this date, dropping a course may result in a W grade. Check the official academic calendar for additional information.",
        "September 10, 2026 was the final day to add or drop a course without a W grade for Fall 2026. Students should review the Rutgers-Newark Academic Calendar before making schedule changes."
    ],
    withdrawal: [
        "For Fall 2026, the complete semester withdrawal refund deadlines are: September 14 for 100%, September 28 for 80%, October 12 for 60%, and October 26 for 40%. The last day to withdraw from an individual course with a W grade is October 26, 2026. Refund rules for individual courses may differ.",
        "Students withdrawing from all Fall 2026 courses may qualify for tuition refunds based on the withdrawal date: 100% by September 14, 80% by September 28, 60% by October 12, and 40% by October 26. October 26 is also the last day to withdraw from an individual course with a W grade. Contact the appropriate Rutgers office to confirm refund eligibility.",
        "Fall 2026 withdrawal refund deadlines are September 14 (100%), September 28 (80%), October 12 (60%), and October 26 (40%) for complete semester withdrawals. Students may withdraw from an individual course with a W grade through October 26. Tuition refunds for individual course withdrawals may follow different rules."
    ],
    failingGrades: [
        "An F is a failing grade at Rutgers and does not earn degree credit. It can negatively affect your GPA. Contact an academic advisor to discuss repeating the course and how the grade affects your academic progress.",
        "Receiving an F means you did not earn credit for the course. The failing grade can lower your GPA and affect your degree progress. Students should consult an academic advisor about available options.",
        "If you fail a course with an F, you will not receive degree credit for it. The grade may affect your GPA and graduation progress. Speak with an academic advisor about repeating the course or fulfilling the requirement."
    ],
    passingGrades: [
        "At Rutgers-Newark, a D may earn undergraduate course credit. However, SASN students must earn a C or higher in courses required for their major, second concentration, Basic Writing, Quantitative Reasoning, and Writing Intensive requirements. Some prerequisites also require a C or higher.",
        "A D can count as earned undergraduate credit at Rutgers, but it does not satisfy certain SASN requirements. Major courses, second concentration courses, Basic Writing, Quantitative Reasoning, and Writing Intensive requirements generally require a minimum grade of C. Check https://sasn.rutgers.edu/office-academic-services-graduation for more information.",
        "For SASN students, a C or higher is required for major courses, second concentration courses, Basic Writing, Quantitative Reasoning, and Writing Intensive requirements. Although a D may earn course credit, it may not satisfy these requirements or certain prerequisites. Visit https://sasn.rutgers.edu/office-academic-services-graduation."
    ],
    positive: [
        "You're welcome! Feel free to ask another academic advising question.",
        "Glad I could help! Is there another Rutgers-Newark academic question I can answer?",
        "Happy to help! You can ask me about registration, graduation, tutoring, or other SASN academic resources."
    ],
    negative: [
        "I'm sorry you're having trouble. Could you provide more details about your academic question?",
        "I understand that academic procedures can be confusing. Try asking a more specific question, or contact the SASN Office of Academic Services at https://sasn.rutgers.edu/office-academic-services.",
        "If you're experiencing an academic issue that requires individual assistance, please contact the SASN Office of Academic Services at https://sasn.rutgers.edu/office-academic-services."
    ],
    goodbye: [
        "Goodbye! Best of luck with your semester at Rutgers-Newark!",
        "See you next time! Remember that SASN Academic Services is available if you need additional assistance.",
        "Take care! Thank you for using SASN Rutgers-Newark Advisor Lite."
    ],
    default: [
        "I'm sorry, but I don't have information about that question. Please contact the SASN Office of Academic Services for further assistance: https://sasn.rutgers.edu/office-academic-services.",
        "I couldn't find an answer to your question in my current knowledge base. For additional assistance, please visit the SASN Office of Academic Services at https://sasn.rutgers.edu/office-academic-services.",
        "That question is outside my current academic advising knowledge base. Please contact SASN Academic Services for further guidance: https://sasn.rutgers.edu/office-academic-services."
    ]
};

// Reply generation
function getRandomResponse(items) {
    return items[Math.floor(Math.random() * items.length)];
}

function detectCategory(message) {
    const text = " " + message.toLowerCase() + " ";
    // Store the best matching category and its score
    let bestCategory = "default";
    let highestScore = 0;

    for (const category in knowledgeBase) {
        let score = 0; // Reset the score for each category

        for (const keyword of knowledgeBase[category]) {
            if (text.includes(keyword)) {
                score += keyword.length; // Add points based on keyword length
            }
        }
        if (score > highestScore) {
            highestScore = score; // Save the new highest score
            bestCategory = category; // Save the matching category
        }
    }
    return bestCategory;
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

// Routes
app.get("/", (req, res) => {
    res.send(`
    <!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <title>SASN Rutgers-Newark Advisor Lite</title>
            <style>
                * {
                    box-sizing: border-box;
                }

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

                button, input {
                    font: inherit;
                }

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
                    border: 1px solid rgba(125, 211, 252, 0.2);
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
                    border-radius: 50%;
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
                    .hero {
                        align-items: flex-start;
                        flex-direction: column;
                    }
                }

                @media (max-width: 900px) {
                    body {
                        padding: 24px 16px;
                    }
                    .workspace {
                        grid-template-columns: 1fr;
                    }
                    .status-row {
                        flex-wrap: wrap;
                    }
                    .composer {
                        grid-template-columns: 1fr 1fr;
                    }
                    .composer input {
                        grid-column: 1 / -1;
                    }
                    .chat-box {
                        height: 420px;
                        flex: none;
                    }
                    .message {
                        max-width: 95%;
                    }
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
            const messageInput = document.getElementById("messageInput");
            const sendBtn = document.getElementById("sendBtn");
            const clearBtn = document.getElementById("clearBtn");
            const questionButtons = document.querySelectorAll(".question-btn");

            function appendMessage(sender, text, cssClass, category) {
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

            // Event listeners
            sendBtn.addEventListener("click", sendMessage);
            clearBtn.addEventListener("click", clearChat);
            messageInput.addEventListener("keydown", (event) => {
                if (event.key === "Enter") sendMessage();
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
    const userMessage =
        typeof req.body?.message === "string"
            ? req.body.message.trim()
            : "";

    if (!userMessage) {
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

// Server startup
app.listen(PORT, () => {
    console.log(`SASN Rutgers-Newark Advisor Lite running at http://localhost:${PORT}`);
});
