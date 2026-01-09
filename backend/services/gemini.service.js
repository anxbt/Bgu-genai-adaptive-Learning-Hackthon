/**
 * Gemini Service
 * Wrapper for Google Generative AI SDK (@google/genai)
 * Uses structured output with JSON schemas for reliable responses
 */

const { GoogleGenAI } = require('@google/genai');

// Define JSON schemas for structured outputs
const diagnosisSchema = {
    type: "object",
    properties: {
        diagnosis: {
            type: "string",
            enum: ["conceptual", "procedural", "partial", "correct"],
            description: "Type of misconception or understanding level"
        }
    },
    required: ["diagnosis"]
};

const explanationSchema = {
    type: "object",
    properties: {
        coreIdea: {
            type: "string",
            description: "The core concept the student needs to understand"
        },
        keyMistake: {
            type: "string",
            description: "The specific mistake or gap in the student's understanding"
        },
        analogy: {
            type: "string",
            description: "A helpful analogy to clarify the concept"
        },
        takeaway: {
            type: "string",
            description: "The key takeaway for the student"
        }
    },
    required: ["coreIdea", "keyMistake", "analogy", "takeaway"]
};

const retryEvaluationSchema = {
    type: "object",
    properties: {
        improved: {
            type: "boolean",
            description: "Whether the retry answer shows improvement"
        },
        feedback: {
            type: "string",
            description: "Specific feedback on the retry attempt"
        },
        needsWork: {
            type: "string",
            description: "Areas that still need improvement, if any"
        }
    },
    required: ["improved", "feedback"]
};

class GeminiService {
    constructor() {
        // Collect all available API keys for fallback rotation
        this.apiKeys = [
            process.env.GEMINI_API_KEY,
            process.env.GEMINI_API_KEY_2,
            process.env.GEMINI_API_KEY_3
        ].filter(Boolean); // Remove undefined/empty keys

        if (this.apiKeys.length === 0) {
            throw new Error('At least one GEMINI_API_KEY is required in .env');
        }

        console.log(`[Gemini] Initialized with ${this.apiKeys.length} API key(s) for fallback`);

        this.currentKeyIndex = 0;
        this.ai = new GoogleGenAI({ apiKey: this.apiKeys[0] });

        // Using gemini-2.0-flash-exp (experimental) for development
        // Note: v1beta API doesn't support gemini-1.5-flash models (404 errors)
        this.modelName = 'gemini-2.0-flash-exp';
    }

    /**
     * Switch to the next available API key
     * @returns {boolean} - true if switched successfully, false if no more keys
     */
    rotateApiKey() {
        if (this.apiKeys.length <= 1) {
            console.log('[Gemini] No backup keys available for rotation');
            return false;
        }

        this.currentKeyIndex = (this.currentKeyIndex + 1) % this.apiKeys.length;
        this.ai = new GoogleGenAI({ apiKey: this.apiKeys[this.currentKeyIndex] });
        console.log(`[Gemini] Rotated to API key ${this.currentKeyIndex + 1} of ${this.apiKeys.length}`);
        return true;
    }

    /**
     * Generate content with JSON schema validation
     * @param {string} prompt - The prompt text
     * @param {object} schema - JSON schema for the expected response
     * @param {object} config - Optional generation config
     * @param {number} retryCount - Internal: number of retries attempted
     * @returns {Promise<object>} - Parsed JSON object matching the schema
     */
    async generateStructuredContent(prompt, schema, config = {}, retryCount = 0) {
        try {
            const generationConfig = {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 2048,
                ...config,
                responseMimeType: "application/json",
                responseJsonSchema: schema
            };

            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: prompt,
                config: generationConfig
            });

