/**
 * Question Service
 * Generates retry questions and evaluates retry attempts
 */

const geminiService = require('./gemini.service');
const { getRetryQuestionPrompt, getRetryEvaluationPrompt } = require('../prompts/retry.prompt');

class QuestionService {
    /**
     * Generate a retry question based on the original context
     * @param {string} question - The original question
     * @param {string} expectedConcept - Expected understanding
     * @returns {Promise<object>} - { question, hint }
     */
    async generateRetryQuestion(question, expectedConcept) {
        try {
            const prompt = getRetryQuestionPrompt(question, expectedConcept);
            // Using deprecated method temporarily until we create schema for retry questions
            const result = await geminiService.generateJSON(prompt);

            return {
                question: result.question || 'Try to explain the concept in your own words.',
                hint: result.hint || 'Think about the core principle.'
            };
        } catch (error) {
            console.error('Retry question generation error:', error);
            // Fallback retry question
            return {
                question: 'Can you explain this concept in a different way?',
                hint: 'Focus on the fundamental idea.'
            };
        }
    }

    /**
     * Evaluate a retry attempt
     * @param {string} originalMistake - Original diagnosis type
     * @param {string} retryAnswer - Student's retry answer
     * @param {string} expectedConcept - Expected understanding
     * @returns {Promise<object>} - { improved, feedback, nextDifficulty }
     */
    async evaluateRetry(originalMistake, retryAnswer, expectedConcept) {
        try {
            const prompt = getRetryEvaluationPrompt(originalMistake, retryAnswer, expectedConcept);
            // Use structured output with JSON schema
            const result = await geminiService.generateRetryEvaluation(prompt);

            return {
                improved: result.improved === true || result.improved === 'true',
                feedback: result.feedback || 'Keep practicing!',
                nextDifficulty: 'same-level' // Can be enhanced later with needsWork field
            };
        } catch (error) {
            console.error('Retry evaluation error:', error);
            // Conservative fallback
            return {
                improved: false,
                feedback: 'Unable to evaluate. Please try again.',
                nextDifficulty: 'review-needed'
            };
        }
    }
}

module.exports = new QuestionService();
