/**
 * Backend API Service
 * Handles all API calls to the adaptive tutoring backend
 */

const API_BASE_URL = 'http://localhost:3000/api';

export interface AttemptRequest {
    subject: string;
    topic: string;
    question: string;
    studentAnswer: string;
    expectedConcept: string;
}

export interface AttemptResponse {
    success: boolean;
    data: {
        diagnosis: 'conceptual' | 'procedural' | 'partial' | 'correct';
        explanation: {
            coreIdea: string;
            keyMistake: string;
            analogy: string;
            takeaway: string;
        };
        retryQuestion: {
            question: string;
            hint: string;
        };
    };
}

export interface RetryRequest {
    originalMistake: string;
    retryAnswer: string;
    expectedConcept: string;
}

export interface RetryResponse {
    success: boolean;
    data: {
        improved: boolean;
        feedback: string;
        nextDifficulty: 'slightly-harder' | 'same-level' | 'review-needed';
    };
}

export interface Topic {
    subject: string;
    topic: string;
    question: string;
    expectedConcept: string;
    icon?: string;
    title?: string;
    description?: string;
}

class TutorAPI {
    /**
     * Submit a student's answer for diagnosis and explanation
     */
    async submitAttempt(request: AttemptRequest): Promise<AttemptResponse> {
        const response = await fetch(`${API_BASE_URL}/attempt`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Submit a retry attempt for evaluation
     */
    async submitRetry(request: RetryRequest): Promise<RetryResponse> {
        const response = await fetch(`${API_BASE_URL}/retry`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(request),
        });

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get available topics
     */
    async getTopics(): Promise<Record<string, string[]>> {
        const response = await fetch(`${API_BASE_URL}/topics`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        const data = await response.json();
        return data.data;
    }

    /**
     * Health check
     */
    async healthCheck(): Promise<{ status: string; timestamp: string }> {
        const response = await fetch('http://localhost:3000/health');

        if (!response.ok) {
            throw new Error('Backend is not running');
        }

        return response.json();
    }

    // ═══════════════════════════════════════════════════════════
    // ACADEMIC NAVIGATION APIs
    // ═══════════════════════════════════════════════════════════

    /**
     * Get all available courses
     */
    async getCourses(): Promise<{ success: boolean; data: Array<{ course: string; description: string }> }> {
        const response = await fetch(`${API_BASE_URL}/courses`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get years for a specific course
     */
    async getYears(course: string): Promise<{ success: boolean; data: Array<{ year: number }> }> {
        const response = await fetch(`${API_BASE_URL}/courses/${encodeURIComponent(course)}/years`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get subjects for a specific course and year
     */
    async getSubjects(course: string, year: number): Promise<{
        success: boolean;
        data: Array<{
            id: string;
            name: string;
            description: string;
            icon: string;
            topicCount: number;
        }>;
    }> {
        const response = await fetch(
            `${API_BASE_URL}/courses/${encodeURIComponent(course)}/years/${year}/subjects`
        );

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get topics for a specific subject
     */
    async getTopicsBySubject(subjectId: string): Promise<{
        success: boolean;
        data: Array<{
            id: string;
            name: string;
            description: string;
            icon: string;
            questionCount: number;
        }>;
    }> {
        const response = await fetch(`${API_BASE_URL}/subjects/${subjectId}/topics`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }

    /**
     * Get questions for a specific topic
     */
    async getQuestionsByTopic(topicId: string): Promise<{
        success: boolean;
        data: Array<{
            id: string;
            question: string;
            expectedConcept: string;
        }>;
        statusCode: {
            context: {
                course: string;
                year: number;
                subject: { id: string; name: string };
                topic: { id: string; name: string };
            };
        };
    }> {
        const response = await fetch(`${API_BASE_URL}/topics/${topicId}/questions`);

        if (!response.ok) {
            throw new Error(`API error: ${response.statusText}`);
        }

        return response.json();
    }
}

export const tutorAPI = new TutorAPI();

// Mock data for topics with questions
export const TOPICS: Record<string, Topic> = {
    'web-development-cors': {
        subject: 'web-development',
        topic: 'cors',
        question: 'Why does a browser block cross-origin HTTP requests?',
        expectedConcept: 'CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request.',
        title: 'CORS',
        description: 'Cross-Origin Resource Sharing',
        icon: '🌐',
    },
    'web-development-http-lifecycle': {
        subject: 'web-development',
        topic: 'http-lifecycle',
        question: 'What happens when a client sends an HTTP request to a server?',
        expectedConcept: 'The client sends a request, the server processes it, and returns a response; the client does not directly access server resources.',
        title: 'HTTP Lifecycle',
        description: 'Request-Response Flow',
        icon: '🔄',
    },
    'computer-networks-dns': {
        subject: 'computer-networks',
        topic: 'dns',
        question: 'What happens when you type a domain name into a browser?',
        expectedConcept: 'The browser resolves the domain name to an IP address using DNS before initiating a network connection.',
        title: 'DNS Resolution',
        description: 'Domain Name System',
        icon: '📡',
    },
    'computer-networks-tcp-handshake': {
        subject: 'computer-networks',
        topic: 'tcp-handshake',
        question: 'Why does TCP use a three-way handshake before data transfer?',
        expectedConcept: 'The handshake ensures both client and server are ready and agree on connection parameters before data transmission.',
        title: 'TCP Handshake',
        description: 'Three-Way Connection',
        icon: '🤝',
    },
};
