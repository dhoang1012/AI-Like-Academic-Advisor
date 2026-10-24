const express = require("express");

// Server setup
const app = express();
const PORT = 3000;

app.use(express.json());

// Topic keywords and response options
const knowledgeBase = {
    greeting: ["hello", "hi", "hey", "good morning", "good afternoon", "good evening"],
    registration: ["register", "registration", "webreg", "enroll", "enrollment", "spn", "special permission number", "sign up for class", "register for class", "register for courses", "course registration", "can't register", "cannot register"],
    transferCredits: ["transfer credit", "transferred credit", "transfer", "transferred", "transfer my credit", "transfer course", "credit evaluation", "transfer from", "transferred to", "transfer credits", "transfer my credits", "credits from another college", "transfer student", "accepted transfer credits"],
    graduationApplication: ["apply for graduation", "graduation application", "apply to graduate", "graduation form", "graduation deadline", "cap and gown", "graduate application", "graduation process", "submit graduation application", "where to apply for graduation"],
    graduationCredits: ["how many credits", "credits to graduate", "120 credits", "credit requirement", "minimum credits", "credits needed to graduate", "credits required to graduate", "enough credits to graduate", "how many credits do i need", "graduation credits"],
    financialAid: ["financial aid", "fafsa", "scholarship", "tuition assistance", "financial aid status", "myrun", "educational opportunity fund", "pell grant", "review my offers", "financial assistance", "financial aid package", "financial aid application", "financial aid award", "check my aid", "student aid"],
    advising: ["academic advisor", "academic advising", "advising appointment", "advisor appointment", "schedule an advising appointment", "schedule a meeting with an advisor", "an advisor", "meet with advisor", "walk-in advising", "meet my advisor", "speak to an advisor", "talk to an advisor", "book an advisor", "advising hours", "advising office", "walk-in hours"],
    degreeRequirements: ["degree requirements", "degree requirement", "degree navigator", "degree progress", "core curriculum", "remaining courses", "degree audit", "graduation requirements", "required courses", "courses for my degree", "degree completion", "check my requirements", "degree plan"],
    tutoring: ["tutoring", "tutor", "learning center", "academic support", "penji", "math tutoring", "find a tutor", "get a tutor", "tutoring appointment", "schedule a tutor", "book a tutor", "tutoring services", "help with homework", "math help", "writing center"],
    majorMinor: ["declare major", "declare minor", "change major", "change minor", "major declaration", "minor declaration", "declare my major", "declare my minor", "switch my major", "switch majors", "add a minor", "add a major", "choose a major", "major or minor", "major", "minor"],
    addDrop: ["add drop", "add/drop", "drop a class", "drop a course", "add a class", "add a course", "drop deadline", "add deadline", "add/drop period", "drop without a w", "remove a class", "change my schedule", "last day to drop", "last day to add"],
    withdrawal: ["withdraw", "withdrawal", "refund", "withdraw from", "tuition refund", "w grade", "withdrawal deadline", "withdraw from a class", "withdraw from a course", "withdraw from school", "withdraw from all classes", "withdrawal date", "refund deadline", "tuition reimbursement", "get a w", "drop with a w"],
    failingGrades: ["failing grade", "failing", "fail a class", "fail a course", "failed a class", "failed a course", "failed course", "failed", "grade f", "received an f", "got an f", "repeat a course", "retake a course", "retake a class", "failed my class", "failed my course", "what if i fail", "what happens if i fail", "failing a course", "failing a class"],
    passingGrades: ["passing grade", "passing", "pass a class", "pass a course", "minimum grade", "grade d", "grade c", "c or higher", "prerequisite grade", "is a d passing", "is a d considered passing", "does a d count", "is a c passing", "what grade do i need", "minimum passing grade"],
    positive: ["good", "great", "awesome", "excellent", "thank you", "thanks", "thank you so much"],
    negative: ["hard", "difficult", "confusing", "error", "problem", "not working"],
    goodbye: ["bye", "goodbye", "see you", "later", "see you later"]
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

// Serve the existing Rutgers-Newark frontend from public/
app.use(express.static(require("path").join(__dirname, "public")));

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
