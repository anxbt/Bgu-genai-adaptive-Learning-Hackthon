/**
 * Diagnosis Service
 * Classifies student misunderstandings using structured Gemini output
 */

const geminiService = require('./gemini.service');
const { getDiagnosisPrompt } = require('../prompts/diagnosis.prompt');

class DiagnosisService {
    /**
     * Diagnose student misunderstanding type
     * @param {string} question - The original question
     * @param {string} studentAnswer - Student's attempt
     * @param {string} expectedConcept - Expected understanding
     * @returns {Promise<string>} - One of: 'conceptual', 'procedural', 'partial', 'correct'
     */
    async diagnose(question, studentAnswer, expectedConcept) {
        try {
            const prompt = getDiagnosisPrompt(question, studentAnswer, expectedConcept);

            // Use structured output with JSON schema
            const response = await geminiService.generateDiagnosis(prompt);

            // Response is guaranteed to have valid diagnosis field
            return response.diagnosis;

        } catch (error) {
            console.error('Diagnosis error:', error);
            // Safe fallback
            return 'conceptual';
        }
    }
}

module.exports = new DiagnosisService();
