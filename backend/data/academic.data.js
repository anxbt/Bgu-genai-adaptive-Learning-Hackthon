/**
 * Academic Data Model
 * Hierarchical structure: Course → Year → Subject → Topic → Questions
 * In-memory data for hackathon MVP
 */

const academicData = [
    {
        course: "B.Tech",
        description: "Bachelor of Technology - Engineering Programs",
        years: [
            {
                year: 2,
                subjects: [
                    {
                        id: "web-development",
                        name: "Web Development",
                        description: "Modern web technologies, frameworks, and best practices",
                        icon: "🌐",
                        topics: [
                            {
                                id: "cors",
                                name: "CORS",
                                description: "Cross-Origin Resource Sharing",
                                icon: "🔒",
                                questions: [
                                    {
                                        id: "wd-cors-1",
                                        question: "Why does a browser block cross-origin HTTP requests?",
                                        expectedConcept: "CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request."
                                    }
                                ]
                            },
                            {
                                id: "http-lifecycle",
                                name: "HTTP Lifecycle",
                                description: "Request-Response Flow",
                                icon: "🔄",
                                questions: [
                                    {
                                        id: "wd-http-1",
                                        question: "What happens when a client sends an HTTP request to a server?",
                                        expectedConcept: "The client sends a request, the server processes it, and returns a response; the client does not directly access server resources."
                                    }
                                ]
                            }
                        ]
                    },
                    {
                        id: "computer-networks",
                        name: "Computer Networks",
                        description: "Network protocols, architecture, and communication",
                        icon: "📡",
                        topics: [
                            {
                                id: "dns",
                                name: "DNS Resolution",
                                description: "Domain Name System",
                                icon: "🌍",
                                questions: [
                                    {
                                        id: "cn-dns-1",
                                        question: "What happens when you type a domain name into a browser?",
                                        expectedConcept: "The browser resolves the domain name to an IP address using DNS before initiating a network connection."
                                    }
                                ]
                            },
                            {
                                id: "tcp-handshake",
                                name: "TCP Handshake",
                                description: "Three-Way Connection",
                                icon: "🤝",
                                questions: [
                                    {
                                        id: "cn-tcp-1",
                                        question: "Why does TCP use a three-way handshake before data transfer?",
                                        expectedConcept: "The handshake ensures both client and server are ready and agree on connection parameters before data transmission."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    },
    {
        course: "BCA",
        description: "Bachelor of Computer Applications",
        years: [
            {
                year: 2,
                subjects: [
                    {
                        id: "web-development",
                        name: "Web Development",
                        description: "Modern web technologies, frameworks, and best practices",
                        icon: "🌐",
                        topics: [
                            {
                                id: "cors",
                                name: "CORS",
                                description: "Cross-Origin Resource Sharing",
                                icon: "🔒",
                                questions: [
                                    {
                                        id: "wd-cors-1",
                                        question: "Why does a browser block cross-origin HTTP requests?",
                                        expectedConcept: "CORS is a browser-enforced security policy; the server only provides headers, but the browser decides whether to block or allow the request."
                                    }
                                ]
                            }
                        ]
                    }
                ]
            }
        ]
    }
];

module.exports = academicData;
