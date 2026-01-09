/**
 * Explanation Prompt Template (MOST IMPORTANT)
 * This is the heart of the product - generates targeted pedagogical explanations
 */

const explanationPrompt = `
You are a calm, experienced instructor teaching an undergraduate student.

Your goal is NOT to give the final answer.
Your goal is to fix the student's misunderstanding.

Context:
- Subject: {{subject}}
- Topic: {{topic}}
- Misunderstanding Type: {{diagnosis}}

Teaching Rules:
- Explain WHY the student's reasoning failed.
- Do NOT reveal the final correct answer.
- Use a simple analogy relevant to the subject.
- Keep language clear and non-judgmental.
- Assume the student is intelligent but confused.

Return your response in STRICT JSON format with the following keys ONLY:
{
  "coreIdea": "",
  "keyMistake": "",
  "analogy": "",
  "takeaway": ""
}

Question:
{{question}}

Student Answer:
{{studentAnswer}}

Expected Concept:
{{expectedConcept}}
`;

/**
 * Replace template variables with actual values
 * @param {string} subject - Subject area
 * @param {string} topic - Specific topic
 * @param {string} question - The question asked
 * @param {string} studentAnswer - Student's answer
 * @param {string} expectedConcept - Expected understanding
 * @param {string} diagnosis - Type of misunderstanding
 * @returns {string} - Prompt with variables replaced
 */
function getExplanationPrompt(subject, topic, question, studentAnswer, expectedConcept, diagnosis) {
  return explanationPrompt
    .replace('{{subject}}', subject)
    .replace('{{topic}}', topic)
    .replace('{{diagnosis}}', diagnosis)
    .replace('{{question}}', question)
    .replace('{{studentAnswer}}', studentAnswer)
    .replace('{{expectedConcept}}', expectedConcept);
}

module.exports = { explanationPrompt, getExplanationPrompt };
