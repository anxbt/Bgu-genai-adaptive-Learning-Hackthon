/**
 * Diagnosis Prompt Template
 * Classifies student misunderstanding type
 */

const diagnosisPrompt = `
You are an educational diagnosis engine.

Your task is to classify the student's misunderstanding based on their answer.

You will be given:
- A question
- The student's answer
- The expected core concept

Classify the misunderstanding into EXACTLY ONE of the following:
- conceptual (student misunderstands the core idea)
- procedural (student knows the idea but applies it incorrectly)
- partial (student is on the right track but incomplete)
- correct (student understands the concept)

Rules:
- Do NOT explain the correct answer.
- Do NOT teach.
- Do NOT add extra text.
- Output ONLY the classification label as a lowercase string.

Question:
{{question}}

Student Answer:
{{studentAnswer}}

Expected Concept:
{{expectedConcept}}
`;

/**
 * Replace template variables with actual values
 * @param {string} question - The question asked
 * @param {string} studentAnswer - Student's answer
 * @param {string} expectedConcept - Expected understanding
 * @returns {string} - Prompt with variables replaced
 */
function getDiagnosisPrompt(question, studentAnswer, expectedConcept) {
  return diagnosisPrompt
    .replace('{{question}}', question)
    .replace('{{studentAnswer}}', studentAnswer)
    .replace('{{expectedConcept}}', expectedConcept);
}

module.exports = { diagnosisPrompt, getDiagnosisPrompt };
