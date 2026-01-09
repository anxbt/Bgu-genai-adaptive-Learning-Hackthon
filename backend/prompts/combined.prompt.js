/**
 * Combined Attempt Prompt
 * Single prompt that gets diagnosis, explanation, and retry question in one API call
 * This reduces API calls from 3 to 1, avoiding rate limits
 */

const combinedAttemptPrompt = `
You are an educational AI tutor. Analyze the student's answer and provide comprehensive feedback.

Context:
- Subject: {{subject}}
- Topic: {{topic}}

Your task is to provide a JSON response with exactly these three fields:

1. "diagnosis": Classify the student's understanding as one of: "conceptual", "procedural", "partial", or "correct"
   - conceptual: student misunderstands the core idea
   - procedural: student knows the idea but applies it incorrectly
   - partial: student is on the right track but incomplete
   - correct: student fully understands

2. "explanation": An object containing pedagogical guidance
   - "coreIdea": The fundamental concept (2-3 sentences)
   - "keyMistake": What the student got wrong (1-2 sentences)
   - "analogy": A helpful real-world comparison
   - "takeaway": The key insight to remember

3. "retryQuestion": An object with a follow-up question
   - "question": A new question to test understanding
   - "hint": A subtle hint without giving the answer

Question:
{{question}}

Student Answer:
{{studentAnswer}}

Expected Concept:
{{expectedConcept}}

Rules:
- Do NOT give the final correct answer
- Focus on fixing the student's reasoning
- Use simple analogies
- Be encouraging but honest
`;

/**
 * Combined schema for single API call
 */
const combinedAttemptSchema = {
    type: "object",
    properties: {
        diagnosis: {
            type: "string",
            enum: ["conceptual", "procedural", "partial", "correct"],
            description: "Type of misconception: conceptual (core idea wrong), procedural (application wrong), partial (incomplete), correct (full understanding)"
        },
        explanation: {
            type: "object",
            properties: {
                coreIdea: {
                    type: "string",
                    description: "The core concept the student needs to understand (2-3 sentences)"
                },
                keyMistake: {
                    type: "string",
                    description: "The specific mistake in the student's reasoning (1-2 sentences)"
                },
                analogy: {
                    type: "string",
                    description: "A helpful real-world analogy to clarify the concept"
                },
                takeaway: {
                    type: "string",
                    description: "The key insight the student should remember"
                }
            },
            required: ["coreIdea", "keyMistake", "analogy", "takeaway"]
        },
        retryQuestion: {
            type: "object",
            properties: {
                question: {
                    type: "string",
                    description: "A follow-up question to test understanding (different angle from original)"
                },
                hint: {
                    type: "string",
                    description: "A subtle hint to guide the student (without giving the answer)"
                }
            },
            required: ["question", "hint"]
        }
    },
    required: ["diagnosis", "explanation", "retryQuestion"]
};

/**
 * Replace template variables with actual values
 */
function getCombinedAttemptPrompt(subject, topic, question, studentAnswer, expectedConcept) {
    return combinedAttemptPrompt
        .replace('{{subject}}', subject)
        .replace('{{topic}}', topic)
        .replace('{{question}}', question)
        .replace('{{studentAnswer}}', studentAnswer)
        .replace('{{expectedConcept}}', expectedConcept);
}

module.exports = {
    combinedAttemptPrompt,
    combinedAttemptSchema,
    getCombinedAttemptPrompt
};
