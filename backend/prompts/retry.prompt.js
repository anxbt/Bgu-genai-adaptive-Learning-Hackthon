/**
 * Retry Prompt Template
 * Generates learning verification questions
 */

const retryPrompt = `
You are generating a follow-up question for learning verification.

Rules:
- The question must test the SAME concept.
- The wording must be DIFFERENT from the original.
- Do NOT reuse the same examples.
- Include a subtle hint, not the answer.
- Difficulty should be appropriate for an undergraduate student.

Return STRICT JSON with ONLY these keys:
{
  "question": "",
  "hint": ""
}

Original Question:
{{question}}

Core Concept Being Tested:
{{expectedConcept}}
`;

const retryEvaluationPrompt = `
You are evaluating student learning progress.

Context:
Original Mistake Type: {{originalMistake}}
Expected Concept: {{expectedConcept}}
Student's Retry Answer: {{retryAnswer}}

Your task is to determine if the student has improved their understanding.

Return STRICT JSON with ONLY these keys:
{
  "improved": true/false,
  "feedback": "One sentence on their progress",
  "nextDifficulty": "slightly-harder" or "same-level" or "review-needed"
}

Rules:
- "improved" = true if they demonstrate understanding of the core concept
- Be encouraging but honest
- "nextDifficulty" should recommend the appropriate next step
`;

/**
 * Replace template variables for retry question generation
 * @param {string} question - Original question
 * @param {string} expectedConcept - Expected understanding
 * @returns {string} - Prompt with variables replaced
 */
function getRetryQuestionPrompt(question, expectedConcept) {
  return retryPrompt
    .replace('{{question}}', question)
    .replace('{{expectedConcept}}', expectedConcept);
}

/**
 * Replace template variables for retry evaluation
 * @param {string} originalMistake - Original diagnosis type
 * @param {string} retryAnswer - Student's retry answer
 * @param {string} expectedConcept - Expected understanding
 * @returns {string} - Prompt with variables replaced
 */
function getRetryEvaluationPrompt(originalMistake, retryAnswer, expectedConcept) {
  return retryEvaluationPrompt
    .replace('{{originalMistake}}', originalMistake)
    .replace('{{retryAnswer}}', retryAnswer)
    .replace('{{expectedConcept}}', expectedConcept);
}

module.exports = {
  retryPrompt,
  retryEvaluationPrompt,
  getRetryQuestionPrompt,
  getRetryEvaluationPrompt
};
