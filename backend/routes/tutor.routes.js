/**
 * Tutor Routes
 * API endpoints for adaptive tutoring
 */

const express = require('express');
const router = express.Router();

const diagnosisService = require('../services/diagnosis.service');
const questionService = require('../services/question.service');
const geminiService = require('../services/gemini.service');
const ResponseFormatter = require('../utils/responseFormatter');
const { getExplanationPrompt } = require('../prompts/explanation.prompt');

/**
 * POST /api/attempt
 * Accept student attempt and generate targeted explanation
 */
router.post('/attempt', async (req, res) => {
    try {
        const { subject, topic, question, studentAnswer, expectedConcept } = req.body;

        // Validate required fields
        if (!subject || !topic || !question || !studentAnswer || !expectedConcept) {
            return res.status(400).json(
                ResponseFormatter.error('Missing required fields', 400, {
                    required: ['subject', 'topic', 'question', 'studentAnswer', 'expectedConcept']
                })
            );
        }

        // Step 1: Diagnose the misunderstanding
        console.log('Diagnosing student attempt...');
        const diagnosis = await diagnosisService.diagnose(
            question,
            studentAnswer,
            expectedConcept
        );
        console.log('Diagnosis:', diagnosis);

        // Step 2: Generate structured explanation using JSON schema
        console.log('Generating explanation...');
        const explanationPrompt = getExplanationPrompt(
            subject,
            topic,
            question,
            studentAnswer,
            expectedConcept,
            diagnosis
        );
        const explanation = await geminiService.generateExplanation(explanationPrompt);
        console.log('Explanation generated');

        // Step 3: Generate retry question
        console.log('Generating retry question...');
        const retryQuestion = await questionService.generateRetryQuestion(
            question,
            expectedConcept
        );
        console.log('Retry question generated');

        // Format and send response
        const responseData = ResponseFormatter.attemptResponse(
            diagnosis,
            explanation,
            retryQuestion
        );

        res.json(ResponseFormatter.success(responseData));
    } catch (error) {
        console.error('Attempt endpoint error:', error);

        // Check if it's a rate limit error
        if (error.code === 429 || (error.message && error.message.includes('rate limit'))) {
            return res.status(429).json(
                ResponseFormatter.error(
                    error.message || 'API rate limit exceeded',
                    429,
                    {
                        retryAfter: error.retryAfter || 60,
                        suggestion: 'Please wait a moment and try again, or contact support for API quota upgrade.'
                    }
                )
            );
        }

        res.status(500).json(
            ResponseFormatter.error(
                'Failed to process attempt',
                500,
                { message: error.message }
            )
        );
    }
});

/**
 * POST /api/retry
 * Evaluate retry attempt and determine improvement
 */
router.post('/retry', async (req, res) => {
    try {
        const { originalMistake, retryAnswer, expectedConcept } = req.body;

        // Validate required fields
        if (!originalMistake || !retryAnswer || !expectedConcept) {
            return res.status(400).json(
                ResponseFormatter.error('Missing required fields', 400, {
                    required: ['originalMistake', 'retryAnswer', 'expectedConcept']
                })
            );
        }

        // Validate originalMistake value
        const validMistakes = ['conceptual', 'procedural', 'partial', 'correct'];
        if (!validMistakes.includes(originalMistake)) {
            return res.status(400).json(
                ResponseFormatter.error('Invalid originalMistake value', 400, {
                    allowed: validMistakes,
                    received: originalMistake
                })
            );
        }

        // Evaluate retry attempt
        console.log('Evaluating retry attempt...');
        const evaluation = await questionService.evaluateRetry(
            originalMistake,
            retryAnswer,
            expectedConcept
        );
        console.log('Evaluation:', evaluation);

        // Format and send response
        const responseData = ResponseFormatter.retryResponse(
            evaluation.improved,
            evaluation.feedback,
            evaluation.nextDifficulty
        );

        res.json(ResponseFormatter.success(responseData));
    } catch (error) {
        console.error('Retry endpoint error:', error);
        res.status(500).json(
            ResponseFormatter.error(
                'Failed to evaluate retry',
                500,
                { message: error.message }
            )
        );
    }
});

/**
 * GET /api/topics
 * Get available topics for testing
 */
router.get('/topics', (req, res) => {
    const topics = {
        'web-development': ['cors', 'http-lifecycle'],
        'computer-networks': ['dns', 'tcp-handshake']
    };

    res.json(ResponseFormatter.success(topics));
});

module.exports = router;
