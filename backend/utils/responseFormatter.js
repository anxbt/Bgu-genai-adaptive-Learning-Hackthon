/**
 * Response Formatter Utility
 * Ensures consistent API response structure
 */

class ResponseFormatter {
    /**
     * Format success response
     * @param {object} data - Response data
     * @param {number} statusCode - HTTP status code
     * @returns {object} - Formatted response
     */
    static success(data, statusCode = 200) {
        return {
            success: true,
            data,
            statusCode
        };
    }

    /**
     * Format error response
     * @param {string} message - Error message
     * @param {number} statusCode - HTTP status code
     * @param {object} details - Additional error details
     * @returns {object} - Formatted error
     */
    static error(message, statusCode = 500, details = null) {
        const response = {
            success: false,
            error: message,
            statusCode
        };

        if (details) {
            response.details = details;
        }

        return response;
    }

    /**
     * Format attempt response
     * @param {string} diagnosis - Diagnosis type
     * @param {object} explanation - Explanation object
     * @param {object} retryQuestion - Retry question object
     * @returns {object} - Formatted attempt response
     */
    static attemptResponse(diagnosis, explanation, retryQuestion) {
        return {
            diagnosis,
            explanation: {
                coreIdea: explanation.coreIdea || '',
                analogy: explanation.analogy || '',
                keyMistake: explanation.keyMistake || '',
                takeaway: explanation.takeaway || ''
            },
            retryQuestion: {
                question: retryQuestion.question || '',
                hint: retryQuestion.hint || ''
            }
        };
    }

    /**
     * Format retry response
     * @param {boolean} improved - Whether student improved
     * @param {string} feedback - Feedback message
     * @param {string} nextDifficulty - Recommended next difficulty
     * @returns {object} - Formatted retry response
     */
    static retryResponse(improved, feedback, nextDifficulty) {
        return {
            improved,
            feedback,
            nextDifficulty
        };
    }
}

module.exports = ResponseFormatter;
