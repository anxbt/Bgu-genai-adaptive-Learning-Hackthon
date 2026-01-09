
const webDevCORS = {
    subject: "web-development",
    topic: "cors",
    questions: [
        {
            id: "wd-cors-1",
            question: "Why does a browser block cross-origin HTTP requests?",
            expectedConcept:
                "CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request."
        }
    ],
    commonWrongAnswers: [
        "Because the server does not allow cross-origin requests",
        "Because APIs do not support requests from other domains",
        "Because HTTP itself blocks cross-origin access"
    ]
};

/**
 * Topic: HTTP Request-Response Lifecycle
 */
const webDevHTTP = {
    subject: "web-development",
    topic: "http-lifecycle",
    questions: [
        {
            id: "wd-http-1",
            question: "What happens when a client sends an HTTP request to a server?",
            expectedConcept:
                "The client sends a request, the server processes it, and returns a response; the client does not directly access server resources."
        }
    ],
    commonWrongAnswers: [
        "The client directly accesses the database",
        "The browser executes server code",
        "The server pushes data automatically without a request"
    ]
};

// ═══════════════════════════════════════════════════════════
// COMPUTER NETWORKS
// ═══════════════════════════════════════════════════════════

/**
 * Topic: DNS Resolution
 */
const cnDNS = {
    subject: "computer-networks",
    topic: "dns",
    questions: [
        {
            id: "cn-dns-1",
            question: "What happens when you type a domain name into a browser?",
            expectedConcept:
                "The browser resolves the domain name to an IP address using DNS before initiating a network connection."
        }
    ],
    commonWrongAnswers: [
        "The browser directly connects to the website server",
        "The browser already knows the IP address",
        "The domain name is sent directly to Google"
    ]
};

/**
 * Topic: TCP Three-Way Handshake
 */
const cnTCP = {
    subject: "computer-networks",
    topic: "tcp-handshake",
    questions: [
        {
            id: "cn-tcp-1",
            question: "Why does TCP use a three-way handshake before data transfer?",
            expectedConcept:
                "The handshake ensures both client and server are ready and agree on connection parameters before data transmission."
        }
    ],
    commonWrongAnswers: [
        "To send data faster",
        "To encrypt the connection",
        "Because UDP also does it"
    ]
};

// ═══════════════════════════════════════════════════════════
// EXPORTS
// ═══════════════════════════════════════════════════════════

module.exports = {
    webDev: {
        cors: webDevCORS,
        http: webDevHTTP
    },
    computerNetworks: {
        dns: cnDNS,
        tcp: cnTCP
    },

    // Helper function to get a question by topic
    getQuestionByTopic(subject, topic) {
        if (subject === 'web-development' && topic === 'cors') {
            return webDevCORS.questions[0];
        }
        if (subject === 'web-development' && topic === 'http-lifecycle') {
            return webDevHTTP.questions[0];
        }
        if (subject === 'computer-networks' && topic === 'dns') {
            return cnDNS.questions[0];
        }
        if (subject === 'computer-networks' && topic === 'tcp-handshake') {
            return cnTCP.questions[0];
        }
        return null;
    },

    // Helper function to get common wrong answers
    getCommonWrongAnswers(subject, topic) {
        if (subject === 'web-development' && topic === 'cors') {
            return webDevCORS.commonWrongAnswers;
        }
        if (subject === 'web-development' && topic === 'http-lifecycle') {
            return webDevHTTP.commonWrongAnswers;
        }
        if (subject === 'computer-networks' && topic === 'dns') {
            return cnDNS.commonWrongAnswers;
        }
        if (subject === 'computer-networks' && topic === 'tcp-handshake') {
            return cnTCP.commonWrongAnswers;
        }
        return [];
    }
};