            // The response is guaranteed to be valid JSON matching the schema
            const jsonResponse = JSON.parse(response.text);
            return jsonResponse;

        } catch (error) {
            console.error(`Gemini API Error (key ${this.currentKeyIndex + 1}):`, error.message?.substring(0, 100));

            // Handle rate limit errors - try rotating to next key
            if (error.message && error.message.includes('429')) {
                // Try to rotate to next API key if we haven't tried all keys yet
                if (retryCount < this.apiKeys.length - 1 && this.rotateApiKey()) {
                    console.log(`[Gemini] Retrying with next API key (attempt ${retryCount + 2})`);
                    return this.generateStructuredContent(prompt, schema, config, retryCount + 1);
                }

                // All keys exhausted - throw rate limit error
                const retryMatch = error.message.match(/retry in ([0-9.]+)s/);
                const retryDelay = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 60;

                const rateLimitError = new Error(
                    `All ${this.apiKeys.length} API key(s) rate limited. Please try again in ${retryDelay} seconds.`
                );
                rateLimitError.code = 429;
                rateLimitError.retryAfter = retryDelay;
                throw rateLimitError;
            }

            throw new Error(`Gemini service failed: ${error.message}`);
        }
    }

    /**
     * Generate diagnosis response
     * @param {string} prompt - Diagnosis prompt
     * @returns {Promise<object>} - { diagnosis: "conceptual" | "procedural" | "partial" | "correct" }
     */
    async generateDiagnosis(prompt) {
        const result = await this.generateStructuredContent(prompt, diagnosisSchema, {
            temperature: 0.5 // Lower for more consistent diagnosis
        });
        console.log('Diagnosis result from Gemini:', JSON.stringify(result, null, 2));

        // Gemini may return just "conceptual" instead of { diagnosis: "conceptual" }
        // Handle both formats
        if (typeof result === 'string') {
            return { diagnosis: result };
        }
        return result;
    }

    /**
     * Generate explanation response
     * @param {string} prompt - Explanation prompt
     * @returns {Promise<object>} - { coreIdea, keyMistake, analogy, takeaway }
     */
    async generateExplanation(prompt) {
        return this.generateStructuredContent(prompt, explanationSchema, {
            temperature: 0.7
        });
    }

    /**
     * Generate retry evaluation response
     * @param {string} prompt - Retry evaluation prompt
     * @returns {Promise<object>} - { improved, feedback, needsWork }
     */
    async generateRetryEvaluation(prompt) {
        return this.generateStructuredContent(prompt, retryEvaluationSchema, {
            temperature: 0.6
        });
    }

    /**
     * Legacy method for backward compatibility - generates text content
     * @param {string} prompt - The prompt
     * @param {object} config - Optional generation config
     * @returns {Promise<string>} - The generated text
     */
    async generateContent(prompt, config = {}, retryCount = 0) {
        try {
            const generationConfig = {
                temperature: 0.7,
                topP: 0.9,
                topK: 40,
                maxOutputTokens: 1024,
                ...config
            };

            const response = await this.ai.models.generateContent({
                model: this.modelName,
                contents: prompt,
                config: generationConfig
            });

            return response.text.trim();
        } catch (error) {
            console.error(`Gemini API Error (key ${this.currentKeyIndex + 1}):`, error.message?.substring(0, 100));

            // Handle rate limit errors - try rotating to next key
            if (error.message && error.message.includes('429')) {
                if (retryCount < this.apiKeys.length - 1 && this.rotateApiKey()) {
                    console.log(`[Gemini] Retrying with next API key (attempt ${retryCount + 2})`);
                    return this.generateContent(prompt, config, retryCount + 1);
                }

                const retryMatch = error.message.match(/retry in ([0-9.]+)s/);
                const retryDelay = retryMatch ? Math.ceil(parseFloat(retryMatch[1])) : 60;

                const rateLimitError = new Error(
                    `All ${this.apiKeys.length} API key(s) rate limited. Please try again in ${retryDelay} seconds.`
                );
                rateLimitError.code = 429;
                rateLimitError.retryAfter = retryDelay;
                throw rateLimitError;
            }

            throw new Error(`Gemini service failed: ${error.message}`);
        }
    }

    /**
     * Legacy method - use generateStructuredContent instead
     * @deprecated Use specific methods like generateDiagnosis, generateExplanation, etc.
     */
    async generateJSON(prompt) {
        console.warn('generateJSON is deprecated. Use generateStructuredContent with a schema instead.');
        const text = await this.generateContent(prompt, { temperature: 0.5 });

        // Try to extract JSON from response
        const jsonMatch = text.match(/```(?:json)?\s*([\s\S]*?)\s*```/) || [null, text];
        const jsonText = jsonMatch[1].trim();

        return JSON.parse(jsonText);
    }
}

module.exports = new GeminiService();